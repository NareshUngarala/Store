// Global type definitions for the admin portal

export type UserRole = "super-admin" | "operational-manager" | "admin";
export type OSType = "StoreOS" | "SpaceOS" | "ServiceOS";

export interface User {
  id: string;
  name?: string;
  email: string;
  password: string;
  role: UserRole;
  osType?: OSType; // Only for admin/vendor users
  createdAt: string;
  createdBy?: string; // Email of the user who created this user
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  products: OrderProduct[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

export interface OrderProduct {
  productId: string;
  quantity: number;
  price: number;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

