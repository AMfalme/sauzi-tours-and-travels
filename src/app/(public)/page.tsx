

import HeroSection from "../sections/Hero";

import PopularDestinations from "../sections/popular-destinations";
import Tours from "./tours/page";
import WhyChooseUs from "../sections/why-us";
import Testimonials from "../sections/testimonials";
import Gallery from "../sections/gallery";
import CTA from "../sections/CTA";

export default function Home() {
  return (
    <>
    <HeroSection />
    <PopularDestinations />
    <Tours/>
    <WhyChooseUs/>
    <CTA />
    <Testimonials />
    <Gallery />

    </>
  );
}
