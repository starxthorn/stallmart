"use client";
import AdminWrapper from "../components/AdminWrapper";
import BarChart from "../components/BarChart";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductTypes, UserType } from "@/types";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import MainLoader from "@/components/MainLoader";

const page = () => {
  const [Allusers, setAllusers] = useState<UserType[]>([]);
  const [Allproducts, setAllproducts] = useState<ProductTypes[]>([]);
  const [sales, setSales] = useState([]);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(false);

  const getAllUsers = async () => {
    try {
      const res = await fetch("/api/access-users", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setAllusers(data.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const res = await fetch("/api/access-products", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setAllproducts(data.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllSales = async () => {
    try {
      const res = await fetch("/api/access-orders", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setSales(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTotal = () => {
    let totalPriceOfProducts = 0;
    sales?.forEach((item) => {
      const { totalPrice } = item;
      totalPriceOfProducts += totalPrice;
    });
    setTotal(totalPriceOfProducts);
  };

  useEffect(() => {
    handleTotal();
  }, [sales]);

  useEffect(() => {
    getAllSales();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  return loader ? (
    <MainLoader styles="w-full h-[100vh]" />
  ) : (
    <>
      <AdminWrapper>
        <section>
          <div className="grid grid-cols-4 gap-8">
            <div className="w-full  border border-gray-200 shadow-sm rounded-lg p-4 pl-8 py-10">
              <h1 className="text-4xl font-semibold">
                Rs. {Number(total) || 0}
              </h1>
              <h2 className="mt-3 text-black text-lg">Total Revenue</h2>
            </div>
            <div className="w-full  border border-gray-200 shadow-sm rounded-lg p-4 pl-8 py-10">
              <h1 className="text-4xl font-semibold">
                {Number(sales?.length) <= 0
                  ? 0
                  : Number(sales?.length) === 1
                  ? Number(sales?.length)
                  : Number(sales?.length) - 1 + "+"}
              </h1>
              <h2 className="mt-3 text-black text-lg">Total Sales</h2>
            </div>
            <div className="w-full bg-gray-5 border border-gray-200 shadow-sm rounded-lg p-4 pl-8 py-10">
              <h1 className="text-4xl font-semibold">
                {Number(Allusers?.length) <= 0
                  ? 0
                  : Number(Allusers?.length) === 1
                  ? Number(Allusers?.length)
                  : Number(Allusers?.length) - 1 + "+"}
              </h1>
              <h2 className="mt-3 text-black text-lg">Total Customers</h2>
            </div>
            <div className="w-full  border border-gray-200 shadow-sm rounded-lg p-4 pl-8 py-10">
              <h1 className="text-4xl font-semibold">
                {Number(Allproducts?.length) <= 0
                  ? 0
                  : Number(Allproducts?.length) === 1
                  ? Number(Allproducts?.length)
                  : Number(Allproducts?.length) - 1 + "+"}
              </h1>
              <h2 className="mt-3 text-black text-lg">Total Products</h2>
            </div>
          </div>
          <div className="grid mt-8 grid-cols-2 gap-8">
            <div className="border border-gray-200 shadow-sm px-5 pt-10 rounded-lg">
              <BarChart />
            </div>
            <div className="border border-gray-200 shadow-sm px-5 pt-5 rounded-lg">
              <h1 className="text-black text-2xl font-semibold">
                Recent Users
              </h1>
              <h2 className="text-gray-500 mt-1 mb-4 flex items-center justify-between">
                The recent new users that logged in our website
                <Link
                  onClick={() => setLoader(true)}
                  href={"/admin/users"}
                  className="flex items-center justify-end gap-1 text-indigo-400 hover:text-indigo-500 transition-all"
                >
                  See all <FaArrowRight className="text-xs" />
                </Link>
              </h2>
              {Allusers.map((data) => {
                return (
                  <>
                    <div
                      className="mt-6 flex items-center justify-between cursor-pointer"
                      key={data.name}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <Image
                          width={60}
                          height={60}
                          className="rounded-full"
                          src={data?.avatar!}
                          alt="avatar"
                        />
                        <div>
                          <Link
                            href={`/admin/users/edit-user-role/${data?._id}`}
                            className="text-black text-lg font-semibold"
                          >
                            {data.name}
                          </Link>
                          <h2 className="text-gray-500">{data.email}</h2>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }).slice(0, 5)}
            </div>
          </div>
          <div className="my-12 border border-gray-200 p-6">
            <Link
              onClick={() => setLoader(true)}
              href={"/admin/products"}
              className="flex items-center justify-end gap-1 mr-2 text-indigo-400 hover:text-indigo-500 transition-all"
            >
              See all <FaArrowRight className="text-xs" />{" "}
            </Link>{" "}
            <div className="grid rounded-lg grid-cols-4 mt-4 gap-8">
              {Allproducts.map((data, id) => {
                return (
                  <ProductCard
                    route="/admin/products/edit-single-product/"
                    clicked={data?._id}
                    image={data?.images?.[0]?.url || ""}
                    title={data?.title}
                    key={id}
                    price={data?.price}
                    category={data?.category}
                  />
                );
              })
                .reverse()
                .slice(0, 4)}
            </div>
          </div>
        </section>
      </AdminWrapper>
    </>
  );
};

export default page;
