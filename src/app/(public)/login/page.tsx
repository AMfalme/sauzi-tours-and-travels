"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/app/components/ui/input";
import { loginWithEmail } from "@/app/lib/auth";

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      // Redirect to user dashboard
      router.push("/dashboard");
    } else {
      setError(result.message);
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

        {/* Forgot Password & Sign Up Links */}
        <div className="mt-6 space-y-3 text-sm text-center">
          <p>
            <Link
              href="#"
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

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700"
        >
          <p className="font-semibold text-blue-800 mb-2">Demo Credentials:</p>
          <p>Email: demo@sauzi.com</p>
          <p>Password: demo123456</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

LoginPage.displayName = "LoginPage";

export default LoginPage;
