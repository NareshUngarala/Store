"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Store, Plus, Trash2, Mail, Package } from "lucide-react";
import {
  createUser,
  getUsersByRole,
  deleteUser,
  User as UserType,
} from "@/lib/user-management";
import { OSType } from "@/types";

export default function VendorsPage() {
  const { user } = useAuth();
  const [vendors, setVendors] = useState<UserType[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [osType, setOsType] = useState<OSType>("StoreOS");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "operational-manager") {
      loadVendors();
    }
  }, [user]);

  const loadVendors = () => {
    const admins = getUsersByRole("admin");
    setVendors(admins);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      createUser(
        email,
        password,
        "admin",
        osType,
        user?.email
      );
      
      // Reset form
      setEmail("");
      setPassword("");
      setOsType("StoreOS");
      setIsFormOpen(false);
      loadVendors();
    } catch (err: any) {
      setError(err.message || "Failed to create vendor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (userId: string) => {
    if (confirm("Are you sure you want to delete this vendor?")) {
      deleteUser(userId);
      loadVendors();
    }
  };

  const getOSIcon = (os: OSType | undefined) => {
    switch (os) {
      case "StoreOS":
        return "🏪";
      case "SpaceOS":
        return "🏢";
      case "ServiceOS":
        return "🔧";
      default:
        return "📦";
    }
  };

  if (user?.role !== "operational-manager") {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-600">Access denied. Operational Manager only.</p>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0B1D39]">Vendors</h1>
              <p className="text-gray-600 mt-1">
                Create and manage vendors (StoreOS, SpaceOS, ServiceOS)
              </p>
            </div>
            <Button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-[#0B1D39] hover:bg-[#08162D] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </div>

          {/* Create Form */}
          {isFormOpen && (
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-[#0B1D39] mb-4">
                Create New Vendor
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="vendor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OS Type
                  </label>
                  <select
                    value={osType}
                    onChange={(e) => setOsType(e.target.value as OSType)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  >
                    <option value="StoreOS">StoreOS</option>
                    <option value="SpaceOS">SpaceOS</option>
                    <option value="ServiceOS">ServiceOS</option>
                  </select>
                  <p className="mt-2 text-xs text-gray-500">
                    Select the OS type for this vendor
                  </p>
                </div>
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#0B1D39] hover:bg-[#08162D] text-white"
                  >
                    {isSubmitting ? "Creating..." : "Create Vendor"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsFormOpen(false);
                      setEmail("");
                      setPassword("");
                      setOsType("StoreOS");
                      setError("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* List of Vendors */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-[#0B1D39]">
                All Vendors ({vendors.length})
              </h2>
            </div>
            <div className="p-6">
              {vendors.length === 0 ? (
                <div className="text-center py-12">
                  <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No vendors created yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {vendors.map((vendor) => (
                    <div
                      key={vendor.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#0B1D39]/10 flex items-center justify-center text-xl">
                          {getOSIcon(vendor.osType)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-[#0B1D39]">{vendor.email}</p>
                            {vendor.osType && (
                              <span className="px-2 py-1 text-xs font-medium bg-[#F2C94C]/20 text-[#0B1D39] rounded">
                                {vendor.osType}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            Created: {new Date(vendor.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(vendor.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

