"use client";
import AdminWrapper from "../../components/AdminWrapper";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { NavCategories } from "@/data";
import { ImagesTypes, ProductTypes } from "@/types";
import Button from "@/components/Button";

const page = () => {
  const router = useRouter();
  const [Image, setImage] = useState<ImagesTypes[]>([]);
  const [process, setProcess] = useState(false);

  const [product, setProduct] = useState<ProductTypes>({
    title: "",
    description: "",
    category: NavCategories[0],
    stock: 0,
    price: 0,
    images: [],
  });

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handlechangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct({
      ...product,
      category: e.target.value,
    });
  };

  const handlechangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProduct({
      ...product,
      description: e.target.value,
    });
  };

  const imageUpload = (file: any) => {
    try {
      setImage([
        ...Image,
        {
          public_id: file.info?.public_id, // Optional chaining for safety
          url: file.info?.url, // Optional chaining for safety
        },
      ]);
      const imageData = {
        public_id: file.info.public_id, // Assuming these properties exist
        url: file.info.secure_url,
      };

      if (product) {
        setProduct({
          ...product,
          images: [...(product.images as ImagesTypes[]), imageData],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/access-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        setProcess(true);
        router.push("/admin/products");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcess(false);
    }
  };

  return (
    <>
      <AdminWrapper>
        <section className="flex items-start justify-center w-full h-[100vh]">
          <form
            onSubmit={handlesubmit}
            className="w-[30vw] mt-20 h-auto flex flex-col gap-3 bg-gray-100 p-6 rounded-lg"
          >
            <CldUploadButton
              uploadPreset="t6sswtif"
              onUpload={(file) => imageUpload(file)}
              className="bg-indigo-500 text-white px-3 py-2 rounded-md my-2 self-center hover:bg-indigo-400 transition"
            >
              Upload Image
            </CldUploadButton>
            {Image?.map((data, id) => {
              return (
                <div key={id} className="w-full flex flex-col gap-4">
                  <CldImage
                    width={300}
                    height={200}
                    src={data?.public_id}
                    sizes="100vw"
                    alt="Description of my image"
                  />
                </div>
              );
            })}
            <label htmlFor="tite" className="text-xl">
              Title
            </label>
            <input
              type="text"
              name="title"
              autoComplete="off"
              onChange={handlechange}
              required
              className="bg-gray-200 rounded-lg outline-none border-none px-4 py-3 text-sm"
            />
            <label htmlFor="description" className="text-xl">
              Description
            </label>
            <textarea
              name="description"
              autoComplete="off"
              onChange={handlechangeTextArea}
              required
              className="bg-gray-200 rounded-lg outline-none border-none px-4 py-3 h-[20vh] text-sm"
            />
            <label htmlFor="category" className="text-xl">
              Category
            </label>
            <select
              name="category"
              onChange={handlechangeSelect}
              required
              className="bg-gray-200 rounded-lg outline-none border-none px-4 py-3 text-sm"
            >
              {NavCategories?.map((data, id) => {
                return (
                  <>
                    <option key={id} value={data}>
                      {data}
                    </option>
                  </>
                );
              })}
            </select>
            <label htmlFor="price" className="text-xl">
              Price
            </label>
            <input
              type="text"
              name="price"
              autoComplete="off"
              onChange={handlechange}
              required
              className="bg-gray-200 rounded-lg outline-none border-none px-4 py-3 text-sm"
            />
            <label htmlFor="stock" className="text-xl">
              Stock
            </label>
            <input
              type="text"
              name="stock"
              autoComplete="off"
              onChange={handlechange}
              required
              className="bg-gray-200 rounded-lg outline-none border-none px-4 py-3 text-sm"
            />
            <Button styles="w-full mt-8 py-[16px]" Buttontype="submit">
              {process ? "processing ..." : "Publish Product"}
            </Button>
          </form>
        </section>
      </AdminWrapper>
    </>
  );
};

export default page;
