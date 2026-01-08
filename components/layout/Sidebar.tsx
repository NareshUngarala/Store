"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  MapPin,
  Package,
  Users,
  Calendar,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Layers,
  HelpCircle,
  ShoppingBag,
  CreditCard,
  Gift,
  Megaphone,
  Navigation,
  Plug,
  Clock,
  UserCircle,
  Wallet,
  ChevronDown,
  ChevronUp,
  UserCog,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  children?: { name: string; href: string }[];
  roles?: string[]; // Roles that can see this item
}

// Base navigation items (for admin/vendor role)
const baseNavigation: NavItem[] = [
  {
    name: "Business Setup",
    href: "/admin/business-setup",
    icon: Briefcase,
    children: [
      { name: "Locations", href: "/admin/business-setup/locations" },
      { name: "Physical Setup", href: "/admin/business-setup/physical-setup" },
    ],
  },
  { name: "Catalog", href: "/admin/catalog", icon: ShoppingBag },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "POS", href: "/admin/pos", icon: CreditCard },
  { name: "Reservations", href: "/admin/reservations", icon: Clock },
  { name: "Customers", href: "/admin/customers", icon: UserCircle },
  { name: "Staff", href: "/admin/staff", icon: Users },
  { name: "Finance", href: "/admin/finance", icon: Wallet },
  { name: "Loyalty", href: "/admin/loyalty", icon: Gift },
  { name: "Marketing", href: "/admin/marketing", icon: Megaphone },
  { name: "Geofencing", href: "/admin/geofencing", icon: Navigation },
  { name: "Integrations", href: "/admin/integrations", icon: Plug },
];

// Super Admin specific items
const superAdminNavigation: NavItem[] = [
  { name: "Operational Managers", href: "/super-admin/operational-managers", icon: UserCog, roles: ["super-admin"] },
];

// Operational Manager specific items
const operationalManagerNavigation: NavItem[] = [
  { name: "Vendors", href: "/vendors", icon: Store, roles: ["operational-manager"] },
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
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Get role-based navigation
  const getNavigation = (): NavItem[] => {
    const role = user?.role;
    
    // Super Admin should ONLY see Operational Managers page
    if (role === "super-admin") {
      return [...superAdminNavigation];
    }
    
    // Operational Manager should ONLY see Vendors page
    if (role === "operational-manager") {
      return [...operationalManagerNavigation];
    }
    
    // Admin/Vendor sees all base modules
    if (role === "admin") {
      return [...baseNavigation];
    }

    // Default: no navigation if role is not set
    return [];
  };

  const navigation = getNavigation();
  
  // Auto-expand sections that have active children
  const getInitialExpanded = () => {
    const expanded: string[] = [];
    navigation.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => pathname === child.href || pathname.startsWith(child.href + "/")
        );
        if (hasActiveChild) {
          expanded.push(item.href);
        }
      }
    });
    return expanded;
  };

  const [expandedItems, setExpandedItems] = useState<string[]>(getInitialExpanded);

  // Auto-expand sections when pathname changes
  useEffect(() => {
    const autoExpanded: string[] = [];
    navigation.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => pathname === child.href || pathname.startsWith(child.href + "/")
        );
        if (hasActiveChild) {
          autoExpanded.push(item.href);
        }
      }
    });
    // Merge auto-expanded with manually expanded items
    setExpandedItems((prev) => {
      const manualExpanded = prev.filter((href) => !autoExpanded.includes(href));
      return [...new Set([...manualExpanded, ...autoExpanded])];
    });
  }, [pathname]);

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]
    );
  };

  const isItemActive = (item: NavItem) => {
    // Check if parent is active
    const parentActive = pathname === item.href || pathname.startsWith(item.href + "/");
    // Check if any child is active
    const childActive = item.children?.some(
      (child) => pathname === child.href || pathname.startsWith(child.href + "/")
    );
    return parentActive || (childActive ?? false);
  };

  const checkChildActive = (childHref: string) => {
    return pathname === childHref || pathname.startsWith(childHref + "/");
  };

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
          {/* StoreOS/BusinessOS Logo Section with Collapse Toggle */}
          <div className={cn(
            "flex h-16 items-center border-b border-white/10 relative flex-shrink-0 sidebar-gradient rounded-t-xl",
            isCollapsed ? "justify-center px-0" : "justify-between px-4"
          )}>
            {!isCollapsed ? (
              <>
                <Link href={user?.role === "super-admin" ? "/super-admin/operational-managers" : user?.role === "operational-manager" ? "/vendors" : "/admin"} className="flex items-center gap-3 flex-1">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    {user?.role === "super-admin" || user?.role === "operational-manager" ? (
                      <>
                        <span className="text-[10px] font-bold text-white leading-none">BS</span>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F2C94C] rounded-b-full" />
                      </>
                    ) : user?.role === "admin" && user?.osType ? (
                      <>
                        <span className="text-[10px] font-bold text-white leading-none">
                          {user.osType === "StoreOS" ? "ST" : user.osType === "SpaceOS" ? "SP" : "SV"}
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F2C94C] rounded-b-full" />
                      </>
                    ) : (
                      <>
                        <span className="text-lg font-bold text-white">S</span>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F2C94C] rounded-b-full" />
                      </>
                    )}
                  </div>
                  <span className="text-base font-semibold text-white">
                    {user?.role === "super-admin" || user?.role === "operational-manager" 
                      ? "BusinessOS" 
                      : user?.role === "admin" && user?.osType
                      ? user.osType
                      : "StoreOS"}
                  </span>
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
                <Link href={user?.role === "super-admin" ? "/super-admin/operational-managers" : user?.role === "operational-manager" ? "/vendors" : "/admin"} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 relative mx-auto">
                  {user?.role === "super-admin" || user?.role === "operational-manager" ? (
                    <>
                      <span className="text-[10px] font-bold text-white leading-none">BS</span>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F2C94C] rounded-b-full" />
                    </>
                  ) : user?.role === "admin" && user?.osType ? (
                    <>
                      <span className="text-[10px] font-bold text-white leading-none">
                        {user.osType === "StoreOS" ? "ST" : user.osType === "SpaceOS" ? "SP" : "SV"}
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F2C94C] rounded-b-full" />
                    </>
                  ) : (
                    <>
                      <span className="text-lg font-bold text-white">S</span>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F2C94C] rounded-b-full" />
                    </>
                  )}
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
              const isActive = isItemActive(item);
              const isExpanded = expandedItems.includes(item.href);
              const hasChildren = item.children && item.children.length > 0;
              const Icon = item.icon;
              
              return (
                <div key={item.name} className="space-y-1">
                  {/* Parent Item */}
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => onMobileClose?.()}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 relative group flex-1",
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
                    
                    {/* Expand/Collapse Button */}
                    {!isCollapsed && hasChildren && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:bg-white/10 rounded"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleExpand(item.href);
                        }}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                  
                  {/* Children Items */}
                  {!isCollapsed && hasChildren && isExpanded && (
                    <div className="ml-4 space-y-1 border-l border-white/10 pl-2">
                      {item.children?.map((child) => {
                        const childIsActive = checkChildActive(child.href);
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => onMobileClose?.()}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                              childIsActive
                                ? "bg-[#F2C94C] text-[#1A1A1A]"
                                : "text-white/80 hover:bg-white/10 hover:text-white"
                            )}
                          >
                            <span className="flex-1">{child.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-white/10 px-2 py-2 space-y-1 flex-shrink-0 sidebar-gradient rounded-b-xl">
            <button
              onClick={handleLogout}
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
