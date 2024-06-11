import type { Metadata } from "next";
import { roboto } from "@/fonts";
import { AuthSessionProvider } from "@/context/Authenticate";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              bodyClassName="toastBody"
            />
            <Footer />
          </CartContextProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
