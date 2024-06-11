"use client";
import ProductCard from "@/components/ProductCard";
import { ProductTypes } from "@/types";
import { useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);

  const getAllProducts = async () => {
    try {
      const res = await fetch("/api/access-products", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(
          data.response.filter((i: any) => {
            return i.featured === true;
          })
        );
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
      <section>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:px-10 px-5 gap-8 mb-40 mt-56">
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

export default page;
