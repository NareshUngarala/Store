"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Plus, Trash2, Mail } from "lucide-react";
import {
  createUser,
  getUsersByRole,
  deleteUser,
} from "@/lib/user-management";
import { User as UserType } from "@/types";

export default function OperationalManagersPage() {
  const { user } = useAuth();
  const [operationalManagers, setOperationalManagers] = useState<UserType[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "super-admin") {
      loadOperationalManagers();
    }
  }, [user]);

  const loadOperationalManagers = () => {
    const managers = getUsersByRole("operational-manager");
    setOperationalManagers(managers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      createUser(
        email,
        password,
        "operational-manager",
        undefined,
        user?.email
      );
      
      // Reset form
      setEmail("");
      setPassword("");
      setIsFormOpen(false);
      loadOperationalManagers();
    } catch (err: any) {
      setError(err.message || "Failed to create operational manager");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (userId: string) => {
    if (confirm("Are you sure you want to delete this operational manager?")) {
      deleteUser(userId);
      loadOperationalManagers();
    }
  };

  if (user?.role !== "super-admin") {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-600">Access denied. Super Admin only.</p>
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
              <h1 className="text-3xl font-bold text-[#0B1D39]">Operational Managers</h1>
              <p className="text-gray-600 mt-1">
                Create and manage operational managers
              </p>
            </div>
            <Button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-[#0B1D39] hover:bg-[#08162D] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Operational Manager
            </Button>
          </div>

          {/* Create Form */}
          {isFormOpen && (
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-[#0B1D39] mb-4">
                Create New Operational Manager
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="manager@example.com"
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
                    {isSubmitting ? "Creating..." : "Create Manager"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsFormOpen(false);
                      setEmail("");
                      setPassword("");
                      setError("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* List of Operational Managers */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-[#0B1D39]">
                All Operational Managers ({operationalManagers.length})
              </h2>
            </div>
            <div className="p-6">
              {operationalManagers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No operational managers created yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {operationalManagers.map((manager) => (
                    <div
                      key={manager.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#0B1D39]/10 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-[#0B1D39]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#0B1D39]">{manager.email}</p>
                          <p className="text-sm text-gray-500">
                            Created: {new Date(manager.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(manager.id)}
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

