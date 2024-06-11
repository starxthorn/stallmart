import React, { useState } from "react";
import { ProductTypes } from "@/types";
import Link from "next/link";
import MainLoader from "./MainLoader";

const ProductCard = ({
  title,
  price,
  category,
  image,
  clicked,
  route,
}: ProductTypes) => {
  const [loader, setLoader] = useState(false);
  return loader ? (
    <MainLoader styles="w-full h-[100vh]" />
  ) : (
    <>
      <Link href={`${route}/${clicked}`} onClick={() => setLoader(true)}>
        <img src={image} alt={title} />
        <h1 className="capitalize font-black mt-4">{title}</h1>
        <h2 className="text-gray-700 mt-1 capitalize">{category}</h2>
        <h2 className="text-gray-700">Rs. {price}</h2>
      </Link>
    </>
  );
};

export default ProductCard;
