"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About <span className="text-blue-600">Sauzi Tours & Travel</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the world with us. We are passionate about creating unforgettable travel experiences
            across Kenya and beyond.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Image
              src="/images/amboseli.jpg"
              alt="About Sauzi Tours & Travel"
              width={600}
              height={400}
              className="rounded-2xl shadow-md object-cover"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Who We Are
            </h3>
            <p className="text-gray-600 mb-4">
              Sauzi Tours & Travel is a trusted travel agency that provides personalized and affordable
              holiday packages. From safari adventures to tropical getaways, we ensure every trip is memorable.
            </p>
            <p className="text-gray-600 mb-4">
              Our mission is to simplify your travel planning while offering unbeatable experiences
              that connect you with the beauty, culture, and people of each destination.
            </p>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Customized travel packages</li>
              <li>Professional tour guides</li>
              <li>Affordable rates and great deals</li>
              <li>24/7 customer support</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
