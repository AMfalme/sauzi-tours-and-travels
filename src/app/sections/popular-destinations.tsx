"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaHeart } from "react-icons/fa";

const destinations = [
  {
    name: "Maasai Mara",
    desc: "Home to the Big Five & The Great Migration.",
    img: "/images/maasai-mara.jpg",
    price: "From $450",
    rating: 4.9,
    slug: "maasai-mara",
  },
  {
    name: "Diani Beach",
    desc: "Pristine white sands and vibrant marine life.",
    img: "/images/diani.jpg",
    price: "From $380",
    rating: 4.8,
    slug: "diani-beach",
  },
  {
    name: "Amboseli",
    desc: "Iconic views of Mt. Kilimanjaro & ELEPHANTS!",
    img: "/images/amboseli.jpg",
    price: "From $420",
    rating: 4.7,
    slug: "amboseli",
  },
  {
    name: "Watamu",
    desc: "Coral reefs & amazing water sports.",
    img: "/images/watamu.jpg",
    price: "From $360",
    rating: 4.9,
    slug: "watamu",
  },
  {
    name: "Tsavo National Park",
    desc: "Kenya’s largest protected area – red elephants!",
    img: "/images/tsavo.jpg",
    price: "From $420",
    rating: 4.6,
    slug: "tsavo",
  },
];

export default function PopularDestinations() {
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
        {destinations.map((place, i) => (
          <Link key={i} href={`/destinations/${place.slug}`}>
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
                <Image
                  src={place.img}
                  alt={place.name}
                  width={600}
                  height={400}
                  className="object-cover w-full h-64 group-hover:brightness-95"
                  priority={i === 0}
                />
              </motion.div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {place.name}
                </h3>

                <p className="text-sm text-gray-600">{place.desc}</p>

                <div className="flex items-center justify-between mt-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500 text-sm" />
                    <span className="text-sm font-medium text-gray-700">
                      {place.rating}
                    </span>
                  </div>

                  {/* Price */}
                  <span className="text-sm font-semibold text-green-600">
                    {place.price}
                  </span>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 w-full bg-primary-green hover:bg-primary-green/90 text-white py-2 rounded-lg text-sm font-semibold"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
