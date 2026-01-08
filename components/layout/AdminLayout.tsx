"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F8FC] m-0 p-0">
      {/* Fixed Topbar */}
      <Topbar 
        isMobileOpen={isMobileOpen} 
        onMobileToggle={() => setIsMobileOpen(!isMobileOpen)}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      {/* Main Layout - Sidebar + Content */}
      <div className="flex">  
        {/* Sidebar */}
        <Sidebar 
          isMobileOpen={isMobileOpen} 
          onMobileClose={() => setIsMobileOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        {/* Main Content Area */}
        <main 
          className={`
            flex-1 min-h-screen
            transition-all duration-300 ease-in-out
            ml-0 mt-20
            ${isSidebarCollapsed ? 'lg:ml-24' : 'lg:ml-[268px]'}
          `}
        >
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
