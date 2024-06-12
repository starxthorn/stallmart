"use client";
import MainLoader from "@/components/MainLoader";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/AuthContext";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const { filteredProducts } = useCart();

  return (
    <>
      {filteredProducts && filteredProducts.length >= 1 ? (
        <>
          <section className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 lg:px-10 px-4 lg:gap-8 gap-5 mb-40 lg:mt-56 mt-48">
            {filteredProducts?.map((data, id) => {
              return (
                <ProductCard
                  route="/product-details"
                  clicked={data._id}
                  key={id}
                  _id={data._id}
                  title={data.title}
                  category={data.category}
                  price={data.price}
                  image={data.images?.[0]?.url}
                />
              );
            })}
          </section>
        </>
      ) : (
        <>
          <div className="flex items-center mt-64 mb-40 justify-center text-center flex-col gap-4 mx-auto container">
            <img src="/empty-cart.jpg" alt="empty" className="w-52" />
            <h1 className="lg:text-4xl text-xl text-black font-semibold">
              There is nothing in this category
            </h1>
            <Link href={"/"}>
              <button className="rounded-md bg-black py-3 px-3 text-md lg:text-xl text-white">
                Continue Shopping
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default page;
