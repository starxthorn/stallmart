import type { Metadata } from "next";
import { roboto } from "@/fonts";
import { AuthSessionProvider } from "@/context/Authenticate";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { CartContextProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "StallMart - Online Shopping store having quality products",
  description:
    "Stall mart is best online ecommerce store in pakistan that provide best products with cheap prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthSessionProvider>
          <CartContextProvider>
            <Navbar />
            {children}
            <Footer />
          </CartContextProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
