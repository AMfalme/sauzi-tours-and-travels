import "./globals.css";

import Navbar from "./components/Nav";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
