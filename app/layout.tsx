import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shrix — Smart. Fast. Reliable.",
  description:
    "Shrix is a modern, smart ecommerce platform built for speed and trust.",
  icons: {
    icon: "/icon.png", // auto picked from app/icon.png
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="pt-[60px] min-h-screen">{children}</main>
          <Footer />
        </Providers>

        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        ></script>
      </body>
    </html>
  );
}
