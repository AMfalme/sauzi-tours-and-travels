import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";
import type { ReactNode } from "react";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Admin Panel</p>
            <p className="text-sm text-slate-700">Signed in as {user.email}</p>
          </div>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/admin/dashboard" className="px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100">
              Dashboard
            </Link>
            <Link href="/admin/request" className="px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100">
              All Bookings
            </Link>
            <Link href="/admin/users" className="px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100">
              Users
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
