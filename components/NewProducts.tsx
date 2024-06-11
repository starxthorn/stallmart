"use client";

import { ProductTypes } from "@/types";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "./ProductCard";
import Link from "next/link";
import MainLoader from "./MainLoader";

const NewProducts = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [loader, setLoader] = useState(false);

  const getAllProducts = async () => {
    try {
      const res = await fetch("/api/access-products", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(data.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return loader ? (
    <MainLoader styles="w-full h-[100vh]" />
  ) : (
    <>
      <section className="mt-20">
        <div className="flex items-center justify-between my-10">
          <h1 className="lg:text-3xl text-xl font-bold uppercase">
            Our New Products
          </h1>
          <Link
            onClick={() => setLoader(true)}
            href={"/products"}
            className="text-indigo-500 text-md flex items-center cursor-pointer justify-center gap-2"
          >
            See all <FaArrowRight className="text-xs" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products
            .map((data, id) => {
              return (
                <ProductCard
                  route="/product-details"
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
            .slice(0, 8)}
        </div>
      </section>
    </>
  );
};

export default NewProducts;
