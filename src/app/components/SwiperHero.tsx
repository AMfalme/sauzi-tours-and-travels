"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroCarousel() {
  const slides = [
    {
      image: "/images/hero-section-1.jpg",
      title: "The Biggest Theme & Amusement Park",
      subtitle: "Welcome To Sauzi Tours & Travel",
    },
    {
      image: "/images/hero-section-2.jpg",
      title: "The Greatest Water and Amusement Park",
      subtitle: "Welcome To Sauzi Tours & Travel",
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop
      className="header-carousel"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="header-carousel-item position-relative">
            <Image
              src={slide.image}
              alt={slide.title}
              className="img-fluid w-100"
              width={1920}
              height={1080}
              priority={index === 0}
            />

            <div className="carousel-caption position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
              <div className="container py-4">
                <div className="row g-5 align-items-center">
                  {/* Left Text Section */}
                  <div
                    className="col-xl-7 animate__animated animate__fadeInLeft"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <div className="text-start">
                      <h4 className="text-primary text-uppercase fw-bold mb-4">
                        {slide.subtitle}
                      </h4>
                      <h1 className="display-4 text-uppercase text-white mb-4">
                        {slide.title}
                      </h1>
                      <p className="mb-4 fs-5 text-white-50">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy...
                      </p>
                      <a
                        className="btn btn-primary rounded-pill text-white py-3 px-5"
                        href="#"
                      >
                        Our Packages
                      </a>
                    </div>
                  </div>

                  {/* Right Booking Form */}
                  <div
                    className="col-xl-5 animate__animated animate__fadeInRight"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <div className="ticket-form p-5 rounded-3 shadow">
                      <h2 className="text-dark text-uppercase mb-4">
                        Book Your Ticket
                      </h2>
                      <form>
                        <div className="row g-4">
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control border-0 py-2"
                              id={`name-${index}`}
                              placeholder="Your Name"
                            />
                          </div>
                          <div className="col-12 col-xl-6">
                            <input
                              type="email"
                              className="form-control border-0 py-2"
                              id={`email-${index}`}
                              placeholder="Your Email"
                            />
                          </div>
                          <div className="col-12 col-xl-6">
                            <input
                              type="tel"
                              className="form-control border-0 py-2"
                              id={`phone-${index}`}
                              placeholder="Phone"
                            />
                          </div>
                          <div className="col-12">
                            <select
                              className="form-select border-0 py-2"
                              aria-label="Select Package"
                            >
                              <option defaultValue="">Select Package</option>
                              <option value="1">Family Packages</option>
                              <option value="2">Basic Packages</option>
                              <option value="3">Premium Packages</option>
                            </select>
                          </div>
                          <div className="col-12">
                            <input
                              className="form-control border-0 py-2"
                              type="date"
                            />
                          </div>
                          <div className="col-12">
                            <input
                              type="number"
                              className="form-control border-0 py-2"
                              id={`number-${index}`}
                              placeholder="Guest"
                            />
                          </div>
                          <div className="col-12">
                            <button
                              type="button"
                              className="btn btn-primary w-100 py-2 px-5"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
