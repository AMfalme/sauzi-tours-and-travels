import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookingById } from "@/app/lib/bookings";

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatDate(dateString: string | null): string {
  if (!dateString) return "-";
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return dateString;
  return parsed.toLocaleString();
}

export default async function AdminBookingDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const booking = await getBookingById(id);

  if (!booking) {
    notFound();
  }

  return (
    <section className="p-6 md:p-10 max-w-3xl">
      <Link href="/admin/request" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
        Back to all bookings
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-3 mb-6">Booking Details</h1>

      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        <div className="p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Customer Name</p>
          <p className="mt-1 text-slate-900 font-medium">{booking.fullName}</p>
        </div>
        <div className="p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
          <p className="mt-1 text-slate-900 font-medium">{booking.email}</p>
        </div>
        <div className="p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Package</p>
          <p className="mt-1 text-slate-900 font-medium">{booking.packageName}</p>
        </div>
        <div className="p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Travel Date</p>
          <p className="mt-1 text-slate-900 font-medium">{booking.travelDate}</p>
        </div>
        <div className="p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-1 text-slate-900 font-medium capitalize">{booking.status}</p>
        </div>
        <div className="p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Submitted At</p>
          <p className="mt-1 text-slate-900 font-medium">{formatDate(booking.createdAt)}</p>
        </div>
        <div className="p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Notes</p>
          <p className="mt-1 text-slate-900 whitespace-pre-wrap">
            {booking.notes || "No additional notes provided."}
          </p>
        </div>
      </div>
    </section>
  );
}