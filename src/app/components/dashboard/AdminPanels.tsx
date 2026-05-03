"use client";

import type { BookingRecord } from "@/app/lib/bookings";
import type { UserRecord } from "@/app/lib/auth";
import { useEffect, useState } from "react";
import {
  PACKAGE_CATEGORIES,
  type PackageRecord,
  type PackageStatus,
} from "@/app/lib/packages";
import Image from "next/image";
import { dashboardTheme } from "@/app/components/dashboard/theme";
import { ImageUploadManager, uploadImagesToCloudinary } from "@/app/components/dashboard/ImageUploadManager";

type TourRequestRecord = {
  id: string;
  destination: string;
  date: string;
  guests: string;
  childrenAges: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  createdAt?: string | null;
};

type RequestsPanelProps = {
  loading: boolean;
  error: string;
  bookings: BookingRecord[];
  filter?: "all" | "pending" | "confirmed";
  formatDate: (date: string | null | undefined) => string;
};

type TourRequestsPanelProps = {
  loading: boolean;
  error: string;
  requests: TourRequestRecord[];
  formatDate: (date: string | null | undefined) => string;
};

type UsersPanelProps = {
  loading: boolean;
  error: string;
  users: UserRecord[];
  formatDate: (date: string | null | undefined) => string;
  onRoleUpdated: (userId: string, role: UserRecord["role"]) => void;
  currentUserId: string;
};

type PackageFormState = {
  title: string;
  category: (typeof PACKAGE_CATEGORIES)[number];
  starRating: string;
  location: string;
  price: string;
  currency: string;
  duration: string;
  featured: boolean;
  status: PackageStatus;
  images: string;
  description: string;
  includes: string;
  // Availability and display fields (all optional)
  availabilityStartDate: string;
  availabilityEndDate: string;
  maxSlots: string;
  availableSlots: string;
  displayStartDate: string;
  displayEndDate: string;
};

type ToastState = {
  type: "success" | "error";
  message: string;
  floating?: boolean;
};

function StatusToast({ type, message, floating = false }: ToastState) {
  const isSuccess = type === "success";

  return (
    <p
      role="status"
      aria-live="polite"
      className={`rounded-lg border px-3 py-2 text-sm shadow-lg ${floating ? "fixed right-4 top-4 z-[80] max-w-sm" : ""} ${isSuccess ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}
    >
      {message}
    </p>
  );
}

export function RequestsPanel({ loading, error, bookings, formatDate, filter = "all" }: RequestsPanelProps) {
  const filteredBookings =
    filter === "all" ? bookings : bookings.filter((item) => item.status === filter);

  const filterLabel =
    filter === "all" ? "All Requests" : filter === "pending" ? "Pending Requests" : "Confirmed Trips";

  return (
    <article className="rounded-xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: dashboardTheme.border }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: dashboardTheme.border }}>
        <h3 className="font-semibold" style={{ color: dashboardTheme.textDark }}>Booking Requests</h3>
        <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>
          {filterLabel} - admin view of submitted booking requests.
        </p>
      </div>

      <div className="p-5">
        {loading ? <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>Loading requests...</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        {!loading && !error ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b" style={{ color: dashboardTheme.textMuted, borderColor: dashboardTheme.border }}>
                  <th className="py-3 pr-4 font-medium">Customer</th>
                  <th className="py-3 pr-4 font-medium">Package</th>
                  <th className="py-3 pr-4 font-medium">Travel Date</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b" style={{ borderColor: "#f1f5f9" }}>
                    <td className="py-3 pr-4">
                      <p className="font-medium" style={{ color: dashboardTheme.textDark }}>{booking.fullName}</p>
                      <p style={{ color: dashboardTheme.textMuted }}>{booking.email}</p>
                    </td>
                    <td className="py-3 pr-4" style={{ color: dashboardTheme.textDark }}>{booking.packageName}</td>
                    <td className="py-3 pr-4" style={{ color: dashboardTheme.textDark }}>{booking.travelDate}</td>
                    <td className="py-3 pr-4 capitalize" style={{ color: dashboardTheme.secondary }}>{booking.status}</td>
                    <td className="py-3 pr-4" style={{ color: dashboardTheme.textDark }}>{formatDate(booking.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function TourRequestsPanel({ loading, error, requests, formatDate }: TourRequestsPanelProps) {
  return (
    <article className="rounded-xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: dashboardTheme.border }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: dashboardTheme.border }}>
        <h3 className="font-semibold" style={{ color: dashboardTheme.textDark }}>Tour Requests</h3>
        <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>
          General tour inquiries from the hero section form.
        </p>
      </div>

      <div className="p-5">
        {loading ? <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>Loading requests...</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        {!loading && !error ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b" style={{ color: dashboardTheme.textMuted, borderColor: dashboardTheme.border }}>
                  <th className="py-3 pr-4 font-medium">Customer</th>
                  <th className="py-3 pr-4 font-medium">Destination</th>
                  <th className="py-3 pr-4 font-medium">Travel Date</th>
                  <th className="py-3 pr-4 font-medium">Guests</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-b" style={{ borderColor: "#f1f5f9" }}>
                    <td className="py-3 pr-4" style={{ color: dashboardTheme.textDark }}>
                      <div>
                        <div className="font-medium">{request.name}</div>
                        <div className="text-xs" style={{ color: dashboardTheme.textMuted }}>{request.email}</div>
                        {request.phone && <div className="text-xs" style={{ color: dashboardTheme.textMuted }}>{request.phone}</div>}
                      </div>
                    </td>
                    <td className="py-3 pr-4" style={{ color: dashboardTheme.textDark }}>{request.destination}</td>
                    <td className="py-3 pr-4" style={{ color: dashboardTheme.textDark }}>{formatDate(request.date)}</td>
                    <td className="py-3 pr-4" style={{ color: dashboardTheme.textDark }}>{request.guests}</td>
                    <td className="py-3 pr-4 capitalize" style={{ color: dashboardTheme.secondary }}>{request.status}</td>
                    <td className="py-3 pr-4" style={{ color: dashboardTheme.textDark }}>{formatDate(request.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function UsersPanel({ loading, error, users, formatDate, onRoleUpdated, currentUserId }: UsersPanelProps) {
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!successMessage) return;

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

  const updateRole = async (userId: string, role: UserRecord["role"]) => {
    try {
      setUpdatingUserId(userId);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role }),
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(result.message || "Failed to update user role");
      }

      onRoleUpdated(userId, role);
      setSuccessMessage("User role updated successfully.");
    } catch (updateError) {
      setErrorMessage(updateError instanceof Error ? updateError.message : "Failed to update user role");
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <article className="rounded-xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: dashboardTheme.border }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: dashboardTheme.border }}>
        <h3 className="font-semibold" style={{ color: dashboardTheme.textDark }}>Users</h3>
        <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>Admin-only user role management</p>
      </div>

      <div className="p-5">
        {loading ? <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>Loading users...</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
        {successMessage ? <StatusToast type="success" message={successMessage} floating /> : null}

        {!loading && !error ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b" style={{ color: dashboardTheme.textMuted, borderColor: dashboardTheme.border }}>
                  <th className="py-3 pr-4 font-medium">Name</th>
                  <th className="py-3 pr-4 font-medium">Email</th>
                  <th className="py-3 pr-4 font-medium">Role</th>
                  <th className="py-3 pr-4 font-medium">Actions</th>
                  <th className="py-3 pr-4 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((account) => (
                  <tr key={account.id} className="border-b" style={{ borderColor: "#f1f5f9" }}>
                    <td className="py-3 pr-4 font-medium" style={{ color: dashboardTheme.textDark }}>{account.name}</td>
                    <td className="py-3 pr-4" style={{ color: dashboardTheme.textDark }}>{account.email}</td>
                    <td className="py-3 pr-4 capitalize" style={{ color: dashboardTheme.primary }}>{account.role}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">
                      {(() => {
                        const nextRole: UserRecord["role"] = account.role === "admin" ? "user" : "admin";
                        const isSelfAdminDemotion =
                          account.id === currentUserId && account.role === "admin" && nextRole === "user";

                        return (
                      <button
                        type="button"
                        onClick={() => {
                          if (isSelfAdminDemotion) {
                            setErrorMessage("You cannot demote your own admin account.");
                            return;
                          }

                          const confirmed = window.confirm(
                            `Are you sure you want to change ${account.name || account.email} to ${nextRole}?`
                          );

                          if (!confirmed) return;
                          void updateRole(account.id, nextRole);
                        }}
                        disabled={updatingUserId === account.id || isSelfAdminDemotion}
                        className="rounded px-3 py-1 text-white text-xs disabled:opacity-70"
                        style={{ backgroundColor: account.role === "admin" ? "#ef4444" : dashboardTheme.secondary }}
                      >
                        {updatingUserId === account.id
                          ? "Updating..."
                          : isSelfAdminDemotion
                            ? "Current admin account"
                            : account.role === "admin"
                            ? "Set as user"
                            : "Set as admin"}
                      </button>
                        );
                      })()}
                    </td>
                    <td className="py-3 pr-4" style={{ color: dashboardTheme.textDark }}>{formatDate(account.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </article>
  );
}

const initialPackageForm: PackageFormState = {
  title: "",
  category: "safari",
  starRating: "",
  location: "Kenya",
  price: "450",
  currency: "KES",
  duration: "3 Days",
  featured: true,
  status: "active",
  images: "",
  description: "Amazing wildlife experience...",
  includes: "Transport, Hotel, Meals",
  // Availability and display fields (empty by default - optional)
  availabilityStartDate: "",
  availabilityEndDate: "",
  maxSlots: "",
  availableSlots: "",
  displayStartDate: "",
  displayEndDate: "",
};

export function CreatePackagePanel() {
  const [form, setForm] = useState<PackageFormState>(initialPackageForm);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, featured: event.target.checked }));
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleUploadImages = async () => {
    try {
      setUploadingImages(true);
      await uploadImagesToCloudinary(selectedFiles);
      setSelectedFiles([]);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to upload images");
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const isPopularCategory = form.category === "popular";
      const parsedStarRating = Number(form.starRating);

      if (
        isPopularCategory &&
        (!form.starRating.trim() || Number.isNaN(parsedStarRating) || parsedStarRating < 0 || parsedStarRating > 5)
      ) {
        throw new Error("Star rating for popular packages must be a number between 0 and 5.");
      }

      const manualUrls = form.images
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const response = await fetch("/api/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          starRating: isPopularCategory ? parsedStarRating : null,
          location: form.location,
          price: Number(form.price),
          currency: form.currency,
          duration: form.duration,
          featured: form.featured,
          status: form.status,
          images: manualUrls,
          description: form.description,
          includes: form.includes
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          // Availability and display fields (optional)
          availabilityStartDate: form.availabilityStartDate || undefined,
          availabilityEndDate: form.availabilityEndDate || undefined,
          maxSlots: String(form.maxSlots).trim() !== "" ? Number(form.maxSlots) : undefined,
          availableSlots: String(form.availableSlots).trim() !== "" ? Number(form.availableSlots) : undefined,
          displayStartDate: form.displayStartDate || undefined,
          displayEndDate: form.displayEndDate || undefined,
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Failed to create package");
      }

      setSuccessMessage("Package created successfully.");
      setForm(initialPackageForm);
      setSelectedFiles([]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create package";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="rounded-xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: dashboardTheme.border }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: dashboardTheme.border }}>
        <h3 className="font-semibold" style={{ color: dashboardTheme.textDark }}>Create Package</h3>
        <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>
          Add new packages for the public catalog.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
            Title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
              required
            />
          </label>

          <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
            Category
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
            >
              {PACKAGE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
            Location
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
              required
            />
          </label>

          <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
            Price
            <input
              type="number"
              min="0"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
              required
            />
          </label>

          <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
            Star Rating {form.category === "popular" ? "(required)" : "(popular only)"}
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              name="starRating"
              value={form.starRating}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
              placeholder="4.8"
              required={form.category === "popular"}
            />
          </label>

          <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
            Currency
            <input
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
            />
          </label>

          <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
            Duration
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
              required
            />
          </label>

          <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
            Status
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm mt-7" style={{ color: dashboardTheme.textMuted }}>
            <input type="checkbox" checked={form.featured} onChange={handleCheckbox} />
            Featured package
          </label>
        </div>

        {/* Availability and Display Settings */}
        <div className="border-t pt-4 mt-6" style={{ borderColor: dashboardTheme.border }}>
          <h4 className="text-sm font-medium mb-3" style={{ color: dashboardTheme.textDark }}>
            Availability & Display Settings (Optional)
          </h4>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
              Availability Start Date
              <input
                type="date"
                name="availabilityStartDate"
                value={form.availabilityStartDate}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
              />
            </label>

            <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
              Availability End Date
              <input
                type="date"
                name="availabilityEndDate"
                value={form.availabilityEndDate}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
              />
            </label>

            <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
              Max Slots
              <input
                type="number"
                min="1"
                name="maxSlots"
                value={form.maxSlots}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
                placeholder="20"
              />
            </label>

            <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
              Available Slots
              <input
                type="number"
                min="0"
                name="availableSlots"
                value={form.availableSlots}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
                placeholder="15"
              />
            </label>

            <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
              Display Start Date
              <input
                type="date"
                name="displayStartDate"
                value={form.displayStartDate}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
              />
            </label>

            <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
              Display End Date
              <input
                type="date"
                name="displayEndDate"
                value={form.displayEndDate}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
              />
            </label>
          </div>
          <p className="text-xs mt-2" style={{ color: dashboardTheme.textMuted }}>
            Leave fields empty for packages that should always be available/displayed. Display dates control when packages appear on the frontend.
          </p>
        </div>

        <ImageUploadManager
          existingImages={form.images
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)}
          selectedFiles={selectedFiles}
          isUploading={uploadingImages}
          onFilesSelected={handleFilesSelected}
          onImageRemoved={(index) => {
            const urls = form.images
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean);
            urls.splice(index, 1);
            setForm((prev) => ({ ...prev, images: urls.join(", ") }));
          }}
          onUpload={handleUploadImages}
          showUploadButton={true}
          maxColumns="3"
        />

        <label className="block text-sm" style={{ color: dashboardTheme.textMuted }}>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm min-h-24"
            style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
            required
          />
        </label>

        <label className="block text-sm" style={{ color: dashboardTheme.textMuted }}>
          Includes (comma separated)
          <textarea
            name="includes"
            value={form.includes}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm min-h-20"
            style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
            required
          />
        </label>

        {successMessage ? <StatusToast type="success" message={successMessage} floating /> : null}

        {errorMessage ? <StatusToast type="error" message={errorMessage} /> : null}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg px-4 py-2 text-white text-sm font-medium disabled:opacity-70"
          style={{ backgroundColor: dashboardTheme.primary }}
        >
          {loading ? "Creating package..." : "Create Package"}
        </button>
      </form>
    </article>
  );
}

export function ViewPackagesPanel() {
  const [packages, setPackages] = useState<PackageRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | PackageRecord["category"]>("all");
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "featured">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSelectedFiles, setEditSelectedFiles] = useState<File[]>([]);
  const [editUploadingImages, setEditUploadingImages] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<{ id: string; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editedForm, setEditedForm] = useState({
    title: "",
    category: "safari" as (typeof PACKAGE_CATEGORIES)[number],
    starRating: "",
    location: "",
    price: "0",
    currency: "KES",
    duration: "",
    featured: false,
    status: "active" as PackageStatus,
    description: "",
    includes: "",
    images: "",
    // Availability and display fields
    availabilityStartDate: "",
    availabilityEndDate: "",
    maxSlots: "",
    availableSlots: "",
    displayStartDate: "",
    displayEndDate: "",
  });

  const fetchPackages = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await fetch("/api/packages");
      const result = (await response.json()) as { packages?: PackageRecord[]; message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch packages");
      }

      setPackages(result.packages ?? []);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPackages();
  }, []);

  useEffect(() => {
    if (!successMessage) return;

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

  const startEdit = (item: PackageRecord) => {
    setEditingId(item.id);
    setEditSelectedFiles([]);
    setEditedForm({
      title: item.title,
      category: item.category,
      starRating: item.starRating === null ? "" : String(item.starRating),
      location: item.location,
      price: String(item.price),
      currency: item.currency,
      duration: item.duration,
      featured: item.featured,
      status: item.status,
      description: item.description,
      includes: item.includes.join(", "),
      images: item.images.join(", "),
      // Availability and display fields
      availabilityStartDate: item.availabilityStartDate || "",
      availabilityEndDate: item.availabilityEndDate || "",
      maxSlots: item.maxSlots ? String(item.maxSlots) : "",
      availableSlots: item.availableSlots ? String(item.availableSlots) : "",
      displayStartDate: item.displayStartDate || "",
      displayEndDate: item.displayEndDate || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditSelectedFiles([]);
    setEditedForm({
      title: "",
      category: "safari",
      starRating: "",
      location: "",
      price: "0",
      currency: "KES",
      duration: "",
      featured: false,
      status: "active",
      description: "",
      includes: "",
      images: "",
      // Availability and display fields
      availabilityStartDate: "",
      availabilityEndDate: "",
      maxSlots: "",
      availableSlots: "",
      displayStartDate: "",
      displayEndDate: "",
    });
  };

  const handleEditField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditedForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFilesSelected = (files: File[]) => {
    setEditSelectedFiles(files);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleEditUploadImages = async () => {
    try {
      setEditUploadingImages(true);
      await uploadImagesToCloudinary(editSelectedFiles);
      setEditSelectedFiles([]);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to upload images");
    } finally {
      setEditUploadingImages(false);
    }
  };

  const saveEdit = async (id: string) => {
    try {
      setErrorMessage("");
      const isPopularCategory = editedForm.category === "popular";
      const parsedStarRating = Number(editedForm.starRating);

      if (
        isPopularCategory &&
        (!editedForm.starRating.trim() || Number.isNaN(parsedStarRating) || parsedStarRating < 0 || parsedStarRating > 5)
      ) {
        throw new Error("Star rating for popular packages must be a number between 0 and 5.");
      }

      const existingUrls = editedForm.images
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const response = await fetch("/api/packages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          title: editedForm.title,
          category: editedForm.category,
          starRating: isPopularCategory
            ? parsedStarRating
            : editedForm.starRating.trim()
              ? Number(editedForm.starRating)
              : null,
          location: editedForm.location,
          price: Number(editedForm.price),
          currency: editedForm.currency,
          duration: editedForm.duration,
          featured: editedForm.featured,
          status: editedForm.status,
          description: editedForm.description,
          includes: editedForm.includes
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          images: existingUrls,
          // Availability and display fields
          availabilityStartDate: editedForm.availabilityStartDate || undefined,
          availabilityEndDate: editedForm.availabilityEndDate || undefined,
          maxSlots: String(editedForm.maxSlots).trim() !== "" ? Number(editedForm.maxSlots) : undefined,
          availableSlots: String(editedForm.availableSlots).trim() !== "" ? Number(editedForm.availableSlots) : undefined,
          displayStartDate: editedForm.displayStartDate || undefined,
          displayEndDate: editedForm.displayEndDate || undefined,
        }),
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(result.message || "Failed to update package");
      }

      cancelEdit();
      await fetchPackages();
      setSuccessMessage("Package updated successfully.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to update package");
    }
  };

  const deletePackage = async (id: string) => {
    try {
      setDeleting(true);
      setErrorMessage("");
      const response = await fetch(`/api/packages?id=${id}`, { method: "DELETE" });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(result.message || "Failed to delete package");
      }

      await fetchPackages();
      setDeleteCandidate(null);
      setSuccessMessage("Package deleted successfully.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to delete package");
    } finally {
      setDeleting(false);
    }
  };

  const filteredPackages = packages.filter((item) => {
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesFeatured = featuredFilter === "all" || item.featured;
    return matchesCategory && matchesFeatured;
  });

  const clearFilters = () => {
    setCategoryFilter("all");
    setFeaturedFilter("all");
  };

  return (
    <article className="rounded-xl border bg-white shadow-sm overflow-hidden" style={{ borderColor: dashboardTheme.border }}>
      <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: dashboardTheme.border }}>
        <div>
          <h3 className="font-semibold" style={{ color: dashboardTheme.textDark }}>View Packages</h3>
          <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>
            Manage existing package entries.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void fetchPackages()}
          className="rounded-lg px-3 py-2 text-white text-sm"
          style={{ backgroundColor: dashboardTheme.secondary }}
        >
          Refresh
        </button>
      </div>

      <div className="p-5">
        {loading ? <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>Loading packages...</p> : null}
        {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
        {successMessage ? <StatusToast type="success" message={successMessage} floating /> : null}

        <div className="mb-4 grid gap-3 md:grid-cols-[1.2fr_1fr_auto] md:items-end">
          <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
            Category
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value as "all" | PackageRecord["category"])}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-white"
              style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
            >
              <option value="all">All categories</option>
              {PACKAGE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm" style={{ color: dashboardTheme.textMuted }}>
            Featured
            <select
              value={featuredFilter}
              onChange={(event) => setFeaturedFilter(event.target.value as "all" | "featured")}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-white"
              style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
            >
              <option value="all">All packages</option>
              <option value="featured">Featured only</option>
            </select>
          </label>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border px-4 py-2 text-sm font-medium"
            style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
          >
            Clear filters
          </button>
        </div>

        <p className="mb-4 text-sm" style={{ color: dashboardTheme.textMuted }}>
          Showing {filteredPackages.length} of {packages.length} package(s).
        </p>

        {!loading ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed text-sm">
              <thead>
                <tr className="text-left border-b" style={{ color: dashboardTheme.textMuted, borderColor: dashboardTheme.border }}>
                  <th className="w-[18%] py-3 pr-4 font-medium">Title</th>
                  <th className="w-[10%] py-3 pr-4 font-medium">Image</th>
                  <th className="w-[12%] py-3 pr-4 font-medium">Category</th>
                  <th className="w-[8%] py-3 pr-4 font-medium">Rating</th>
                  <th className="w-[10%] py-3 pr-4 font-medium">Price</th>
                  <th className="w-[8%] py-3 pr-4 font-medium">Slots</th>
                  <th className="w-[10%] py-3 pr-4 font-medium">Status</th>
                  <th className="w-[8%] py-3 pr-4 font-medium">Featured</th>
                  <th className="w-[16%] py-3 pr-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPackages.map((item) => {
                  const isEditing = editingId === item.id;
                  const currentEditedImages = editedForm.images
                    .split(",")
                    .map((imageUrl) => imageUrl.trim())
                    .filter(Boolean);

                  return (
                    <>
                      <tr
                        className={`border-b align-top ${isEditing ? "bg-emerald-50/60" : ""}`}
                        style={{ borderColor: "#f1f5f9" }}
                      >
                        <td className="py-3 pr-4 align-top break-words" style={{ color: dashboardTheme.textDark }}>{item.title}</td>
                        <td className="py-3 pr-4 align-top">
                          {item.images && item.images.length > 0 ? (
                            <div className="w-16 h-12 rounded border overflow-hidden" style={{ borderColor: dashboardTheme.border }}>
                              <Image
                                src={item.images[0]}
                                alt="Package thumbnail"
                                fill
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-12 rounded border flex items-center justify-center bg-slate-50 text-xs" style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textMuted }}>
                              No image
                            </div>
                          )}
                        </td>
                        <td className="py-3 pr-4 align-top capitalize whitespace-nowrap" style={{ color: dashboardTheme.textDark }}>{item.category}</td>
                        <td className="py-3 pr-4 align-top whitespace-nowrap" style={{ color: dashboardTheme.textDark }}>
                          {item.starRating === null ? "-" : item.starRating.toFixed(1)}
                        </td>
                        <td className="py-3 pr-4 align-top whitespace-nowrap" style={{ color: dashboardTheme.textDark }}>
                          {item.currency} {item.price}
                        </td>
                        <td className="py-3 pr-4 align-top whitespace-nowrap" style={{ color: dashboardTheme.textDark }}>
                          {item.availableSlots !== undefined ? (
                            <span className={item.availableSlots <= 0 ? "text-red-600 font-medium" : ""}>
                              {item.availableSlots}
                              {item.maxSlots ? `/${item.maxSlots}` : ""}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-3 pr-4 align-top capitalize whitespace-nowrap" style={{ color: dashboardTheme.textDark }}>
                          {item.status}
                        </td>
                        <td className="py-3 pr-4 align-top whitespace-nowrap" style={{ color: dashboardTheme.textDark }}>
                          {item.featured ? "Yes" : "No"}
                        </td>
                        <td className="py-3 pr-4 align-top whitespace-nowrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={() => startEdit(item)}
                              className="rounded px-3 py-1 text-white text-xs"
                              style={{ backgroundColor: dashboardTheme.primary }}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeleteCandidate({ id: item.id, title: item.title })}
                              className="rounded px-3 py-1 text-white text-xs bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>

                      {isEditing ? (
                        <tr className="border-b" style={{ borderColor: "#f1f5f9" }}>
                          <td colSpan={9} className="px-0 py-4">
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
                              <div className="mb-3 flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Editing package</p>
                                  <p className="text-sm font-medium" style={{ color: dashboardTheme.textDark }}>{item.title}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={cancelEdit}
                                  className="rounded-full border px-3 py-1 text-xs font-medium"
                                  style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark, backgroundColor: "#fff" }}
                                >
                                  Close editor
                                </button>
                              </div>

                              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                <input name="title" value={editedForm.title} onChange={handleEditField} className="rounded border px-3 py-2 text-sm bg-white" style={{ borderColor: dashboardTheme.border }} placeholder="Title" />
                                <select name="category" value={editedForm.category} onChange={handleEditField} className="rounded border px-3 py-2 text-sm bg-white" style={{ borderColor: dashboardTheme.border }}>
                                  {PACKAGE_CATEGORIES.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                  ))}
                                </select>
                                <input type="number" min="0" max="5" step="0.1" name="starRating" value={editedForm.starRating} onChange={handleEditField} className="rounded border px-3 py-2 text-sm bg-white" style={{ borderColor: dashboardTheme.border }} placeholder="Star rating (popular only)" required={editedForm.category === "popular"} />
                                <input name="location" value={editedForm.location} onChange={handleEditField} className="rounded border px-3 py-2 text-sm bg-white" style={{ borderColor: dashboardTheme.border }} placeholder="Location" />

                                <input type="number" min="0" step="0.01" name="price" value={editedForm.price} onChange={handleEditField} className="rounded border px-3 py-2 text-sm bg-white" style={{ borderColor: dashboardTheme.border }} placeholder="Price" />
                                <input name="currency" value={editedForm.currency} onChange={handleEditField} className="rounded border px-3 py-2 text-sm bg-white" style={{ borderColor: dashboardTheme.border }} placeholder="Currency" />
                                <input name="duration" value={editedForm.duration} onChange={handleEditField} className="rounded border px-3 py-2 text-sm bg-white" style={{ borderColor: dashboardTheme.border }} placeholder="Duration" />

                                <select name="status" value={editedForm.status} onChange={handleEditField} className="rounded border px-3 py-2 text-sm bg-white" style={{ borderColor: dashboardTheme.border }}>
                                  <option value="active">active</option>
                                  <option value="inactive">inactive</option>
                                </select>
                                <label className="flex items-center gap-2 rounded border px-3 py-2 text-sm bg-white" style={{ borderColor: dashboardTheme.border }}>
                                  <input
                                    type="checkbox"
                                    checked={editedForm.featured}
                                    onChange={(event) =>
                                      setEditedForm((prev) => ({ ...prev, featured: event.target.checked }))
                                    }
                                  />
                                  Featured
                                </label>
                              </div>

                              <textarea name="description" value={editedForm.description} onChange={handleEditField} className="mt-3 w-full rounded border px-3 py-2 text-sm min-h-20 bg-white" style={{ borderColor: dashboardTheme.border }} placeholder="Description" />
                              <textarea name="includes" value={editedForm.includes} onChange={handleEditField} className="mt-3 w-full rounded border px-3 py-2 text-sm min-h-16 bg-white" style={{ borderColor: dashboardTheme.border }} placeholder="Includes (comma separated)" />

                              {/* Availability and Display Settings */}
                              <div className="mt-4 border-t pt-4" style={{ borderColor: dashboardTheme.border }}>
                                <h5 className="text-sm font-medium mb-3" style={{ color: dashboardTheme.textDark }}>
                                  Availability & Display Settings (Optional)
                                </h5>
                                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                  <input
                                    type="date"
                                    name="availabilityStartDate"
                                    value={editedForm.availabilityStartDate}
                                    onChange={handleEditField}
                                    className="rounded border px-3 py-2 text-sm bg-white"
                                    style={{ borderColor: dashboardTheme.border }}
                                    placeholder="Availability Start Date"
                                  />
                                  <input
                                    type="date"
                                    name="availabilityEndDate"
                                    value={editedForm.availabilityEndDate}
                                    onChange={handleEditField}
                                    className="rounded border px-3 py-2 text-sm bg-white"
                                    style={{ borderColor: dashboardTheme.border }}
                                    placeholder="Availability End Date"
                                  />
                                  <input
                                    type="number"
                                    min="1"
                                    name="maxSlots"
                                    value={editedForm.maxSlots}
                                    onChange={handleEditField}
                                    className="rounded border px-3 py-2 text-sm bg-white"
                                    style={{ borderColor: dashboardTheme.border }}
                                    placeholder="Max Slots"
                                  />
                                  <input
                                    type="number"
                                    min="0"
                                    name="availableSlots"
                                    value={editedForm.availableSlots}
                                    onChange={handleEditField}
                                    className="rounded border px-3 py-2 text-sm bg-white"
                                    style={{ borderColor: dashboardTheme.border }}
                                    placeholder="Available Slots"
                                  />
                                  <input
                                    type="date"
                                    name="displayStartDate"
                                    value={editedForm.displayStartDate}
                                    onChange={handleEditField}
                                    className="rounded border px-3 py-2 text-sm bg-white"
                                    style={{ borderColor: dashboardTheme.border }}
                                    placeholder="Display Start Date"
                                  />
                                  <input
                                    type="date"
                                    name="displayEndDate"
                                    value={editedForm.displayEndDate}
                                    onChange={handleEditField}
                                    className="rounded border px-3 py-2 text-sm bg-white"
                                    style={{ borderColor: dashboardTheme.border }}
                                    placeholder="Display End Date"
                                  />
                                </div>
                                <p className="text-xs mt-2" style={{ color: dashboardTheme.textMuted }}>
                                  Leave fields empty for packages that should always be available/displayed. Display dates control when packages appear on the frontend.
                                </p>
                              </div>

                              <div className="mt-3">
                                <ImageUploadManager
                                  existingImages={currentEditedImages}
                                  selectedFiles={editSelectedFiles}
                                  isUploading={editUploadingImages}
                                  onFilesSelected={handleEditFilesSelected}
                                  onImageRemoved={(index) => {
                                    const urls = [...currentEditedImages];
                                    urls.splice(index, 1);
                                    setEditedForm((prev) => ({ ...prev, images: urls.join(", ") }));
                                  }}
                                  onUpload={handleEditUploadImages}
                                  showUploadButton={true}
                                  maxColumns="3"
                                />
                              </div>

                              <div className="mt-3 flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => void saveEdit(item.id)}
                                  className="rounded px-3 py-2 text-white text-xs"
                                  style={{ backgroundColor: dashboardTheme.secondary }}
                                >
                                  Save Changes
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelEdit}
                                  className="rounded px-3 py-2 text-xs border"
                                  style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}

        {!loading && packages.length === 0 ? (
          <p className="mt-4 text-sm" style={{ color: dashboardTheme.textMuted }}>
            No packages found yet. Click Refresh after creating your first package.
          </p>
        ) : null}

        {!loading && packages.length > 0 && filteredPackages.length === 0 ? (
          <p className="mt-4 text-sm" style={{ color: dashboardTheme.textMuted }}>
            No packages match the selected filters.
          </p>
        ) : null}
      </div>

      {deleteCandidate ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-2xl border" style={{ borderColor: dashboardTheme.border }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: dashboardTheme.border }}>
              <h4 className="font-semibold" style={{ color: dashboardTheme.textDark }}>Confirm Delete</h4>
              <p className="text-sm mt-1" style={{ color: dashboardTheme.textMuted }}>
                Delete package &quot;{deleteCandidate.title}&quot;? This action cannot be undone.
              </p>
            </div>
            <div className="px-5 py-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="rounded px-3 py-2 text-sm border"
                style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void deletePackage(deleteCandidate.id)}
                className="rounded px-3 py-2 text-sm text-white bg-red-600 disabled:opacity-70"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
