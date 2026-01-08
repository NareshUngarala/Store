// User management utility functions
import { User, UserRole, OSType } from "@/types";

const USERS_STORAGE_KEY = "storeos_users";

// Get all users from localStorage
export function getAllUsers(): User[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Error reading users from storage:", e);
    return [];
  }
}

// Save users to localStorage
function saveUsers(users: User[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("Error saving users to storage:", e);
  }
}

// Create a new user
export function createUser(
  email: string,
  password: string,
  role: UserRole,
  osType?: OSType,
  createdBy?: string
): User {
  const users = getAllUsers();
  
  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    throw new Error("User with this email already exists");
  }
  
  const newUser: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email,
    password,
    role,
    osType,
    createdAt: new Date().toISOString(),
    createdBy,
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return newUser;
}

// Get user by email
export function getUserByEmail(email: string): User | null {
  const users = getAllUsers();
  return users.find((u) => u.email === email) || null;
}

// Verify user credentials
export function verifyCredentials(email: string, password: string): User | null {
  const user = getUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
}

// Get users by role
export function getUsersByRole(role: UserRole): User[] {
  const users = getAllUsers();
  return users.filter((u) => u.role === role);
}

// Delete user
export function deleteUser(userId: string): boolean {
  const users = getAllUsers();
  const filtered = users.filter((u) => u.id !== userId);
  
  if (filtered.length < users.length) {
    saveUsers(filtered);
    return true;
  }
  return false;
}

// Initialize with a default super admin if no users exist
export function initializeDefaultSuperAdmin(): void {
  if (typeof window === "undefined") return;
  
  const users = getAllUsers();
  const superAdminEmail = "superadmin@businessos.com";
  
  // Check if super admin with correct email already exists
  const existingSuperAdmin = users.find(
    (u) => u.email === superAdminEmail && u.role === "super-admin"
  );
  
  if (!existingSuperAdmin) {
    // Check if there's an old super admin with different email
    const oldSuperAdmin = users.find((u) => u.role === "super-admin");
    
    if (oldSuperAdmin) {
      // Delete old super admin
      deleteUser(oldSuperAdmin.id);
    }
    
    // Create new super admin with correct email
    createUser(
      superAdminEmail,
      "admin123",
      "super-admin"
    );
  }
}

