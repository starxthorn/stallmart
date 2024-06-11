"use client";
import { ProductTypes } from "@/types";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import MainLoader from "./MainLoader";

const OtherPro = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [loader, setLoader] = useState(false);

  const getAllProducts = async () => {
    try {
      const res = await fetch("/api/access-products", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        const filteredData = data.response.filter((item: ProductTypes) => {
          console.log(item.category);
          console.log(category);
          return item.category === category;
        });
        console.log(filteredData);
        setProducts(filteredData);
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
      <section className="px-5 lg:px-10">
        <div className="flex items-center justify-between my-10 mt-32">
          <h1 className="lg:text-3xl text-xl font-bold uppercase text-black">
            Related Products
          </h1>
          <Link
            onClick={() => setLoader(true)}
            href={`/category-filter/${category}`}
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
                  image={data?.images?.[0]?.url}
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
      </section>
    </>
  );
};

export default OtherPro;
