import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <Link href="/" className="navbar-brand p-0">
          <Image
            className="img-fluid"
            src="/images/sauzi-logo-img.png"
            alt="Sauzi Tours & Travel"
            width={200}
            height={100}
            priority
          />
        </Link>
        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-blue-600 p-3">
            <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <Link className="text-sm decoration-none text-gray-400 hover:text-gray-500 uppercase no-underline" href="/">
              HOME
            </Link>
          </li>
          <li >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li className="text-gray-300">
            <Link className="text-sm decoration-none text-blue-600 font-bold uppercase no-underline" href="/about">
              ABOUT US
            </Link>
          </li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li>
            <Link className="text-sm decoration-none text-gray-400 hover:text-gray-500 uppercase no-underline" href="/packages">
              TOURS
            </Link>
          </li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li>
            <Link className="text-sm decoration-none text-gray-400 hover:text-gray-500 uppercase no-underline" href="/destinations">
              DESTINATIONS
            </Link>
          </li>
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li>
            <Link className="text-sm decoration-none text-gray-400 hover:text-gray-500 uppercase no-underline" href="/contact">
              CONTACT
            </Link>
          </li>
        </ul>
        <Link 
          className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-full transition duration-200 uppercase no-underline" 
          href="/quote"
        >
          GET A QUOTE
        </Link>
      </nav>
      <div className="navbar-menu relative z-50 hidden">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <Link className="mr-auto text-3xl font-bold leading-none" href="/">
              <Image
                className="img-fluid"
                src="/images/sauzi-logo-img.png"
                alt="Sauzi Tours & Travel"
                width={150}
                height={75}
              />
            </Link>
            <button className="navbar-close">
              <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded uppercase no-underline" href="/">
                  HOME
                </Link>
              </li>
              <li className="mb-1">
                <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded uppercase no-underline" href="/about">
                  ABOUT US
                </Link>
              </li>
              <li className="mb-1">
                <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded uppercase no-underline" href="/tours">
                  TOURS
                </Link>
              </li>
              <li className="mb-1">
                <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded uppercase no-underline" href="/destinations">
                  DESTINATIONS
                </Link>
              </li>
              <li className="mb-1">
                <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded uppercase no-underline" href="/contact">
                  CONTACT us
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              <Link className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-full uppercase no-underline" href="/signin">
                SIGN IN
              </Link>
              <Link className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-full uppercase no-underline" href="/signup">
                GET A QUOTE
              </Link>
            </div>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2023</span>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}