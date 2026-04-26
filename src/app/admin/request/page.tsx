import Link from "next/link";
import { getAllBookings } from "@/app/lib/bookings";

function formatDate(dateString: string): string {
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) {
    return dateString;
  }

  return parsed.toLocaleDateString();
}

export default async function AdminBookingsPage() {
  const bookings = await getAllBookings();

  return (
    <section className="p-6 md:p-10">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">All Bookings</h1>
        <p className="text-slate-600 mt-1">Review every booking request submitted by users.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {bookings.length === 0 ? (
          <p className="p-6 text-slate-600">No bookings found yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Customer</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Package</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Travel Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Submitted</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{booking.fullName}</p>
                      <p className="text-slate-600">{booking.email}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{booking.packageName}</td>
                    <td className="px-4 py-3 text-slate-700">{booking.travelDate}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 capitalize">
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {booking.createdAt ? formatDate(booking.createdAt) : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/request/${booking.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}