"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import BookingModal from "@/app/components/BookingModal";
import FeaturedPackages from "@/app/sections/featured-projects";
import type { PackageRecord } from "@/app/lib/packages";
import { PACKAGE_CATEGORIES } from "@/app/lib/packages";

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/packages");
        const data = (await response.json()) as { packages?: PackageRecord[] };
        if (data.packages) {
          const filtered = data.packages.filter((pkg) => pkg.status === "active");
          setPackages(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchPackages();
  }, []);

  const getFilteredPackages = () => {
    if (selectedCategory === "all") {
      return packages;
    }
    return packages.filter((pkg) => pkg.category === selectedCategory);
  };

  const filteredPackages = getFilteredPackages();

  const openBooking = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsBookingOpen(true);
  };

  return (
    <section className="py-16" style={{ background: "linear-gradient(180deg, var(--brand-primary-soft) 0%, #fffdf8 100%)" }}>
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 text-gray-800 text-center"
        >
          Our Packages
        </motion.h1>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === "all"
                  ? "bg-brand-primary text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              All Packages
            </button>
            {PACKAGE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${
                  selectedCategory === category
                    ? "bg-brand-primary text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading packages...</p>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No packages available in this category.</p>
          </div>
        ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredPackages.map((pkg, i) => (
            <Link key={i} href={`/packages/${pkg.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 bg-white shadow rounded-2xl text-left hover:shadow-lg transition cursor-pointer"
              >
                {/* Package Image */}
                {pkg.images && pkg.images.length > 0 ? (
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={pkg.images[0]}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 mb-4 rounded-lg bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}

                <h2 className="text-2xl font-semibold mb-2">{pkg.title}</h2>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                {pkg.duration && <p className="text-sm text-gray-500 mb-3">Duration: {pkg.duration}</p>}
                <span className="block text-brand-primary font-bold mb-4">{pkg.currency} {pkg.price}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openBooking(pkg.title);
                  }}
                  className="w-full rounded-xl bg-brand-secondary py-3 text-white font-semibold transition hover:opacity-90"
                >
                  Book Now
                </button>
              </motion.div>
            </Link>
          ))}
        </div>
        )}
         <FeaturedPackages/>
      </div>

      <BookingModal
        open={isBookingOpen}
        packageName={selectedPackage}
        onClose={() => setIsBookingOpen(false)}
      />
    </section>
  );
}
