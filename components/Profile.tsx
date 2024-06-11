"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { UserType } from "@/types";
import MainLoader from "./MainLoader";
import Image from "next/image";

const Profile = (props: any) => {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [changes, setChanges] = useState(false);
  const [user, setUser] = useState<UserType | null>({
    avatar: "",
    name: "",
    email: "",
  });

  const getUser = async () => {
    try {
      const res = await fetch(
        `/api/access-single-user?id=${session.data?.user._id}`,
        {
          method: "GET",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setUser({
          avatar: data.response.avatar,
          name: data.response.name,
          email: data.response.email,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session.data) {
      getUser();
    }
  }, [session]);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChanges(true);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <div
        className="fixed inset-0 w-full h-full z-50 bg-black opacity-50"
        onClick={() => props.isprofile(false)}
      ></div>
      <section className="h-full animate z-50 lg:w-[24vw] w-full bg-white border border-l-gray-300 fixed right-0 top-0 bottom-0">
        <div className="w-full flex justify-end items-end">
          <IoClose
            className="text-4xl mt-7 mr-7 cursor-pointer"
            onClick={() => props.isprofile(false)}
          />
        </div>
        <div className="px-6 lg:mt-8 mt-16 flex flex-col mb-5">
          <div className="flex items-center justify-center w-full">
            <Image
              src={user?.avatar!}
              width={150}
              height={150}
              alt={user?.name!}
              className="rounded-full my-6"
            />
          </div>
          <label htmlFor="name" className="mt-5 font-medium text-lg self-start">
            Name
          </label>
          <h1 className="w-full mt-4 outline-none border border-gray-200 rounded-lg pl-3 py-2">
            {user?.name}
          </h1>
          <label
            htmlFor="email"
            className="mt-5 font-medium text-lg self-start"
          >
            Email
          </label>
          <h1 className="w-full mt-4 outline-none border border-gray-200 rounded-lg pl-3 py-2">
            {user?.email}
          </h1>
          {session?.data?.user?.role === "admin" ? (
            <>
              <Link href={"/admin/dashboard"} onClick={() => setLoading(true)}>
                <button
                  type="button"
                  className="mt-10 bg-indigo-500 text-white py-3 rounded-md w-full"
                >
                  {loading ? (
                    <>
                      {/* <div className="container mx-auto w-full flex items-center justify-center">
                        <div className="load-animation border-2 border-white border-r-indigo-500 w-5 h-5 rounded-full"></div>
                      </div> */}
                      <MainLoader styles="w-full h-[100vh]" />
                    </>
                  ) : (
                    "Admin Dashboard"
                  )}
                </button>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full text-white bg-red-500 py-3 rounded-md mt-3"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full text-white bg-red-500 py-3 rounded-md mt-8"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
