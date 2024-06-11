"use client";
import Button from "@/components/Button";
import { useCart } from "@/context/AuthContext";
import { UserType } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const { cart, total } = useCart();
  const session = useSession();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const shippingCost = cart.length * 119;
  const [user, setUser] = useState<UserType | null>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser({
      province: e.target.value,
    });
  };

  const requestBody = {
    products: cart.map((item) => ({
      productId: item?.product?._id, // Assuming you have product ID in the product object
      quantityOfPro: item?.quantity,
    })),
    totalPrice: total, // Define a function to calculate total price based on cart items
    user: session.data?.user._id,
  };

  const hanldePlaceOrder = async () => {
    try {
      for (const item of cart) {
        const productId = item?.product?._id;
        const quantity = item?.quantity;
        await fetch(`/api/access-products?id=${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stock: item?.product?.stock! - quantity!,
          }),
        });
      }
      const res = await fetch(
        `/api/access-orders?id=${session.data?.user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (res.ok) {
        setLoader(true);
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      router.push("/");
    }
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    hanldePlaceOrder();
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
        toast("Order placed successfully");
        setUser({
          province: data.response.province,
          city: data.response.city,
          address: data.response.address,
          phone: data.response.phone,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      router.push("/");
    }
  };

  return (
    <>
      <section className="w-full flex lg:flex-row flex-col-reverse lg:items-start justify-center">
        <div className="lg:h-[100vh] lg:w-1/2 w-full flex lg:items-start lg:pr-20 pt-20 lg:justify-end">
          <form
            className="w-full lg:w-[30vw] flex flex-col lg:px-0 px-8 lg:pb-0 pb-20"
            onSubmit={handlesubmit}
          >
            <Link href={"/"}>
              <h1 className="text-3xl lg:text-5xl font-black">STALL MART</h1>
            </Link>
            <label htmlFor="name" className="mt-10">
              Name
            </label>
            <h1 className="lg:min-w-[30vw] mt-2 outline-none w-full border border-gray-200 rounded-lg pl-3 py-2">
              {session.data?.user.name}
            </h1>
            <label htmlFor="email" className="mt-4">
              Email
            </label>
            <h1 className="lg:min-w-[30vw] mt-2 outline-none w-full border border-gray-200 rounded-lg pl-3 py-2">
              {session.data?.user.email}
            </h1>
            <label htmlFor="province" className="mt-8">
              Province
            </label>
            <select
              value={user?.province}
              onChange={handleChangeSelect}
              className="lg:min-w-[30vw] mt-2 outline-none w-full border border-gray-200 rounded-lg pl-3 py-2"
              name="province"
            >
              <option value="punjab">Punjab</option>
              <option value="sindh">Sindh</option>
              <option value="balochistan">Balochistan</option>
              <option value="khyber pakhtunkhwa">Khyber Pakhtunkhwa</option>
            </select>
            <label htmlFor="city" className="mt-8">
              City
            </label>
            <input
              value={user?.city}
              type="text"
              onChange={handleChange}
              name="city"
              required
              autoComplete="off"
              className="lg:min-w-[30vw] mt-2 outline-none w-full border border-gray-200 rounded-lg pl-3 py-2"
            />
            <label htmlFor="house" className="mt-8">
              Address
            </label>
            <input
              value={user?.address}
              type="text"
              onChange={handleChange}
              name="address"
              required
              autoComplete="off"
              className="lg:min-w-[30vw] mt-2 outline-none w-full border border-gray-200 rounded-lg pl-3 py-2"
            />

            <label htmlFor="phone" className="mt-8">
              Phone No.
            </label>
            <input
              value={user?.phone}
              type="number"
              onChange={handleChange}
              name="phone"
              required
              autoComplete="off"
              className="lg:min-w-[30vw] mt-2 outline-none w-full border border-gray-200 rounded-lg pl-3 py-2"
            />
            <div className="mt-10">
              <h1 className="text-sm">
                <span className="text-yellow-500">Note: </span>Your Information
                will be <span className="underline">saved</span> for next time
              </h1>
            </div>
            <div className="flex lg:flex-row flex-col lg:items-center items-start lg:justify-between mt-4">
              <button
                onClick={() => router.push("/")}
                type="button"
                className="bg-none text-black font-medium"
              >
                {"<"} Return to shopping
              </button>
              <Button
                key={"key"}
                Buttontype="submit"
                styles={`hover:opacity-70 py-[12px] lg:mt-0 mt-5 ${
                  loader && "opacity-70"
                }`}
              >
                {loader ? "processing..." : "CHECKOUT (COD)"}
              </Button>
            </div>
          </form>
        </div>
        <div className="bg-gray-50 lg:h-[100vh] lg:pb-0 pb-10 lg:w-1/2 w-full flex flex-col lg:items-start lg:pl-20 pl-4 pt-20 lg:justify-start">
          <div className="flex flex-col gap-10">
            {cart &&
              cart.map((item, id) => {
                return (
                  <>
                    <div
                      className="flex items-start justify-start gap-10 mr-6"
                      key={id}
                    >
                      <div className="relative">
                        <Image
                          className="rounded-lg"
                          src={item.product?.images?.[0]?.url!}
                          width={120}
                          height={120}
                          alt={item.product?.title!}
                        />
                        <div className="absolute p-1 text-xs px-2 border-4 border-gray-50 rounded-full bg-yellow-500 text-white -top-2 -right-5">
                          {item.quantity}
                        </div>
                      </div>
                      <h1 className="capitalize font-medium w-40 mt-3">
                        {item.product?.title}
                      </h1>
                      <h2 className="font-bold mt-6 text-xl">
                        Rs.{item.product?.price! * item.quantity!}
                      </h2>
                    </div>
                  </>
                );
              })}
          </div>
          <div className="mt-20 min-w-[20vw] mr-6">
            <div className="flex items-center justify-between my-5">
              <h1 className="text-xl font-bold">SubTotal: </h1>
              <h1 className="text-xl font-bold">Rs. {total}</h1>
            </div>
            <div className="flex items-center justify-between my-5">
              <h1 className="text-xl font-bold">Shipping: </h1>
              <h1 className="text-xl font-bold">Rs. {shippingCost}</h1>
            </div>
            <hr />
            <div className="flex items-center justify-between my-5">
              <h1 className="text-xl font-bold">Total: </h1>
              <h1 className="text-xl font-bold">Rs. {total + shippingCost}</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
