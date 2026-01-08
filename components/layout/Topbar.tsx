"use client";

import { Bell, Moon, Sun, ChevronDown, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface TopbarProps {
  isMobileOpen?: boolean;
  onMobileToggle?: () => void;
  isSidebarCollapsed?: boolean;
}

function getPageTitle(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0 || (segments.length === 1 && segments[0] === "admin")) {
    return "Dashboard";
  }
  
  const lastSegment = segments[segments.length - 1];
  return lastSegment
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getRoleDisplayName(role: string | null): string {
  switch (role) {
    case "super-admin":
      return "Super Admin";
    case "operational-manager":
      return "Operational Manager";
    case "admin":
      return "Admin";
    default:
      return "User";
  }
}

function getInitials(email: string): string {
  return email
    .split("@")[0]
    .split(".")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";
}

export function Topbar({ isMobileOpen = false, onMobileToggle, isSidebarCollapsed = false }: TopbarProps) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pageTitle = getPageTitle(pathname);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className={cn(
      "fixed z-50 bg-transparent transition-all duration-300 ease-in-out",
      "top-2 left-2 right-2",
      "lg:left-[260px] lg:right-2",
      isSidebarCollapsed && "lg:left-20",
      "px-2"
    )}>
      <div className={cn(
        "flex h-16 items-center gap-4 px-4 sm:px-6 bg-white rounded-xl shadow-sm border-b border-[#E6EAF0]",
        "w-full"
      )}>
        {/* Mobile menu button */}
        {onMobileToggle && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-[#0B1D39] hover:bg-[#F6F8FC]"
            onClick={onMobileToggle}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        )}

        {/* Page Title - Left side */}
        <h1 className="text-lg sm:text-xl font-semibold text-[#0B1D39] flex-shrink-0">
          {pageTitle}
        </h1>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions - Right side */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-[#0B1D39] hover:bg-[#F6F8FC] h-9 w-9"
          >
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#EF4444] border-2 border-white" />
          </Button>

          {/* Light/Dark Mode Toggle - Hidden on mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex text-[#0B1D39] hover:bg-[#F6F8FC] h-9 w-9"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 h-auto py-2 px-2 sm:px-3 hover:bg-[#F6F8FC]"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#0B1D39] to-[#08162D] flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-xs font-semibold text-white">
                      {user ? getInitials(user.email) : "U"}
                    </span>
                  </div>
                  <div className="hidden lg:flex flex-col items-start">
                    <span className="text-sm font-medium text-[#0B1D39]">
                      {user?.email || "User"}
                    </span>
                    <span className="text-xs text-[#6B7280]">
                      {user ? getRoleDisplayName(user.role) : "Guest"}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-[#6B7280] hidden sm:block" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[#EF4444]" onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
