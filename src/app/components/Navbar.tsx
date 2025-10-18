import Link from "next/link";

export default function Navbar() {
  return (
    <>
      {/* Spinner Start */}
      <div
        id="spinner"
        className=" bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      {/* Spinner End */}

      {/* Navbar & Hero Start */}
      <div className="container-fluid nav-bar sticky-top px-4 py-2 py-lg-0">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link href="/" className="navbar-brand p-0">
            <h1 className="display-6 text-dark">
              <i className="fas fa-swimmer text-primary me-3"></i>WaterLand
            </h1>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav mx-auto py-0">
              <Link href="/" className="nav-item nav-link active">
                Home
              </Link>
              <Link href="/about" className="nav-item nav-link">
                About
              </Link>
              <Link href="/service" className="nav-item nav-link">
                Tours
              </Link>
              <Link href="/service" className="nav-item nav-link">
                Destinations
              </Link>
              {/* <Link href="/blog" className="nav-item nav-link">
                Blog
              </Link> */}

              {/* <div className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link text-decoration-none"
                  data-bs-toggle="dropdown"
                  type="button"
                >
                  Pages
                </button>
                <div className="dropdown-menu m-0">
                  <Link href="/feature" className="dropdown-item">
                    Our Feature
                  </Link>
                  <Link href="/gallery" className="dropdown-item">
                    Our Gallery
                  </Link>
                  <Link href="/attraction" className="dropdown-item">
                    Attractions
                  </Link>
                  <Link href="/package" className="dropdown-item">
                    Ticket Packages
                  </Link>
                  <Link href="/team" className="dropdown-item">
                    Our Team
                  </Link>
                  <Link href="/testimonial" className="dropdown-item">
                    Testimonial
                  </Link>
                  <Link href="/404" className="dropdown-item">
                    404 Page
                  </Link>
                </div>
              </div> */}

              <Link href="/contact" className="nav-item nav-link">
                Contact
              </Link>
            </div>

            <div className="team-icon d-none d-xl-flex justify-content-center me-3">
              <Link href="#" className="btn btn-square btn-light rounded-circle mx-1">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link href="#" className="btn btn-square btn-light rounded-circle mx-1">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link href="#" className="btn btn-square btn-light rounded-circle mx-1">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link href="#" className="btn btn-square btn-light rounded-circle mx-1">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>

            <Link
              href="#"
              className="btn btn-primary rounded-pill py-2 px-4 flex-shrink-0"
            >
              Get a quote
            </Link>
          </div>
        </nav>
      </div>
      {/* Navbar & Hero End */}
    </>
  );
}
