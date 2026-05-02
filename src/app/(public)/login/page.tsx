"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/app/components/ui/input";
import { loginWithEmail, loginWithGoogle } from "@/app/lib/auth";

type Notification = {
  type: "success" | "error";
  message: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!notification && !error) return;

    const timer = setTimeout(() => {
      setNotification(null);
      setError("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [notification, error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.email.trim()) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (!form.password) {
      setError("Password is required");
      setLoading(false);
      return;
    }

    const result = await loginWithEmail(form.email, form.password);

    if (result.success) {
      setNotification({ type: "success", message: "Login successful! Redirecting..." });
      setTimeout(async () => {
        router.push("/dashboard");
      }, 700);
    } else {
      setError(result.message);
      setNotification({ type: "error", message: result.message });
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    const result = await loginWithGoogle();

    if (result.success) {
      setNotification({ type: "success", message: "Login successful! Redirecting..." });
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } else {
      setError(result.message);
      setNotification({ type: "error", message: result.message });
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
          Welcome Back
        </h1>
        <p className="text-gray-600 mb-6">
          Sign in to your Sauzi Tours account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className="rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Password
            </label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notification */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-md rounded-lg px-4 py-3 text-sm shadow-lg ${
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
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="mt-6 mb-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
        </div>

        {/* Google Login Button */}
        <motion.button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          whileHover={!loading ? { scale: 1.02 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-3 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {loading ? "Signing in..." : "Continue with Google"}
        </motion.button>

        {/* Forgot Password & Sign Up Links */}
        <div className="mt-6 space-y-3 text-sm text-center">
          <p>
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </p>
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

LoginPage.displayName = "LoginPage";

export default LoginPage;
