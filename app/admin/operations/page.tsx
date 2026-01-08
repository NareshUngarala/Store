"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import {
  Calendar,
  Users,
  Wallet,
  Clock,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const operationsModules = [
  { name: "Bookings", icon: Calendar, href: "/admin/bookings", count: 24 },
  { name: "Staff", icon: Users, href: "/admin/staff", count: 12 },
  { name: "Customers", icon: Users, href: "/admin/customers", count: 1.2 },
  { name: "Finance", icon: Wallet, href: "/admin/finance", count: "$45K" },
];

const todayStats = [
  { label: "Today's Bookings", value: "24", change: "+3", trend: "up" },
  { label: "Active Staff", value: "8", change: "All present", trend: "neutral" },
  { label: "Revenue Today", value: "$3,450", change: "+15%", trend: "up" },
  { label: "Pending Tasks", value: "7", change: "-2", trend: "down" },
];

const recentActivity = [
  { time: "2 min ago", action: "New booking received", type: "booking" },
  { time: "15 min ago", action: "Payment processed", type: "payment" },
  { time: "1 hour ago", action: "Staff shift started", type: "staff" },
  { time: "2 hours ago", action: "Customer inquiry", type: "customer" },
];

export default function OperationsPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Operations Portal</h1>
              <p className="text-gray-600 mt-1">
                Day-to-day operations and management overview
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Operational Manager</span>
            </div>
          </div>

          {/* Today's Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {todayStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <TrendingUp
                    className={`h-5 w-5 ${
                      stat.trend === "up"
                        ? "text-green-500"
                        : stat.trend === "down"
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Operations Modules */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Operations Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {operationsModules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <a
                    key={index}
                    href={module.href}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all group"
                  >
                    <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{module.name}</p>
                      <p className="text-sm text-gray-500">{module.count}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  View Today&apos;s Schedule
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  Manage Staff Shifts
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  Review Pending Bookings
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  Generate Daily Report
                </button>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">Attention Required</h3>
                <p className="text-sm text-yellow-800">
                  You have 3 bookings that need confirmation and 2 staff members scheduled for
                  overtime this week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

