"use client";

import { useEffect, useState } from "react";
import type { User } from "@/app/lib/auth";
import { updateCurrentUserProfileDetails } from "@/app/lib/auth";
import type { BookingRecord } from "@/app/lib/bookings";
import { dashboardTheme } from "@/app/components/dashboard/theme";

type OverviewPanelProps = {
  user: User;
  bookings: BookingRecord[];
  onProfileUpdated: (user: User) => void;
};

export default function OverviewPanel({ user, bookings, onProfileUpdated }: OverviewPanelProps) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || "");
  const [location, setLocation] = useState(user.location || "");
  const [bio, setBio] = useState(user.bio || "");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setName(user.name);
    setPhone(user.phone || "");
    setLocation(user.location || "");
    setBio(user.bio || "");
    setIsEditingProfile(false);
  }, [user]);

  useEffect(() => {
    if (!successMessage) return;
    const timeoutId = window.setTimeout(() => setSuccessMessage(""), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

  const handleProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isEditingProfile) return;

    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    const result = await updateCurrentUserProfileDetails({
      name,
      phone,
      location,
      bio,
    });
    if (!result.success) {
      setErrorMessage(result.message);
      setSaving(false);
      return;
    }

    if (result.user) {
      onProfileUpdated(result.user);
      setName(result.user.name);
      setPhone(result.user.phone || "");
      setLocation(result.user.location || "");
      setBio(result.user.bio || "");
      setIsEditingProfile(false);
    }

    setSaving(false);
    setSuccessMessage(result.message);
  };

  const startEditProfile = () => {
    setName(user.name);
    setPhone(user.phone || "");
    setLocation(user.location || "");
    setBio(user.bio || "");
    setErrorMessage("");
    setSuccessMessage("");
    setIsEditingProfile(true);
  };

  const cancelEditProfile = () => {
    setName(user.name);
    setPhone(user.phone || "");
    setLocation(user.location || "");
    setBio(user.bio || "");
    setErrorMessage("");
    setIsEditingProfile(false);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <article className="xl:col-span-2 rounded-xl border bg-white shadow-sm" style={{ borderColor: dashboardTheme.border }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: dashboardTheme.border }}>
          <h3 className="font-semibold" style={{ color: dashboardTheme.textDark }}>Booking Activity</h3>
          <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>Recent booking requests and statuses</p>
        </div>
        <div className="p-5 space-y-3">
          {bookings.slice(0, 5).map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between rounded-lg border px-4 py-3"
              style={{ borderColor: "#eef2f7" }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: dashboardTheme.textDark }}>{booking.fullName}</p>
                <p className="text-xs" style={{ color: dashboardTheme.textMuted }}>
                  {booking.packageName} · {booking.travelDate}
                </p>
              </div>
              <span className="text-xs rounded-full px-2 py-1 capitalize" style={{ backgroundColor: dashboardTheme.secondarySoft, color: dashboardTheme.secondary }}>
                {booking.status}
              </span>
            </div>
          ))}

          {bookings.length === 0 ? (
            <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>No booking activity yet.</p>
          ) : null}
        </div>
      </article>

      <article className="rounded-xl border bg-white shadow-sm" style={{ borderColor: dashboardTheme.border }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: dashboardTheme.border }}>
          <h3 className="font-semibold" style={{ color: dashboardTheme.textDark }}>My Profile</h3>
        </div>
        <form onSubmit={handleProfileSubmit} className="p-5 text-sm space-y-3" style={{ color: dashboardTheme.textDark }}>
          <div className="space-y-1">
            <p style={{ color: dashboardTheme.textMuted }}>Name</p>
            {isEditingProfile ? (
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
              />
            ) : (
              <p className="font-medium" style={{ color: dashboardTheme.textDark }}>{user.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <p style={{ color: dashboardTheme.textMuted }}>Phone Number</p>
            {isEditingProfile ? (
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
                placeholder="e.g. +254 700 000 000"
              />
            ) : (
              <p className="font-medium" style={{ color: dashboardTheme.textDark }}>{user.phone || "-"}</p>
            )}
          </div>

          <div className="space-y-1">
            <p style={{ color: dashboardTheme.textMuted }}>Location</p>
            {isEditingProfile ? (
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
                placeholder="City / Country"
              />
            ) : (
              <p className="font-medium" style={{ color: dashboardTheme.textDark }}>{user.location || "-"}</p>
            )}
          </div>

          <div className="space-y-1">
            <p style={{ color: dashboardTheme.textMuted }}>Bio</p>
            {isEditingProfile ? (
              <textarea
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm min-h-20"
                style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
                placeholder="Tell us a bit about your travel preferences"
              />
            ) : (
              <p className="font-medium" style={{ color: dashboardTheme.textDark }}>{user.bio || "-"}</p>
            )}
          </div>

          <p>
            <span style={{ color: dashboardTheme.textMuted }}>Email:</span> {user.email}
          </p>
          <p>
            <span style={{ color: dashboardTheme.textMuted }}>Role:</span> {user.role}
          </p>

          {errorMessage ? <p className="text-red-600">{errorMessage}</p> : null}
          {successMessage ? <p className="text-emerald-700">{successMessage}</p> : null}

          {isEditingProfile ? (
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg px-3 py-2 text-xs font-medium text-white disabled:opacity-70"
                style={{ backgroundColor: dashboardTheme.primary }}
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={cancelEditProfile}
                className="rounded-lg border px-3 py-2 text-xs font-medium disabled:opacity-70"
                style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={startEditProfile}
              className="rounded-lg px-3 py-2 text-xs font-medium text-white"
              style={{ backgroundColor: dashboardTheme.secondary }}
            >
              Edit Profile
            </button>
          )}
        </form>
      </article>
    </div>
  );
}
