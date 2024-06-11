"use client";
import { IoBagHandleOutline, IoMenu } from "react-icons/io5";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { NavCategories } from "@/data";
import { CiSearch } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import MainLoader from "./MainLoader";
import { useCart } from "@/context/AuthContext";
import { useState } from "react";
import SideMenu from "./SideMenu";
import Profile from "./Profile";

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const { handleSearch } = useCart();

  if (pathname.startsWith("/auth") || pathname.startsWith("/admin")) {
    return;
  }

  if (session.status === "loading") {
    return <MainLoader styles="w-full h-[100vh]" />;
  }

  const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push("/search-filter-results");
    }
  };

  return pathname === "/shipping-address-details" ? (
    <></>
  ) : (
    <>
      (
      <>
        <header className="w-full fixed top-0 left-0 bg-[rgba(255,255,255,.7)] pb-6 right-0 z-40 backdrop-blur-md">
          <h1 className="bg-black py-2 text-white text-center text-sm">
            {/* Get your Eid looks in time! ✨ Place your orders by 10th June for
          delivery before Eid. For Lahore customers only: Last day to place Eid
          orders is 14th June! */}
            Standard Delivery in 4-5 Business Days
          </h1>
          <nav className="flex items-center lg:px-8 px-4 lg:uppercase justify-between py-4 lg:pt-6 pt-2">
            <div className="flex items-center justify-center gap-2">
              <IoMenu
                onClick={() => setMenu(true)}
                className="lg:hidden block lg:text-4xl text-3xl"
              />
              <Link href={"/"}>
                <h1 className="lg:text-4xl text-3xl font-black cursor-pointer rounded-md">
                  Stall Mart
                </h1>
              </Link>
            </div>
            <div className="lg:flex hidden items-center justify-between border border-gray-200 rounded-lg w-[50rem] backdrop-blur-sm pl-4 py-3">
              <input
                type="text"
                onKeyDown={handleEnterSearch}
                onChange={handleSearch}
                placeholder="Find your products"
                className="border-none bg-transparent placeholder:text-gray-600 placeholder:font-light h-full w-full outline-none"
              />
              <CiSearch className="mr-5 text-2xl" />
            </div>
            <div className="flex items-center justify-center lg:gap-3 gap-2">
              <Link href={"/cart"} className="relative">
                <IoBagHandleOutline className="lg:text-4xl text-3xl cursor-pointer text-black hover:text-yellow-600 transition-all" />
                <div
                  className={`absolute bg-yellow-500 ${
                    cart.length == 0 && "hidden"
                  } text-white text-xs p-1 px-2 rounded-full -top-1 -right-2`}
                >
                  {cart.length}
                </div>
              </Link>
              <div className="ml-2 relative">
                {session.data ? (
                  <>
                    <img
                      onClick={() => setProfile(true)}
                      src={session?.data?.user?.image || ""}
                      alt="profile picture"
                      className="cursor-pointer rounded-full w-12 h-12"
                    />
                  </>
                ) : (
                  <>
                    <Link href={"/auth/sign-in"}>
                      <Button>Login</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
          <div className="lg:hidden py-3 pl-4 mx-3 mt-2 flex items-center justify-between border backdrop-blur-sm border-gray-200 rounded-lg">
            <input
              type="text"
              onKeyDown={handleEnterSearch}
              onChange={handleSearch}
              placeholder="Find your products"
              className="border-none bg-transparent placeholder:text-gray-600 placeholder:font-light h-full w-full outline-none"
            />
            <CiSearch className="mr-5 text-2xl" />
          </div>
          <div className="lg:flex hidden items-center justify-center gap-6 cursor-pointer uppercase text-center w-full mt-4">
            {NavCategories.map((data, id) => {
              return (
                <>
                  <Link href={`/category-filter/${data}`} key={id}>
                    <h1
                      className="hover:text-yellow-600 font-extralight"
                      key={id}
                    >
                      {data}
                    </h1>
                  </Link>
                </>
              );
            })}
          </div>
        </header>
        {menu && <SideMenu ismenu={setMenu} />}
        {profile && <Profile isprofile={setProfile} />}
      </>
      )
    </>
  );
};

export default Navbar;
