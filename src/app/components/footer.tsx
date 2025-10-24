"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="px-6 md:px-16 py-12 border-b border-gray-800 text-center"
      >
        <h3 className="text-2xl font-semibold text-white mb-3">
          Let's Plan Your Next Adventure 🌍
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          Subscribe for exclusive travel deals, updates & inspiration.
        </p>

        <div className="flex justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-medium">
            Subscribe
          </button>
        </div>
      </motion.div>

      {/* Footer Content */}
      <div className="px-6 md:px-16 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

        {/* Logo + Branding */}
        <div>
            <span className="text-white font-bold text-xl">Sauzi Tours</span>
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Image
              src="/images/logo.png"
              alt="Sauzi Tours Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            
          </Link>

          <p className="text-gray-400 text-sm leading-relaxed">
            Unforgettable safaris & global adventures crafted with passion.
            Experience travel the Sauzi way. 🦁
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg text-white mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {["Home", "Destinations", "Packages", "Gallery", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-blue-400 transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-lg text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>Nairobi, Kenya</li>
            <li>+254 712 345 678</li>
            <li>info@sauzitours.com</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="font-semibold text-lg text-white mb-4">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            {[FaFacebookF, FaTwitter, FaInstagram, FaTiktok].map((Icon, i) => (
              <Link key={i} href="#" className="hover:text-blue-500 transition">
                <Icon />
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Note */}
      <div className="border-t border-gray-800 text-sm text-center py-6 text-gray-500">
        © {new Date().getFullYear()} Sauzi Tours. All Rights Reserved.
      </div>
    </footer>
  );
}
