"use client";

import { useState } from "react";

type BookingFormState = {
  fullName: string;
  email: string;
  travelDate: string;
  packageName: string;
  notes: string;
};

const initialState: BookingFormState = {
  fullName: "",
  email: "",
  travelDate: "",
  packageName: "",
  notes: "",
};

type BookingFormProps = {
  initialPackageName?: string;
  onSuccess?: () => void;
  className?: string;
};

export default function BookingForm({ initialPackageName, onSuccess, className }: BookingFormProps) {
  const [form, setForm] = useState<BookingFormState>({
    ...initialState,
    packageName: initialPackageName ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit booking");
      }

      setSuccessMessage("Booking submitted successfully. We will contact you soon.");
      setForm({ ...initialState, packageName: initialPackageName ?? "" });
      onSuccess?.();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to submit booking right now.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 p-6 ${className ?? "bg-white shadow-md rounded-lg"}`}>
      {initialPackageName ? (
        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          Booking for <span className="font-semibold">{initialPackageName}</span>
        </div>
      ) : null}

      <input
        type="text"
        name="fullName"
        value={form.fullName}
        onChange={handleFieldChange}
        placeholder="Full Name"
        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleFieldChange}
        placeholder="Email"
        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="date"
        name="travelDate"
        value={form.travelDate}
        onChange={handleFieldChange}
        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
        required
      />
      <select
        name="packageName"
        value={form.packageName}
        onChange={handleFieldChange}
        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Package</option>
        {initialPackageName ? (
          <option value={initialPackageName}>{initialPackageName}</option>
        ) : null}
        <option value="Family Safari">Family Safari</option>
        <option value="Beach Escape">Beach Escape</option>
        <option value="Adventure Trek">Adventure Trek</option>
      </select>
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleFieldChange}
        placeholder="Notes (optional)"
        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 min-h-24"
      />

      {successMessage ? (
        <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-3 py-2">
          {successMessage}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="bg-brand-primary text-white px-6 py-3 rounded disabled:opacity-70"
      >
        {loading ? "Submitting..." : "Book Now"}
      </button>
    </form>
  );
}
