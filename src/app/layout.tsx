import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";

export const metadata = {
  title: "WaterLand - Water Park Website Template",
  description: "WaterLand - Water Park Website Template",
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
