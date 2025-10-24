"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Safari", "Beach", "City", "Adventures"];

const images: Record<string, string[]> = {
  Safari: [
    "/images/amboseli.jpg",
    "/images/amboseli.jpg",
    "/images/amboseli.jpg",
    "/images/maasai-mara.jpg",
    "/images/amboseli.jpg",
  ],
  Beach: [
    "/images/amboseli.jpg",
    "/images/maasai-mara.jpg",
    "/images/amboseli.jpg",
    "/images/amboseli.jpg",
  ],
  City: [
    "/images/amboseli.jpg",
    "/images/maasai-mara.jpg",
    "/images/amboseli.jpg",
  ],
  Adventures: [
    "/images/amboseli.jpg",
    "/images/maasai-mara.jpg",
    "/images/amboseli.jpg",
    "/images/amboseli.jpg",
  ],
};

export default function Gallery() {
  const [active, setActive] = useState("Safari");

  return (
    <section className="px-6 md:px-16 py-20 bg-white">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 text-center mb-10"
      >
        Explore Our Gallery 📸
      </motion.h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full transition font-medium ${
              active === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          exit={{ opacity: 0 }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {images[active].map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`${active} ${i}`}
              loading="lazy"
              className="w-full rounded-xl object-cover hover:opacity-90 transition"
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
