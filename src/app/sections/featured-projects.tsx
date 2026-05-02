"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import BookingModal from "@/app/components/BookingModal";
import type { PackageRecord } from "@/app/lib/packages";
import { isPackageDisplayable } from "@/app/lib/packages";

export default function FeaturedPackages() {
  const [packages, setPackages] = useState<PackageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      try {
        const response = await fetch("/api/packages");
        const data = (await response.json()) as { packages?: PackageRecord[] };
        if (data.packages) {
          const filtered = data.packages.filter(
            (pkg) => pkg.featured === true && pkg.status === "active" && isPackageDisplayable(pkg)
          );
          setPackages(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch featured packages:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchFeaturedPackages();
  }, []);

  const openBooking = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsBookingOpen(true);
  };

  return (
    <section className="px-6 md:px-16 py-20" style={{ background: "linear-gradient(180deg, #fffdf8 0%, var(--brand-primary-soft) 100%)" }}>
      <motion.h4
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-1xl md:text-2xl font-extrabold text-gray-900 text-left mb-14"
      >
        Featured Packages ✨
      </motion.h4>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading featured packages...</p>
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No featured packages available at the moment.</p>
        </div>
      ) : (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {packages.map((pkg, i) => (
          <Link href={`/packages/${pkg.id}`} key={i}>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group"
            >
              
              {/* IMG wrapper */}
               <div className="relative w-full h-64 overflow-hidden">
  {pkg.images && pkg.images.length > 0 ? (
    <Image
      src={pkg.images[0]}
      alt={pkg.title}
      fill
      className="object-cover group-hover:brightness-90 transition"
      priority={false}
    />
  ) : (
    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500">No image</span>
    </div>
  )}


                {/* Price Tag */}
                <div className="absolute bottom-3 left-3 bg-brand-primary text-xs font-semibold px-3 py-1 rounded-lg shadow-lg">
                  {pkg.currency} {pkg.price}
                </div>

                {/* Badge */}
                {pkg.featured && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text[11px] px-2 py-1 rounded-md font-semibold">
                    Featured
                  </div>
                )}

                {/* Heart icon hover animation */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="absolute top-3 right-3 text-white text-xl opacity-80 hover:opacity-100"
                >
                  ♥
                </motion.div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800">{pkg.title}</h3>

                {/* ratings */}
                {pkg.starRating && (
                  <div className="flex items-center text-yellow-500 text-sm mt-1">
                    {"★".repeat(Math.round(pkg.starRating))}
                    {"☆".repeat(5 - Math.round(pkg.starRating))}
                  </div>
                )}

                {/* duration */}
                {pkg.duration && <p className="text-gray-500 text-sm mt-1">{pkg.duration}</p>}

                {/* includes */}
                {pkg.includes && pkg.includes.length > 0 && (
                  <ul className="text-gray-600 text-xs mt-3 space-y-1">
                    {pkg.includes.slice(0, 3).map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                )}

                {/* Button Row */}
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      openBooking(pkg.title);
                    }}
                    className="px-4 py-2 rounded-lg bg-brand-secondary text-white text-sm transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
      )}

      <BookingModal
        open={isBookingOpen}
        packageName={selectedPackage}
        onClose={() => setIsBookingOpen(false)}
      />
    </section>
  );
}
