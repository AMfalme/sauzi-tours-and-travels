"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { subscribeToAuthChanges, logoutUser, User } from "@/app/lib/auth";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState("Checking authentication...");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setStatus("Welcome back, " + currentUser.name + "!");
      } else {
        setUser(null);
        setStatus("Redirecting to login...");
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      router.push("/login");
    } catch (error) {
      console.error(error);
      setStatus("Logout failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-500">{status}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-6">{status}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 p-4">
            <h2 className="text-lg font-semibold">Profile</h2>
            <p className="text-sm text-gray-600">Name: {user.name}</p>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="mt-3 w-full rounded-lg bg-red-600 text-white py-2 font-semibold hover:bg-red-700 transition"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}