"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const packages = [
  {
    name: "Mara Adventure",
    price: "$850",
    rating: 5,
    duration: "3 Days | 2 Nights",
    tag: "Top Seller",
    highlights: ["Great Migration", "Game Drives", "Luxury Camp"],
    img: "/images/maasai-mara.jpg",
  },
  {
    name: "Uganda Explorer",
    price: "$1200",
    rating: 4,
    duration: "5 Days | 4 Nights",
    tag: "New",
    highlights: ["City Tour", "Dhow Cruise", "Burj Khalifa"],
    img: "/images/uganda.jpg",
  },
  {
    name: "Diani Coastline",
    price: "$650",
    rating: 5,
    duration: "4 Days | 3 Nights",
    highlights: ["Snorkeling", "White Sands", "Beach Resort"],
    img: "/images/diani.jpg",
  },
];

export default function FeaturedPackages() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 px-6 md:px-16 py-20">
      <motion.h4
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-1xl md:text-2xl font-extrabold text-gray-900 text-left mb-14"
      >
        Featured Packages ✨
      </motion.h4>

      {/* Grid Animation */}
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
          <Link href={`/packages/${pkg.name.toLowerCase().replace(/ /g, "-")}`} key={i}>
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
  <Image
    src={pkg.img}
    alt={pkg.name}
    fill
    className="object-cover group-hover:brightness-90 transition"
    priority={false}
  />


                {/* Price Tag */}
                <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-lg">
                  {pkg.price}
                </div>

                {/* Badge */}
                {pkg.tag && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-[11px] px-2 py-1 rounded-md font-semibold">
                    {pkg.tag}
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
                <h3 className="text-lg font-bold text-gray-800">{pkg.name}</h3>

                {/* ratings */}
                <div className="flex items-center text-yellow-500 text-sm mt-1">
                  {"★".repeat(pkg.rating)}
                  {"☆".repeat(5 - pkg.rating)}
                </div>

                {/* duration */}
                <p className="text-gray-500 text-sm mt-1">{pkg.duration}</p>

                {/* highlights */}
                <ul className="text-gray-600 text-xs mt-3 space-y-1">
                  {pkg.highlights.map((h, index) => (
                    <li key={index}>• {h}</li>
                  ))}
                </ul>

                {/* Button Row */}
                <div className="flex justify-end mt-4">
                  <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
