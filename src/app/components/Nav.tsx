"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser, subscribeToAuthChanges } from "@/app/lib/auth";

export default function Navbar() {
  const [user, setUser] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(!!currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setNotification("Logged out successfully.");
      setUser(false);
      setMobileMenuOpen(false);
      setTimeout(() => {
        setNotification(null);
        router.push("/login");
      }, 800);
    } catch {
      setNotification("Unable to logout. Please try again.");
      setTimeout(() => setNotification(null), 2000);
    }
  };

  return (
    <>
      {notification && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-blue-600 text-white px-4 py-2 shadow-lg">
          {notification}
        </div>
      )}
      <nav className="relative px-4 py-4 flex justify-between items-center bg-primary">      
        <Link href="/" className="navbar-brand p-0">
          <Image
            className="img-fluid"
            src="/images/sauzi-logo-img.png"
            alt="Sauzi Tours & Travel"
            width={200}
            height={100}
            priority
          />
        </Link>
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-blue-600 p-3"
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <Link className="text-sm decoration-none text-gray-400 hover:text-gray-500 uppercase no-underline" href="/">
              HOME
            </Link>
          </li>
          <li >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li className="text-gray-300">
            <Link className="text-sm decoration-none text-blue-600 font-bold uppercase no-underline" href="/about">
              ABOUT US
            </Link>
          </li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li>
            <Link className="text-sm decoration-none text-gray-400 hover:text-gray-500 uppercase no-underline" href="/tours">
              TOURS
            </Link>
          </li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li>
            <Link className="text-sm decoration-none text-gray-400 hover:text-gray-500 uppercase no-underline" href="/destinations">
              DESTINATIONS
            </Link>
          </li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li>
            <Link className="text-sm decoration-none text-gray-400 hover:text-gray-500 uppercase no-underline" href="/contact">
              CONTACT
            </Link>
          </li>
        </ul>
        {user ? (
          <div className="hidden lg:flex gap-3 items-center">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm text-blue-600 font-semibold border border-blue-600 rounded-full hover:bg-blue-50 transition"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-white font-semibold bg-rose-600 rounded-full hover:bg-rose-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex gap-3 items-center">
            <Link
              href="/login"
              className="px-4 py-2 text-sm text-blue-600 font-semibold border border-blue-600 rounded-full hover:bg-blue-50 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm text-white font-semibold bg-blue-600 rounded-full hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
      <div
        className={`navbar-menu fixed inset-0 z-50 ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className={`navbar-backdrop absolute inset-0 bg-gray-800 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-25" : "opacity-0"}`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
        <nav
          className={`absolute top-0 left-0 right-0 flex flex-col min-h-[60vh] max-h-full py-6 px-6 bg-white border-b overflow-y-auto transition-transform duration-500 ease-out ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="flex items-center justify-between mb-6">
            <Link className="text-2xl font-bold leading-none" href="/">
              <Image
                className="img-fluid"
                src="/images/sauzi-logo-img.png"
                alt="Sauzi Tours & Travel"
                width={150}
                height={75}
              />
            </Link>
            <button
              className="navbar-close"
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="h-6 w-6 text-gray-500 hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="mb-8">
            <ul className="space-y-2">
              <li>
                <Link className="block p-4 text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded uppercase no-underline" href="/" onClick={() => setMobileMenuOpen(false)}>
                  HOME
                </Link>
              </li>
              <li>
                <Link className="block p-4 text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded uppercase no-underline" href="/about" onClick={() => setMobileMenuOpen(false)}>
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link className="block p-4 text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded uppercase no-underline" href="/tours" onClick={() => setMobileMenuOpen(false)}>
                  TOURS
                </Link>
              </li>
              <li>
                <Link className="block p-4 text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded uppercase no-underline" href="/destinations" onClick={() => setMobileMenuOpen(false)}>
                  DESTINATIONS
                </Link>
              </li>
              <li>
                <Link className="block p-4 text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded uppercase no-underline" href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-auto pt-4 border-t border-gray-200">
            <div className="space-y-3">
              {user ? (
                <>
                  <Link className="block px-4 py-3 text-center text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full uppercase no-underline" href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    DASHBOARD
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-full uppercase"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <Link className="block px-4 py-3 text-center text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full uppercase no-underline" href="/login" onClick={() => setMobileMenuOpen(false)}>
                    SIGN IN
                  </Link>
                  <Link className="block px-4 py-3 text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full uppercase no-underline" href="/register" onClick={() => setMobileMenuOpen(false)}>
                    SIGN UP
                  </Link>
                </>
              )}
            </div>
            <p className="mt-6 text-xs text-center text-gray-400">
              <span>Copyright © 2023</span>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}