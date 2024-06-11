"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { ImagesTypes, ProductTypes } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useCart } from "@/context/AuthContext";
import OtherPro from "@/components/OtherPro";
import MainLoader from "@/components/MainLoader";

const page = ({ params }: { params: { id: number } }) => {
  const [product, setProduct] = useState<ProductTypes | null>();
  const [images, setImages] = useState<ImagesTypes[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart, cart } = useCart();
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    if (product?.category) {
      setCategory(product?.category.toUpperCase());
    }
  }, [product]);

  const getSingleProduct = async () => {
    try {
      const res = await fetch(`/api/access-single-product?id=${params.id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setProduct(data.response);
        setImages(data.response.images);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const handleincrease = () => {
    quantity < product?.stock!
      ? setQuantity(quantity + 1)
      : setQuantity(product?.stock!);
  };

  const handledecrease = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  return (
    <>
      <section className="text-gray-600">
        <div className="lg:w-3/4 mx-auto flex lg:flex-row flex-col items-start justify-center lg:mt-0 mt-56 lg:pt-60 lg:py-7 pt-0 pb-5">
          <div className="lg:w-1/2 md:w-1/2 w-full flex flex-col justify-center items-center">
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              emulateTouch={true}
              renderArrowPrev={() => false}
              renderArrowNext={() => false}
            >
              {images?.map((data, id) => {
                return (
                  <>
                    <Image
                      key={id}
                      src={data?.url}
                      width={500}
                      height={500}
                      alt={product?.title || ""}
                    />
                  </>
                );
              })}
            </Carousel>
          </div>
          <div className="lg:w-[40vw] w-full py-3 mt-6 lg:mt-0 lg:px-10 md:px-8 px-3">
            <h1
              style={{ lineHeight: "1.2" }}
              className="lg:text-5xl font-black text-3xl capitalize text-black"
            >
              {product?.title}
            </h1>
            <h1 className="text-lg font-normal my-3">
              Tax included. <span className="underline">Shipping</span>{" "}
              calculated at checkout.
            </h1>
            <h1 className="font-medium text-xl text-black capitalize">
              {product?.category}
            </h1>
            <h1 className="text-3xl font-bold text-black mt-4">
              Rs.{product?.price}
            </h1>
            <h1 className="text-black mt-5 text-lg leading-relaxed">
              {product?.description}
            </h1>
            <div className="mt-6 flex items-start justify-start">
              {product?.stock! >= 1 ? (
                <>
                  <h1 className="rounded-md border border-green-500 lg:text-md font-semibold text-green-600 bg-green-200 p-1 px-2">
                    In Stock
                  </h1>
                </>
              ) : (
                <>
                  {product?.stock! <= 2 && product?.stock! !== 0 ? (
                    <>
                      <h1 className="rounded-md border border-red-500 lg:text-md font-semibold text-red-600 bg-red-200 p-1 px-2">
                        Low Stock
                      </h1>
                    </>
                  ) : (
                    <>
                      <h1 className="rounded-md border border-red-500 lg:text-md font-semibold text-red-600 bg-red-200 p-1 px-2">
                        Out of Stock
                      </h1>
                    </>
                  )}
                </>
              )}
            </div>
            <div
              className={`flex ${
                product?.stock! <= 0 ? "hidden" : ""
              } lg:gap-2 gap-2 justify-start items-center mt-6`}
            >
              <button
                onClick={handledecrease}
                className="bg-gray-50 border cursor-pointer py-2 border-gray-200 rounded-md px-6 lg:text-lg text-md"
              >
                -
              </button>
              <h2 className="text-black px-2 pt-1 text-lg text-center">
                {quantity}
              </h2>
              <button
                onClick={handleincrease}
                className="bg-gray-50 border cursor-pointer py-2 border-gray-200 rounded-md px-6 lg:text-lg text-md"
              >
                +
              </button>
            </div>
            <div className="flex lg:flex-row flex-col gap-3 justify-center items-center mt-7">
              <button
                disabled={
                  cart
                    .map((item) => item?.product?._id)
                    .indexOf(product?._id) !== -1 || product?.stock! <= 0
                }
                onClick={() =>
                  handleAddToCart(product as ProductTypes, quantity)
                }
                className="bg-black disabled:opacity-80 py-4 text-xl text-white rounded-lg w-full my-5"
              >
                {cart
                  .map((item) => item?.product?._id)
                  .indexOf(product?._id) !== -1
                  ? "Added to Cart"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
        {category ? (
          <OtherPro category={category} /> // Render OtherPro only when category is available
        ) : (
          <MainLoader styles="w-full h-[100vh]" />
        )}
      </section>
    </>
  );
};

export default page;
