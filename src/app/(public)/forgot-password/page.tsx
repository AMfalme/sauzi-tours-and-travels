"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/app/components/ui/input";

type Notification = {
  type: "success" | "error";
  message: string;
};

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!notification && !error) return;

    const timer = setTimeout(() => {
      setNotification(null);
      setError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim()) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        setNotification({ type: "success", message: result.message });
        setEmail("");
      } else {
        setError(result.message);
        setNotification({ type: "error", message: result.message });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      const message = "Unable to send password reset email. Please try again.";
      setError(message);
      setNotification({ type: "error", message });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Reset Password
        </h1>
        <p className="text-gray-600 mb-6">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notification */}
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`w-full rounded-lg px-4 py-3 text-sm shadow-lg ${
                notification.type === "success"
                  ? "bg-emerald-100 border border-emerald-300 text-emerald-800"
                  : "bg-rose-100 border border-rose-300 text-rose-800"
              }`}
            >
              {notification.message}
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
              loading
                ? "bg-blue-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Back to login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

ForgotPasswordPage.displayName = "ForgotPasswordPage";

export default ForgotPasswordPage;