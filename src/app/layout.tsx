import "./globals.css";

import Navbar from "./components/Nav";
import { FaWhatsapp } from "react-icons/fa";

import LoginSlideModal from "./components/loginPrompt";
import Footer from "./components/footer";
export const metadata = {
  title: "Sauzi Tours and Travels",
  description: "Sauzi Tours and Travels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Add Font Awesome CSS here */}
        <link
  rel="stylesheet"
  href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
  
/>

      </head>
      <body>
        <LoginSlideModal />
        <Navbar />
        {children}
        <Footer />

        <a
          href="https://wa.me/491743637476?text=Hello%2C%20I%20need%20help%20with%20a%20travel%20plan"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed right-4 bottom-4 z-50 inline-flex items-center justify-center h-14 w-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="h-7 w-7" />
        </a>
      </body>
    </html>
  );
}
