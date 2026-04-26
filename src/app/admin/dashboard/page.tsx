import Link from "next/link";

export default function Dashboard() {
  return (
    <section className="p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Admin Dashboard</h1>
      <p className="text-slate-600 mt-1">Manage bookings and users from one place.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-3xl">
        <Link
          href="/admin/request"
          className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition"
        >
          <p className="text-slate-900 font-semibold">View All Bookings</p>
          <p className="text-sm text-slate-600 mt-1">Open every submitted booking request.</p>
        </Link>

        <Link
          href="/admin/users"
          className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition"
        >
          <p className="text-slate-900 font-semibold">Manage Users</p>
          <p className="text-sm text-slate-600 mt-1">Review registered users and accounts.</p>
        </Link>
      </div>
    </section>
  );
}