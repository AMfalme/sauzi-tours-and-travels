"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Kwame",
    country: "🇬🇭 Ghana",
    review: "The safari was absolutely breathtaking — the Big Five up close! 🐘",
    img: "/images/review1.jpg",
    rating: 5,
  },
  {
    name: "Bella",
    country: "🇰🇪 Kenya",
    review: "Beach package was dreamy! Crystal waters and first-class service 🌊",
    img: "/images/review2.jpg",
    rating: 5,
  },
  {
    name: "Nuru",
    country: "🇹🇿 Tanzania",
    review: "Amazing hospitality and very knowledgeable guides! 🦁",
    img: "/images/review3.jpg",
    rating: 4,
  },
  {
    name: "Amina",
    country: "🇦🇪 UAE",
    review: "Dubai trip was luxury at its finest. Absolutely flawless! ✨",
    img: "/images/review4.jpg",
    rating: 5,
  },
  {
    name: "Zawadi",
    country: "🇺🇬 Uganda",
    review: "Loved every single adventure — booked twice already! 😍",
    img: "/images/review5.jpg",
    rating: 5,
  },
  {
    name: "Liam",
    country: "🇬🇧 UK",
    review: "Customer care was on another level — highly recommend ✅",
    img: "/images/review6.jpg",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white px-6 md:px-16 py-24">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-4"
      >
        What Our Travelers Say 💬
      </motion.h2>
      <p className="text-gray-600 text-center mb-14">
        Real experiences from adventurers like you 🌍
      </p>

      {/* Swiper Slider — Smooth, Slow, Elegant */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1400} // Slow & smooth slide speed
        loop
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="max-w-3xl mx-auto"
      >
        {reviews.map((r, i) => (
          <SwiperSlide key={i}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-3xl shadow-lg border border-blue-100 mx-4"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4">
               <div className="relative w-14 h-14 rounded-full overflow-hidden border">
                <Image
                  src={r.img}
                  alt={r.name}
                  fill
                  className="object-cover"
                />
              </div>

                <div>
                  <h4 className="font-bold text-gray-900 text-base">{r.name}</h4>
                  <p className="text-xs text-gray-500">{r.country}</p>
                </div>
              </div>

              {/* Review */}
              <p className="text-gray-700 text-sm mt-5 leading-relaxed">
                “{r.review}”
              </p>

              {/* Rating */}
              <div className="text-yellow-500 text-sm mt-3">
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </div>

              {/* Heart like */}
              <motion.button
                whileTap={{ scale: 1.3 }}
                className="mt-5 text-2xl"
                aria-label="Like"
              >
                ❤️
              </motion.button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
