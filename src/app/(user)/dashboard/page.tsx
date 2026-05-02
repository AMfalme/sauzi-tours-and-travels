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
  TourRequestsPanel,
  UsersPanel,
  ViewPackagesPanel,
} from "@/app/components/dashboard/AdminPanels";
import { dashboardTheme } from "@/app/components/dashboard/theme";

const baseNav: DashboardNavItem[] = [{ key: "overview", label: "Dashboard", icon: "□" }];
const adminNav: DashboardNavItem[] = [
  { key: "tour-requests", label: "Tour Requests", icon: "◇" },
  { key: "bookings", label: "Bookings", icon: "◆" },
  { key: "users", label: "Users", icon: "◈" },
  { key: "packages", label: "Create Package", icon: "●" },
  { key: "view-packages", label: "View Packages", icon: "◉" },
];

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState("Checking authentication...");
  const [loggingOut, setLoggingOut] = useState(false);

  const [activePanel, setActivePanel] = useState<DashboardNavKey>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [requestFilter, setRequestFilter] = useState<"all" | "pending" | "confirmed">("all");

  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState("");

  const [tourRequests, setTourRequests] = useState<any[]>([]);
  const [tourRequestsLoading, setTourRequestsLoading] = useState(false);
  const [tourRequestsError, setTourRequestsError] = useState("");

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
      setTourRequestsLoading(true);
      setUsersLoading(true);
      setBookingsError("");
      setTourRequestsError("");
      setUsersError("");

      try {
        const bookingsResponse = await fetch("/api/requests");
        const bookingsData = (await bookingsResponse.json()) as {
          bookings?: BookingRecord[];
          message?: string;
        };

        if (!bookingsResponse.ok) {
          throw new Error(bookingsData.message || "Failed to fetch bookings");
        }

        setBookings(bookingsData.bookings ?? []);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch bookings";
        setBookingsError(message);
      } finally {
        setBookingsLoading(false);
      }

      try {
        const tourRequestsResponse = await fetch("/api/tour-requests");
        const tourRequestsData = (await tourRequestsResponse.json()) as {
          requests?: any[];
          message?: string;
        };

        if (!tourRequestsResponse.ok) {
          throw new Error(tourRequestsData.message || "Failed to fetch tour requests");
        }

        setTourRequests(tourRequestsData.requests ?? []);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch tour requests";
        setTourRequestsError(message);
      } finally {
        setTourRequestsLoading(false);
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
    const pendingBookings = bookings.filter((item) => item.status === "pending").length;
    const confirmedBookings = bookings.filter((item) => item.status === "confirmed").length;
    const newRequests = tourRequests.filter((item) => item.status === "new").length;

    return [
      {
        label: "Tour Requests",
        value: String(tourRequests.length),
        color: "#06b6d4",
        onClick: () => setActivePanel("tour-requests"),
      },
      {
        label: "Total Bookings",
        value: String(bookings.length),
        color: dashboardTheme.primary,
        onClick: () => setActivePanel("bookings"),
      },
      {
        label: "Pending Bookings",
        value: String(pendingBookings),
        color: "#d97706",
        onClick: () => setActivePanel("bookings"),
      },
      {
        label: "Confirmed Trips",
        value: String(confirmedBookings),
        color: dashboardTheme.secondary,
        onClick: () => setActivePanel("bookings"),
      },
      {
        label: "Registered Users",
        value: String(users.length),
        color: "#8b5cf6",
        onClick: () => setActivePanel("users"),
      },
    ];
  }, [bookings, tourRequests, users]);

  const navigation = user?.role === "admin" ? [...baseNav, ...adminNav] : baseNav;

 const formatDate = (value: any) => {
  if (!value) return "-";

  // Firestore Timestamp object
  if (typeof value === "object" && "seconds" in value) {
    return new Date(value.seconds * 1000).toLocaleDateString();
  }

  // Firestore Timestamp class instance
  if (typeof value?.toDate === "function") {
    return value.toDate().toLocaleDateString();
  }

  // Normal string/date
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) return "-";

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

  const handlePanelSelect = (panel: DashboardNavKey) => {
    setActivePanel(panel);
    setSidebarOpen(false);
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
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />

        <div className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-out lg:fixed lg:top-0 lg:left-0 lg:h-[100dvh] lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <DashboardSidebar
            items={navigation}
            activeKey={activePanel}
            onSelect={handlePanelSelect}
            email={user.email}
            loggingOut={loggingOut}
            onLogout={handleLogout}
            onCloseMobile={() => setSidebarOpen(false)}
          />
        </div>

        <main className="flex-1 lg:pl-72">
          <section className="p-4 md:p-8 space-y-6">
            <article className="lg:hidden rounded-xl border bg-white px-4 py-3 shadow-sm flex items-center justify-between" style={{ borderColor: dashboardTheme.border }}>
              <div>
                <p className="text-xs uppercase tracking-wide" style={{ color: dashboardTheme.textMuted }}>Control Panel</p>
                <p className="text-sm font-medium" style={{ color: dashboardTheme.textDark }}>{user.email}</p>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: dashboardTheme.primary }}
                aria-label="Open sidebar menu"
              >
                Menu
              </button>
            </article>

            <article className="rounded-xl border bg-white px-5 py-4 shadow-sm" style={{ borderColor: dashboardTheme.border }}>
              <h2 className="text-xl font-semibold" style={{ color: dashboardTheme.textDark }}>Dashboard</h2>
              <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>{status}</p>
            </article>

            <StatsRow stats={stats} />

            {activePanel === "overview" ? (
              <OverviewPanel
                user={user}
                bookings={bookings}
                onProfileUpdated={(updatedUser) => {
                  setUser(updatedUser);
                  setStatus(`Welcome back, ${updatedUser.name}!`);
                }}
              />
            ) : null}

            {activePanel === "tour-requests" && user.role === "admin" ? (
              <TourRequestsPanel
                loading={tourRequestsLoading}
                error={tourRequestsError}
                requests={tourRequests}
                formatDate={formatDate}
              />
            ) : null}

            {activePanel === "bookings" && user.role === "admin" ? (
              <RequestsPanel
                loading={bookingsLoading}
                error={bookingsError}
                bookings={bookings}
                formatDate={formatDate}
                filter="all"
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
