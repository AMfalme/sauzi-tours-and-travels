import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";
import type { ReactNode } from "react";

export default async function UserLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return <>{children}</>;
}
