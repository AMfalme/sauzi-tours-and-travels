import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="container-fluid p-0 mb-5 hero-header">
      <div className="row g-0 align-items-center flex-column-reverse flex-lg-row">
        <div className="col-lg-6 text-center text-lg-start">
          <h1 className="display-4 text-white animated slideInDown mb-4">
            Explore The World With Us
          </h1>
          <p className="fs-5 text-white mb-4 pb-2">
            Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut
            dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed
            rebum vero dolor duo.
          </p>
          <a href="" className="btn btn-primary py-3 px-5 me-3 animated slideInLeft">
            Read More
          </a>
          <a href="" className="btn btn-secondary py-3 px-5 animated slideInRight">
            Contact Us
          </a>
          <Image
            className="img-fluid"
            src="/img/hero.png"
            alt=""
            width={800}
            height={600}
            priority
          />
        </div>
      </div>
    </div>
  );
}               