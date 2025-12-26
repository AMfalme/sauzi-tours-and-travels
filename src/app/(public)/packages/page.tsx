import FeaturedPackages from "@/app/sections/featured-projects";

export default function PackagesPage() {
  const packages = [
    { name: "Family Safari", description: "Explore wildlife with your loved ones.", price: "$400" },
    { name: "Beach Escape", description: "Relax on Kenya’s beautiful coastlines.", price: "$350" },
    { name: "Adventure Trek", description: "Experience the thrill of mountain hikes.", price: "$500" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Our Packages</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <div key={i} className="p-6 bg-white shadow rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">{pkg.name}</h2>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              <span className="text-primary font-bold">{pkg.price}</span>
            </div>
          ))}
        </div>
         <FeaturedPackages/>
      </div>
    </section>
  );
}
