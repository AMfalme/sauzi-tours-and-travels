"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="header-carousel owl-carousel">
      {/* === First Slide === */}
      <div className="header-carousel-item">
        <Image
          src="/img/carousel-1.jpg"
          alt="Sauzi Tours - Theme Park"
          className="img-fluid w-100"
          width={1920}
          height={1080}
          priority
        />
        <div className="carousel-caption">
          <div className="container align-items-center py-4">
            <div className="row g-5 align-items-center">
              <div
                className="col-xl-7 fadeInLeft animated"
                data-animation="fadeInLeft"
                data-delay="1s"
                style={{ animationDelay: "1s" }}
              >
                <div className="text-start">
                  <h4 className="text-primary text-uppercase fw-bold mb-4">
                    Welcome To Sauzi Tours & Travel
                  </h4>
                  <h1 className="display-4 text-uppercase text-white mb-4">
                    The Biggest Theme & Amusement Park
                  </h1>
                  <p className="mb-4 fs-5">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy...
                  </p>
                  <div className="d-flex flex-shrink-0">
                    <a
                      className="btn btn-primary rounded-pill text-white py-3 px-5"
                      href="#"
                    >
                      Our Packages
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-5 fadeInRight animated"
                data-animation="fadeInRight"
                data-delay="1s"
                style={{ animationDelay: "1s" }}
              >
                <div className="ticket-form p-5 bg-white rounded-3 shadow">
                  <h2 className="text-dark text-uppercase mb-4">
                    Book Your Ticket
                  </h2>
                  <form>
                    <div className="row g-4">
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control border-0 py-2"
                          id="name"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="col-12 col-xl-6">
                        <input
                          type="email"
                          className="form-control border-0 py-2"
                          id="email"
                          placeholder="Your Email"
                        />
                      </div>
                      <div className="col-12 col-xl-6">
                        <input
                          type="tel"
                          className="form-control border-0 py-2"
                          id="phone"
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
                          id="number"
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

      {/* === Second Slide === */}
      <div className="header-carousel-item">
        <Image
          src="/img/carousel-2.jpg"
          alt="Sauzi Tours - Water Park"
          className="img-fluid w-100"
          width={1920}
          height={1080}
        />
        <div className="carousel-caption">
          <div className="container py-4">
            <div className="row g-5 align-items-center">
              <div
                className="col-xl-7 fadeInLeft animated"
                data-animation="fadeInLeft"
                data-delay="1s"
                style={{ animationDelay: "1s" }}
              >
                <div className="text-start">
                  <h4 className="text-primary text-uppercase fw-bold mb-4">
                    Welcome To Sauzi Tours & Travel
                  </h4>
                  <h1 className="display-4 text-uppercase text-white mb-4">
                    The Greatest Water and Amusement Park
                  </h1>
                  <p className="mb-4 fs-5">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry\'s
                    standard dummy...
                  </p>
                  <div className="d-flex flex-shrink-0">
                    <a
                      className="btn btn-primary rounded-pill text-white py-3 px-5"
                      href="#"
                    >
                      Our Packages
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-5 fadeInRight animated"
                data-animation="fadeInRight"
                data-delay="1s"
                style={{ animationDelay: "1s" }}
              >
                <div className="ticket-form p-5 bg-white rounded-3 shadow">
                  <h2 className="text-dark text-uppercase mb-4">
                    Book Your Ticket
                  </h2>
                  <form>
                    <div className="row g-4">
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control border-0 py-2"
                          id="name2"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="col-12 col-xl-6">
                        <input
                          type="email"
                          className="form-control border-0 py-2"
                          id="email2"
                          placeholder="Your Email"
                        />
                      </div>
                      <div className="col-12 col-xl-6">
                        <input
                          type="tel"
                          className="form-control border-0 py-2"
                          id="phone2"
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
                          id="number2"
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
    </div>
  );
}
