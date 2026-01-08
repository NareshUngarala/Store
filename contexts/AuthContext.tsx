"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole } from "@/types";
import { verifyCredentials, initializeDefaultSuperAdmin } from "@/lib/user-management";

interface AuthContextType {
  user: {
    email: string;
    role: UserRole;
    osType?: string;
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; role: UserRole; osType?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize default super admin if no users exist
    initializeDefaultSuperAdmin();
    
    // Check localStorage on mount
    const storedUser = localStorage.getItem("storeos_current_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (e) {
        localStorage.removeItem("storeos_current_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const verifiedUser = verifyCredentials(email, password);
    
    if (verifiedUser) {
      const userData = {
        email: verifiedUser.email,
        role: verifiedUser.role,
        osType: verifiedUser.osType,
      };
      setUser(userData);
      localStorage.setItem("storeos_current_user", JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("storeos_current_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

