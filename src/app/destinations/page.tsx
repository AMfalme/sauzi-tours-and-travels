import PopularDestinations from "../sections/popular-destinations";
export default function AboutPage() {
  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">About Sauzi Tours & Travel</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sauzi Tours & Travel is dedicated to creating unforgettable experiences across Africa. 
          From safaris to beach getaways, we ensure every trip is seamless, exciting, and memorable.
        </p>
      </div>
      <PopularDestinations />
    </section>
  );
}
