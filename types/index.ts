// Global type definitions for the admin portal

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
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

