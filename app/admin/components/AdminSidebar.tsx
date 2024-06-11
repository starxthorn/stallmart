"use client";
import Link from "next/link";
import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { BiWallet } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { LuUsers } from "react-icons/lu";
import Button from "@/components/Button";
import { signOut, useSession } from "next-auth/react";
import MainLoader from "@/components/MainLoader";

const AdminSidebar = () => {
  const pathname = usePathname();
  const session = useSession();
  const [loader, setLoader] = useState(false);

  return loader ? (
    <MainLoader styles="w-full h-[100vh]" />
  ) : (
    <>
      <section className="w-80 h-[100vh] bg-gray-50 relative">
        <h1 className="text-3xl font-black text-black mt-4 ml-3">
          <Link href={"/"} onClick={() => setLoader(true)}>
            STALL MART
          </Link>
        </h1>
        <ul className="w-full mt-8 px-3 flex flex-col gap-2">
          <li>
            <Link
              onClick={() => setLoader(true)}
              className={`${
                pathname.startsWith("/admin/dashboard")
                  ? "text-white bg-indigo-500"
                  : "text-black hover:bg-gray-200"
              } flex items-center justify-start gap-3 rounded-lg hover:pl-8 pl-4 transition-all py-3`}
              href={"/admin/dashboard"}
            >
              <LuLayoutDashboard
                className={`text-2xl ${
                  pathname.startsWith("/admin/dashboard")
                    ? "text-white"
                    : "text-black"
                }`}
              />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setLoader(true)}
              className={`${
                pathname.startsWith("/admin/products")
                  ? "text-white bg-indigo-500"
                  : "text-black hover:bg-gray-200"
              } flex items-center justify-start gap-3 rounded-lg hover:pl-8 pl-4 transition-all py-3`}
              href={"/admin/products"}
            >
              <FiShoppingBag
                className={`text-2xl ${
                  pathname.startsWith("/admin/products")
                    ? "text-white"
                    : "text-black"
                }`}
              />
              Products
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setLoader(true)}
              className={`${
                pathname.startsWith("/admin/users")
                  ? "text-white bg-indigo-500"
                  : "text-black hover:bg-gray-200"
              } flex items-center justify-start gap-3 rounded-lg hover:pl-8 pl-4 transition-all py-3`}
              href={"/admin/users"}
            >
              <LuUsers
                className={`text-2xl ${
                  pathname.startsWith("/admin/users")
                    ? "text-white"
                    : "text-black"
                }`}
              />
              Users
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setLoader(true)}
              className={`${
                pathname.startsWith("/admin/orders")
                  ? "text-white bg-indigo-500"
                  : "text-black hover:bg-gray-200"
              } flex items-center justify-start gap-3 rounded-lg hover:pl-8 pl-4 transition-all py-3`}
              href={"/admin/orders"}
            >
              <BiWallet
                className={`text-2xl ${
                  pathname.startsWith("/admin/orders")
                    ? "text-white"
                    : "text-black"
                }`}
              />
              Orders
            </Link>
          </li>
        </ul>
        <div className="absolute bottom-7 right-0 left-0 mx-4">
          {session.status === "loading" ? (
            <div className="flex items-center justify-center">
              <MainLoader styles="w-full h-full" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-start gap-3">
                <img
                  src={
                    session?.data?.user?.image
                      ? session?.data?.user?.image
                      : "https://api.dicebear.com/8.x/notionists/svg?seed=Chester"
                  }
                  alt="profile image"
                  width={50}
                  height={50}
                  className="rounded-full bg-indigo-500"
                />
                <div>
                  <h1 className="text-black font-semibold">
                    {session.data?.user.name}
                  </h1>
                  <h3 className="text-gray-500 font-semibold text-sm uppercase">
                    {session.data?.user.role}
                  </h3>
                </div>
              </div>
              <Button
                clicked={() =>
                  signOut({ redirect: true, callbackUrl: "/auth/sign-in" })
                }
                styles="w-full bg-indigo-500 mt-6 text-white border border-indigo-500 rounded-lg py-3 transition-all hover:opacity-80"
              >
                Sign out
              </Button>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminSidebar;
