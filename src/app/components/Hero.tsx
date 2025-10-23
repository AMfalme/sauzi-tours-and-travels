"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSection() {
  const [form, setForm] = useState({
    destination: "",
    date: "",
    guests: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", form);
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-white px-6 md:px-16 py-12 overflow-hidden">
      {/* LEFT — Booking Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 max-w-md space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight"
        >
          Discover <span className="text-blue-600">Kenya</span> & Beyond
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-600"
        >
          Explore breathtaking safaris, coastal getaways, and cultural adventures with Sauzi Tours.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-md p-6 space-y-4"
        >
          {/* Destination */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Destination
            </label>
            <Input
              name="destination"
              placeholder="e.g. Maasai Mara"
              value={form.destination}
              onChange={handleChange}
              className="rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date + Guests */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Date
              </label>
              <Input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Guests
              </label>
              <Input
                type="number"
                name="guests"
                min={1}
                placeholder="2"
                value={form.guests}
                onChange={handleChange}
                className="rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold rounded-xl py-3 hover:bg-blue-700 transition-all"
          >
            Search Tours
          </motion.button>
        </motion.form>
      </motion.div>

      {/* RIGHT — Image Carousel with Alternating Float */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 mt-10 md:mt-0"
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          loop
          className="rounded-2xl shadow-lg"
        >
          {["/images/simba.png", "/images/watermark.png"].map((src, index) => {
            // Alternate direction per image
            const floatUp = index % 2 === 0;
            return (
              <SwiperSlide key={index}>
                <motion.div
                  animate={{
                    y: floatUp ? [0, -25, 0] : [0, 25, 0],
                    rotate: floatUp ? [0, -2, 0] : [0, 2, 0],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Sauzi Tours Slide ${index + 1}`}
                    className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl"
                    width={1920}
                    height={1080}
                    priority
                  />
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </motion.div>
    </section>
  );
}
