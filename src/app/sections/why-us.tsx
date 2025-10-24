"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🦁",
    title: "Expert Safari Guides",
    desc: "Friendly, certified experts who know every secret of the wild.",
  },
  {
    icon: "🏨",
    title: "Premium Stays",
    desc: "Hand-picked lodges and resorts with world-class service.",
  },
  {
    icon: "🛡️",
    title: "Safe & Reliable",
    desc: "Top safety standards + secure transport for stress-free travel.",
  },
  {
    icon: "💎",
    title: "Top Rated Experience",
    desc: "Over 1,200 five-star reviews from global explorers.",
  },
  {
    icon: "🛫",
    title: "Tailor-Made Packages",
    desc: "Customize any itinerary to match your dream experience.",
  },
  {
    icon: "💰",
    title: "Best Price Guarantee",
    desc: "Luxury adventure without the premium price tag.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="px-6 md:px-16 py-24 bg-gradient-to-b from-blue-50/60 to-white">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-14"
      >
        Why Choose Sauzi Tours?
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.05,
              y: -6,
              transition: { type: "spring", stiffness: 200 },
            }}
            className="text-center p-8 rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all cursor-default border border-blue-100"
          >
            {/* Icon + glow animation */}
            <motion.div
              whileHover={{ scale: 1.2, rotate: 8 }}
              className="text-4xl md:text-5xl mb-4"
            >
              {f.icon}
            </motion.div>

            <h3 className="font-bold text-lg md:text-xl text-gray-800">{f.title}</h3>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
