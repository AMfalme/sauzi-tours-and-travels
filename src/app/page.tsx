

import HeroSection from "./sections/Hero";

import PopularDestinations from "./sections/popular-destinations";
import FeaturedPackages from "./sections/featured-projects";
import WhyChooseUs from "./sections/why-us";
import Testimonials from "./sections/testimonials";
import Gallery from "./sections/gallery";
import CTA from "./sections/CTA";

export default function Home() {
  return (
    <>
    <HeroSection />
    <PopularDestinations />
    <FeaturedPackages/>
    <WhyChooseUs/>
    <CTA />
    <Testimonials />
    <Gallery />

    </>
  );
}
