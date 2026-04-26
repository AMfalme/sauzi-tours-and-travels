"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  subscribeToAuthChanges,
  logoutUser,
  getAllUsers,
  User,
  UserRecord,
} from "@/app/lib/auth";
import type { BookingRecord } from "@/app/lib/bookings";
import DashboardSidebar, {
  DashboardNavItem,
  DashboardNavKey,
} from "@/app/components/dashboard/DashboardSidebar";
import StatsRow from "@/app/components/dashboard/StatsRow";
import OverviewPanel from "@/app/components/dashboard/OverviewPanel";
import {
  CreatePackagePanel,
  RequestsPanel,
  UsersPanel,
  ViewPackagesPanel,
} from "@/app/components/dashboard/AdminPanels";
import { dashboardTheme } from "@/app/components/dashboard/theme";

const baseNav: DashboardNavItem[] = [{ key: "overview", label: "Dashboard", icon: "□" }];
const adminNav: DashboardNavItem[] = [
  { key: "requests", label: "Booking Requests", icon: "◇" },
  { key: "users", label: "Users", icon: "◈" },
  { key: "packages", label: "Create Package", icon: "◆" },
  { key: "view-packages", label: "View Packages", icon: "◉" },
];

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState("Checking authentication...");
  const [loggingOut, setLoggingOut] = useState(false);

  const [activePanel, setActivePanel] = useState<DashboardNavKey>("overview");
  const [requestFilter, setRequestFilter] = useState<"all" | "pending" | "confirmed">("all");

  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState("");

  const [users, setUsers] = useState<UserRecord[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setStatus(`Welcome back, ${currentUser.name}!`);
      } else {
        setUser(null);
        setStatus("Redirecting to login...");
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const loadAdminData = async () => {
      setBookingsLoading(true);
      setUsersLoading(true);
      setBookingsError("");
      setUsersError("");

      try {
        const bookingsResponse = await fetch("/api/requests");
        const bookingsData = (await bookingsResponse.json()) as {
          bookings?: BookingRecord[];
          message?: string;
        };

        if (!bookingsResponse.ok) {
          throw new Error(bookingsData.message || "Failed to fetch booking requests");
        }

        setBookings(bookingsData.bookings ?? []);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch booking requests";
        setBookingsError(message);
      } finally {
        setBookingsLoading(false);
      }

      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch users";
        setUsersError(message);
      } finally {
        setUsersLoading(false);
      }
    };

    void loadAdminData();
  }, [user]);

  const stats = useMemo(() => {
    const pending = bookings.filter((item) => item.status === "pending").length;
    const confirmed = bookings.filter((item) => item.status === "confirmed").length;

    return [
      {
        label: "Total Bookings",
        value: String(bookings.length),
        color: dashboardTheme.primary,
        onClick: () => {
          setRequestFilter("all");
          setActivePanel("requests");
        },
      },
      {
        label: "Pending Requests",
        value: String(pending),
        color: "#d97706",
        onClick: () => {
          setRequestFilter("pending");
          setActivePanel("requests");
        },
      },
      {
        label: "Confirmed Trips",
        value: String(confirmed),
        color: dashboardTheme.secondary,
        onClick: () => {
          setRequestFilter("confirmed");
          setActivePanel("requests");
        },
      },
      {
        label: "Registered Users",
        value: String(users.length),
        color: "#8b5cf6",
        onClick: () => setActivePanel("users"),
      },
    ];
  }, [bookings, users]);

  const navigation = user?.role === "admin" ? [...baseNav, ...adminNav] : baseNav;

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    const parsed = new Date(dateString);
    if (Number.isNaN(parsed.getTime())) return dateString;
    return parsed.toLocaleDateString();
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutUser();
      router.replace("/login");
    } catch (error) {
      console.error(error);
      setStatus("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: dashboardTheme.pageBg }}>
        <p style={{ color: dashboardTheme.textMuted }}>{status}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: dashboardTheme.pageBg, color: dashboardTheme.textDark }}>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <DashboardSidebar
          items={navigation}
          activeKey={activePanel}
          onSelect={setActivePanel}
          email={user.email}
          loggingOut={loggingOut}
          onLogout={handleLogout}
        />

        <main className="flex-1">
          <section className="p-4 md:p-8 space-y-6">
            <article className="rounded-xl border bg-white px-5 py-4 shadow-sm" style={{ borderColor: dashboardTheme.border }}>
              <h2 className="text-xl font-semibold" style={{ color: dashboardTheme.textDark }}>Dashboard</h2>
              <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>{status}</p>
            </article>

            <StatsRow stats={stats} />

            {activePanel === "overview" ? (
              <OverviewPanel user={user} bookings={bookings} />
            ) : null}

            {activePanel === "requests" && user.role === "admin" ? (
              <RequestsPanel
                loading={bookingsLoading}
                error={bookingsError}
                bookings={bookings}
                formatDate={formatDate}
                filter={requestFilter}
              />
            ) : null}

            {activePanel === "users" && user.role === "admin" ? (
              <UsersPanel
                loading={usersLoading}
                error={usersError}
                users={users}
                formatDate={formatDate}
                currentUserId={user.id}
                onRoleUpdated={(userId, role) => {
                  setUsers((prev) =>
                    prev.map((item) => (item.id === userId ? { ...item, role } : item))
                  );
                }}
              />
            ) : null}

            {activePanel === "packages" && user.role === "admin" ? <CreatePackagePanel /> : null}

            {activePanel === "view-packages" && user.role === "admin" ? <ViewPackagesPanel /> : null}
          </section>
        </main>
      </div>
    </div>
  );
}
