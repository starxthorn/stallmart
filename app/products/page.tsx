"use client";
import ProductCard from "@/components/ProductCard";
import { ProductTypes } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);

  const getAllProducts = async () => {
    try {
      const res = await fetch(`/api/access-products`, {
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
  return (
    <>
      {products && products.length >= 1 ? (
        <>
          <section className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 lg:px-10 px-5 mb-40 mt-56">
            {products?.map((data, id) => {
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
