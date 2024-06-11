"use client";
import AdminWrapper from "@/app/admin/components/AdminWrapper";
import Button from "@/components/Button";
import MainLoader from "@/components/MainLoader";
import { NavCategories } from "@/data";
import { ProductTypes } from "@/types";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const [process, setProcess] = useState(false);
  const [productdetails, setProductdetails] = useState<ProductTypes | null>({
    title: "",
    description: "",
    category: "",
    stock: 0,
    price: 0,
    featured: false,
    images: [],
  });

  const getclickedData = async () => {
    try {
      const res = await fetch(`/api/access-single-product?id=${params.id}`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setProcess(true);
        setProductdetails({
          title: data.response.title,
          description: data.response.description,
          category: data.response.category,
          stock: data.response.stock,
          price: data.response.price,
          images: data.response.images,
          featured: data.response.featured,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcess(false);
    }
  };

  useEffect(() => {
    getclickedData();
  }, []);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductdetails({
      ...productdetails,
      [name]: value,
    });
  };

  const handlechangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProductdetails({
      ...productdetails,
      description: e.target.value,
    });
  };

  const handlechangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductdetails({
      ...productdetails,
      category: e.target.value,
    });
  };

  const handleChangeFeatured = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductdetails({
      ...(productdetails as any),
      featured: e.target.value,
    });
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/access-products?id=${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productdetails),
      });
      if (res.ok) {
        const data = await res.json();
        setProcess(true);
        setProductdetails({
          title: data.response.title,
          description: data.response.description,
          category: data.response.category,
          stock: data.response.stock,
          price: data.response.price,
          featured: data.response.featured,
        });
        router.push("/admin/products");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcess(false);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const res = await fetch(`/api/access-single-product?id=${params.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/products");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AdminWrapper>
        <section className="flex items-start justify-center w-full h-auto pb-20">
          <form
            onSubmit={handlesubmit}
            className="w-[30vw] mt-20 flex flex-col gap-3 bg-gray-100 p-6 rounded-lg"
          >
            {productdetails?.images?.map((data, id) => {
              return (
                <div key={id} className="w-full flex flex-col gap-4">
                  <CldImage
                    width={300}
                    height={200}
                    src={data?.public_id}
                    sizes="100vw"
                    alt="Description of my image"
                    className="w-full"
                  />
                </div>
              );
            })}
            <label htmlFor="tite" className="text-xl">
              Title
            </label>
            <input
              value={productdetails?.title}
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
              value={productdetails?.description}
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
              value={productdetails?.category}
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
            <label htmlFor="featured" className="text-xl">
              Best Sellers
            </label>
            <select
              name="featured"
              value={productdetails?.featured ? "true" : "false"}
              onChange={handleChangeFeatured}
              required
              className="bg-gray-200 rounded-lg outline-none border-none px-4 py-3 text-sm"
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
            <label htmlFor="price" className="text-xl">
              Price
            </label>
            <input
              value={productdetails?.price}
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
              value={productdetails?.stock}
              type="text"
              name="stock"
              autoComplete="off"
              onChange={handlechange}
              required
              className="bg-gray-200 rounded-lg outline-none border-none px-4 py-3 text-sm"
            />
            <Button Buttontype="submit" styles="mt-8">
              {process ? "processing ..." : "Save Product"}
            </Button>
            <Button
              Buttontype="button"
              clicked={handleDeleteProduct}
              styles="bg-red-500 text-white border border-red-500"
            >
              Delete User
            </Button>
          </form>
        </section>
      </AdminWrapper>
    </>
  );
};

export default page;
