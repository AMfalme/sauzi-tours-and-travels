"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="bg-blue-600 text-white text-center py-20 px-6">
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="text-4xl font-bold"
      >
        Ready for Your Next Adventure?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-4 text-lg"
      >
        Book today and explore the beauty of Africa with Sauzi Tours 🌍
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mt-6 bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-200 transition"
      >
        Plan My Trip
      </motion.button>
    </section>
  );
}
