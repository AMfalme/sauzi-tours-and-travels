import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";
import type { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  return <>{children}</>;
}
