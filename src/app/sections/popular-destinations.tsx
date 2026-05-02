"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaHeart } from "react-icons/fa";
import BookingModal from "@/app/components/BookingModal";
import type { PackageRecord } from "@/app/lib/packages";
import { isPackageDisplayable } from "@/app/lib/packages";

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState<PackageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/api/packages");
        const data = (await response.json()) as { packages?: PackageRecord[] };
        if (data.packages) {
          const filtered = data.packages.filter(
            (pkg) => (pkg.category === "destination" || pkg.category === "safari") && pkg.status === "active" && isPackageDisplayable(pkg)
          );
          setDestinations(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchDestinations();
  }, []);

  const getDisplayPrice = (pkg: PackageRecord) => `${pkg.currency} ${pkg.price}`;
  const getDisplayRating = (pkg: PackageRecord) => pkg.starRating || 4.5;

  const openBooking = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsBookingOpen(true);
  };

  return (
    <section className="bg-white px-6 md:px-16 py-20">
      {/* Section Title Animation */}
      <motion.h4
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl md:text-2xl font-bold text-gray-800 text-left mb-12"
      >
        Popular Destinations
      </motion.h4>

      {/* Grid Animation */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading destinations...</p>
        </div>
      ) : destinations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No destinations available at the moment.</p>
        </div>
      ) : (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {destinations.slice(0, 6).map((pkg, i) => (
          <Link key={i} href={`/packages/${pkg.id}`}>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              whileHover={{ scale: 1.04 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer group relative"
            >
              {/* Floating heart wishlist button */}
              <motion.button
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full shadow"
              >
                <FaHeart className="text-gray-500 group-hover:text-pink-500 transition-colors" />
              </motion.button>

              {/* Image */}
              <motion.div
                className="overflow-hidden"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.4 }}
              >
                {pkg.images && pkg.images.length > 0 ? (
                  <Image
                    src={pkg.images[0]}
                    alt={pkg.title}
                    width={400}
                    height={256}
                    className="object-cover w-full h-64 group-hover:brightness-95"
                    priority={i === 0}
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
              </motion.div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {pkg.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">{pkg.description}</p>

                <div className="flex items-center justify-between mt-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500 text-sm" />
                    <span className="text-sm font-medium text-gray-700">
                      {getDisplayRating(pkg).toFixed(1)}
                    </span>
                  </div>

                  {/* Price */}
                  <span className="text-sm font-semibold text-green-600">
                    {getDisplayPrice(pkg)}
                  </span>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    openBooking(pkg.title);
                  }}
                  className="mt-5 w-full bg-brand-secondary text-white py-2 rounded-lg text-sm font-semibold"
                >
                  Book Now
                </motion.button>
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
