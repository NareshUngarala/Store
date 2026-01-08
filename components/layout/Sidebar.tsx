"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Package,
  Users,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Layers,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Business Setup", href: "/admin/business-setup", icon: Briefcase },
  { name: "Locations", href: "/admin/locations", icon: MapPin },
  { name: "Zones & Assets", href: "/admin/zones-assets", icon: Layers },
  { name: "Staff Management", href: "/admin/staff", icon: Users },
  { name: "Services", href: "/admin/services", icon: Package },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ 
  isMobileOpen = false, 
  onMobileClose,
  isCollapsed = false,
  onToggleCollapse
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden transition-opacity"
          onClick={() => onMobileClose?.()}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:fixed top-16 lg:top-0 left-0 bg-transparent transition-all duration-300 ease-in-out",
          "h-[calc(100vh-4rem)] lg:h-screen",
          "lg:translate-x-0",
          // Higher z-index when open on mobile to appear in front of topbar
          isMobileOpen ? "z-[60] translate-x-0" : "z-40 -translate-x-full lg:translate-x-0",
          isCollapsed ? "w-20" : "w-[260px]",
          "lg:px-2 lg:py-2"
        )}
      >
        <div className={cn(
          "flex h-full flex-col sidebar-gradient sidebar-scrollbar rounded-xl shadow-sm border border-[#0B1D39]/20",
          "overflow-y-auto"
        )}>
          {/* StoreOS Logo Section with Collapse Toggle */}
          <div className={cn(
            "flex h-16 items-center border-b border-white/10 relative flex-shrink-0 sidebar-gradient rounded-t-xl",
            isCollapsed ? "justify-center px-0" : "justify-between px-4"
          )}>
            {!isCollapsed ? (
              <>
                <Link href="/admin" className="flex items-center gap-3 flex-1">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <span className="text-lg font-bold text-white">S</span>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F2C94C] rounded-b-full" />
                  </div>
                  <span className="text-base font-semibold text-white">StoreOS</span>
                </Link>
                {/* Collapse Toggle Button - Desktop only */}
                {onToggleCollapse && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/10 rounded-full hidden lg:flex flex-shrink-0"
                    onClick={onToggleCollapse}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}
              </>
            ) : (
              <>
                <Link href="/admin" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 relative mx-auto">
                  <span className="text-lg font-bold text-white">S</span>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F2C94C] rounded-b-full" />
                </Link>
                {/* Collapse Toggle Button - Desktop only */}
                {onToggleCollapse && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/10 rounded-full hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={onToggleCollapse}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-2 overflow-y-auto min-h-0 sidebar-scrollbar">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => onMobileClose?.()}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 relative group",
                    isCollapsed ? "justify-center" : "",
                    isActive
                      ? "bg-[#F2C94C] text-[#1A1A1A]"
                      : "text-white hover:bg-white/10"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive ? "text-[#1A1A1A]" : "text-white"
                  )} />
                  
                  {!isCollapsed && (
                    <span className="flex-1">{item.name}</span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-[#0B1D39] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-white/10">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-white/10 px-2 py-2 space-y-1 flex-shrink-0 sidebar-gradient rounded-b-xl">
            <Link
              href="/admin/settings"
              onClick={() => onMobileClose?.()}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isCollapsed ? "justify-center" : "",
                pathname === "/admin/settings"
                  ? "bg-[#F2C94C] text-[#1A1A1A]"
                  : "text-white hover:bg-white/10"
              )}
            >
              <Settings className={cn(
                "h-5 w-5 flex-shrink-0",
                pathname === "/admin/settings" ? "text-[#1A1A1A]" : "text-white"
              )} />
              {!isCollapsed && <span>Settings</span>}
            </Link>
            <Link
              href="/admin/help"
              onClick={() => onMobileClose?.()}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 text-white hover:bg-white/10",
                isCollapsed ? "justify-center" : ""
              )}
            >
              <HelpCircle className="h-5 w-5 flex-shrink-0 text-white" />
              {!isCollapsed && <span>Help</span>}
            </Link>
            <button
              onClick={() => onMobileClose?.()}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10",
                isCollapsed ? "justify-center" : ""
              )}
            >
              <LogOut className="h-5 w-5 flex-shrink-0 text-white" />
              {!isCollapsed && <span>Log out</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
