"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { UserType } from "@/types";
import MainLoader from "./MainLoader";

const Profile = (props: any) => {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [changes, setChanges] = useState(false);
  const [user, setUser] = useState<UserType | null>({
    name: "",
    email: "",
    province: "punjab",
    city: "",
    address: "",
    phone: 0,
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
          name: data.response.name,
          email: data.response.email,
          province: data.response.province || "punjab",
          city: data.response.city,
          address: data.response.address,
          phone: data.response.phone,
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

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChanges(true);
    setUser({
      ...user,
      province: e.target.value,
    });
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/access-single-user?id=${session.data?.user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUser({
          name: data.response.name,
          email: data.response.email,
          province: data.response.province,
          city: data.response.city,
          address: data.response.address,
          phone: data.response.phone,
        });
        props.isprofile(false);
      }
    } catch (error) {
      console.log(error);
    }
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
        <form
          onSubmit={handlesubmit}
          className="px-10 lg:mt-8 mt-4 flex flex-col mb-5"
        >
          <label htmlFor="name" className="mt-3 font-medium">
            Name
          </label>
          <h1 className="w-full mt-2 outline-none border border-gray-200 rounded-lg pl-3 py-2">
            {user?.name}
          </h1>
          <label htmlFor="email" className="mt-3 font-medium">
            Email
          </label>
          <h1 className="w-full mt-2 outline-none border border-gray-200 rounded-lg pl-3 py-2">
            {user?.email}
          </h1>
          <label htmlFor="province" className="mt-3 font-medium">
            Province
          </label>
          <select
            value={user?.province}
            required
            onChange={handleChangeSelect}
            className="w-full mt-2 outline-none border border-gray-200 rounded-lg pl-3 py-2"
            name="province"
          >
            <option value="punjab">Punjab</option>
            <option value="sindh">Sindh</option>
            <option value="balochistan">Balochistan</option>
            <option value="khyber pakhtunkhwa">Khyber Pakhtunkhwa</option>
          </select>
          <label htmlFor="city" className="mt-3 font-medium">
            City
          </label>
          <input
            type="text"
            required
            autoComplete="off"
            name="city"
            value={user?.city}
            onChange={handlechange}
            className="w-full mt-2 outline-none border border-gray-200 rounded-lg pl-3 py-2"
          />
          <label htmlFor="address" className="mt-3 font-medium">
            Address
          </label>
          <input
            type="text"
            required
            autoComplete="off"
            name="address"
            value={user?.address}
            onChange={handlechange}
            className="w-full mt-2 outline-none border border-gray-200 rounded-lg pl-3 py-2"
          />
          <label htmlFor="phone" className="mt-3 font-medium">
            Phone No
          </label>
          <input
            type="number"
            required
            autoComplete="off"
            name="phone"
            value={user?.phone}
            onChange={handlechange}
            className="w-full mt-2 outline-none border border-gray-200 rounded-lg pl-3 py-2"
          />
          <button
            disabled={changes === false ? true : false}
            type="submit"
            className="w-full text-white disabled:opacity-80 bg-black py-3 rounded-md mt-8"
          >
            Save Changes
          </button>
          {session?.data?.user?.role === "admin" ? (
            <>
              <Link href={"/admin/dashboard"} onClick={() => setLoading(true)}>
                <button
                  type="button"
                  className="w-full text-white bg-indigo-500 py-3 rounded-md mt-3"
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
                onClick={() => signOut()}
                className="w-full text-white bg-red-500 py-3 rounded-md mt-3"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => signOut()}
                className="w-full text-white bg-red-500 py-3 rounded-md mt-3"
              >
                Logout
              </button>
            </>
          )}
        </form>
      </section>
    </>
  );
};

export default Profile;
