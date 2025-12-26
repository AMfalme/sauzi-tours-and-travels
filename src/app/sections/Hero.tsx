"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

import { Input } from "@/app/components/ui/input";
// import AccountPrompt from "@/app/components/AccountPrompt";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./hero-swiper.css";

export default function HeroSection() {
  const initialForm = {
    destination: "",
    date: "",
    guests: "",
    childrenAges: "",
    name: "",
    email: "",
    phone: "",
   
  };

  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (!form.destination.trim()) newErrors.destination = "Destination is required";
      if (!form.date) newErrors.date = "Date is required";
      if (!form.guests || Number(form.guests) < 1) newErrors.guests = "At least 1 guest is required";
    } else if (currentStep === 1) {
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.email.trim() && !form.phone.trim()) {
        newErrors.email = "Provide email or phone to be contacted";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "tour_requests"), {
        ...form,
        createdAt: serverTimestamp(),
        status: "new",
        source: "multi_step_form",
      });
      alert("Request sent! We’ll get back to you shortly.");
      setForm(initialForm);
      setStep(0);
      setErrors({});
    } catch (err) {
      console.error("FIRESTORE ERROR:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-white px-6 md:px-16 py-12 overflow-hidden">
     
      {/* LEFT — Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 max-w-md space-y-6 z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Discover <span className="text-blue-600">Kenya</span> & Beyond
        </h1>

        <p className="text-gray-600">
          Explore breathtaking safaris, coastal getaways, and cultural adventures with Sauzi Tours.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-6 space-y-4"
        >
          {/* Step Indicator */}
          <p className="text-sm text-gray-500 mb-2">Step {step + 1} of 2</p>

          {/* Step 1: Trip Details */}
          {step === 0 && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Destination
                </label>
                <Input
                  name="destination"
                  placeholder="e.g. Maasai Mara"
                  value={form.destination}
                  onChange={handleChange}
                  className={`rounded-xl focus:ring-2 focus:ring-blue-500 ${errors.destination ? "border-red-500" : ""}`}
                />
                {errors.destination && <p className="text-sm text-red-600 mt-1">{errors.destination}</p>}
              </div>

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
                    className={`rounded-xl focus:ring-2 focus:ring-blue-500 ${errors.date ? "border-red-500" : ""}`}
                  />
                  {errors.date && <p className="text-sm text-red-600 mt-1">{errors.date}</p>}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1 text-gray-700">
                    No. of Adults / Children
                  </label>
                  <Input
                    type="number"
                    name="guests"
                    min={1}
                    placeholder="2"
                    value={form.guests}
                    onChange={handleChange}
                    className={`rounded-xl focus:ring-2 focus:ring-blue-500 ${errors.guests ? "border-red-500" : ""}`}
                  />
                  {errors.guests && <p className="text-sm text-red-600 mt-1">{errors.guests}</p>}
                </div>
              </div>

              <motion.button
                type="button"
                onClick={nextStep}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-blue-600 text-white font-semibold rounded-xl py-3 hover:bg-blue-700 transition-all"
              >
                Next
              </motion.button>
            </>
          )}

          {/* Step 2: Contact & Preferences */}
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Full Name
                </label>
                <Input
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className={`rounded-xl focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`rounded-xl focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : ""}`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Phone
                </label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="+2547xxxxxxx"
                  value={form.phone}
                  onChange={handleChange}
                  className="rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              

              <div className="flex gap-4 mt-4">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 border border-gray-400 font-semibold rounded-xl py-3 hover:bg-gray-100 transition-all"
                >
                  Back
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.03 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                  className={`flex-1 font-semibold rounded-xl py-3 transition-all ${
                    isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isSubmitting ? "Sending request..." : "Submit Request"}
                </motion.button>
              </div>
            </>
          )}
        </form>
      </motion.div>

      {/* RIGHT — Image Carousel */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 mt-10 md:mt-0 relative overflow-hidden rounded-2xl"
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 6500, disableOnInteraction: false }}
          speed={1200}
          pagination={{ clickable: true }}
          loop
          className="hero-swiper rounded-2xl shadow-lg"
        >
          {["/images/simba.png", "/images/watermark.png"].map((src, index) => {
  const floatUp = index % 2 === 0;

  return (
    <SwiperSlide key={index}>
      <motion.div
        animate={{
          y: floatUp ? [0, -20, 0] : [0, 20, 0],
          rotate: floatUp ? [0, -1.2, 0] : [0, 1.2, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-[400px] md:h-[500px] overflow-visible"
      >
        <Image
          src={src}
          alt={`Sauzi Tours Slide ${index + 1}`}
          fill
          className="object-cover rounded-2xl pointer-events-none"
          priority={index === 0}
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
