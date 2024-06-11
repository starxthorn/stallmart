"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaPhone, FaYoutube } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  const [email, setEmail] = useState({
    email: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setEmail({ email: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const pathname = usePathname();
  return pathname.startsWith("/admin") ||
    pathname.startsWith("/auth") ||
    pathname === "/shipping-address-details" ? (
    ""
  ) : (
    <>
      <footer className="bg-gray-50 px-5 lg:mt-40 mt-20 pt-10 lg:pb-24 pb-10 w-full">
        <div className="container mx-auto flex lg:flex-row flex-col items-start justify-between w-full">
          <div>
            <h1 className="text-black text-md lg:text-xl lg:mb-8 mb-4">
              Contact Us
            </h1>
            <div className="flex items-center justify-start mt-7 gap-2">
              <FaMapLocation className="lg:text-2xl text-gray-500 text-xl" />
              <h1 className="text-sm lg:text-lg text-gray-500">
                Street-6, Clock Tower, Faisalabad, Punjab
              </h1>
            </div>
            <div className="flex items-center justify-start mt-7 gap-2">
              <IoMdMail className="lg:text-2xl text-gray-500 text-xl" />
              <h1 className="text-sm lg:text-lg text-gray-500">
                dummymail@gmail.com
              </h1>
            </div>
            <div className="flex items-center justify-start mt-7 gap-2">
              <FaPhone className="lg:text-2xl text-gray-500 text-xl" />
              <h1 className="text-sm lg:text-lg text-gray-500">
                +923*********
              </h1>
            </div>
          </div>
          <div className="lg:mt-0 mt-10">
            <h1 className="text-black text-md lg:text-xl">Send Messages</h1>
            <form
              onSubmit={handleSubmit}
              className="flex lg:flex-row lg:gap-4 flex-col lg:items-center justify-center items-start"
            >
              <input
                onChange={(e) => setEmail({ email: e.target.value })}
                type="text"
                name="email"
                value={email.email}
                required
                autoComplete="off"
                className="border border-gray-300 py-2 pl-3 text-md bg-none outline-none rounded-md lg:w-[20vw] w-full mt-4"
                placeholder="Enter message"
              />
              <button className="bg-black rounded-md mt-4 text-white px-3 py-2 text-md cursor-pointer">
                Submit
              </button>
            </form>
          </div>
          <div className="lg:mt-0 mt-10">
            <h1 className="text-black text-md lg:text-xl lg:mb-6 mb-4">
              Our Social Links
            </h1>
            <div className="flex items-center gap-4 text-gray-700">
              <FaFacebook className="lg:text-4xl text-3xl cursor-pointer text-blue-500 transition-all" />
              <FaInstagram className="lg:text-4xl text-3xl cursor-pointer text-pink-500 transition-all" />
              <FaYoutube className="lg:text-4xl text-3xl cursor-pointer text-red-500 transition-all" />
            </div>
          </div>
        </div>
        <div className="text-gray-500 mt-16 container mx-auto w-full flex lg:justify-start justify-center text-center">
          <h1 className="text-sm lg:text-md">
            &copy; Copyright 2024 Stall Mart
          </h1>
        </div>
      </footer>
    </>
  );
};

export default Footer;
