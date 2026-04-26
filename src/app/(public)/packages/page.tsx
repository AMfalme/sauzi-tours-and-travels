"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BookingModal from "@/app/components/BookingModal";
import FeaturedPackages from "@/app/sections/featured-projects";

export default function PackagesPage() {
  const packages = [
    { name: "Family Safari", description: "Explore wildlife with your loved ones.", price: "$400" },
    { name: "Beach Escape", description: "Relax on Kenya’s beautiful coastlines.", price: "$350" },
    { name: "Adventure Trek", description: "Experience the thrill of mountain hikes.", price: "$500" },
  ];

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  const openBooking = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsBookingOpen(true);
  };

  return (
    <section className="py-16" style={{ background: "linear-gradient(180deg, var(--brand-primary-soft) 0%, #fffdf8 100%)" }}>
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-gray-800"
        >
          Our Packages
        </motion.h1>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 bg-white shadow rounded-2xl text-left"
            >
              <h2 className="text-2xl font-semibold mb-2">{pkg.name}</h2>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              <span className="block text-brand-primary font-bold mb-4">{pkg.price}</span>
              <button
                type="button"
                onClick={() => openBooking(pkg.name)}
                className="w-full rounded-xl bg-brand-secondary py-3 text-white font-semibold transition"
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
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
