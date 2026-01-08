import { ReactNode } from "react";
import { AdminLayout as AdminLayoutComponent } from "@/components/layout/AdminLayout";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminLayoutComponent>{children}</AdminLayoutComponent>;
}

