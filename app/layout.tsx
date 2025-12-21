import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";

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
          {children}
          <Footer />
        </Providers>

        {/* ✅ Razorpay Checkout Script (GLOBAL) */}
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        ></script>
      </body>
    </html>
  );
}
