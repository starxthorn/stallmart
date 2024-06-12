"use client";
import React, { useEffect, useState } from "react";
import AdminWrapper from "../components/AdminWrapper";
import Button from "@/components/Button";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductTypes } from "@/types";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import MainLoader from "@/components/MainLoader";
import { toast } from "react-toastify";

const page = () => {
  const [Allproducts, setAllproducts] = useState<ProductTypes[]>([]);
  const [filterproducts, setFilterProducts] = useState<ProductTypes[]>([]);
  const [loader, setLoader] = useState(false);

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

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDeleteProduct = async (id: any) => {
    toast("Product Deleted");
    setLoader(true);
    try {
      await fetch(`/api/access-single-product?id=${id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      let filteredProducts = Allproducts?.filter((data) => {
        return (
          data?.title
            ?.toLowerCase()
            .trim()
            .includes(value.toLowerCase().trim()) ||
          data?.description
            ?.toLowerCase()
            .trim()
            .includes(value.toLowerCase().trim())
        );
      });
      setFilterProducts(filteredProducts as any);
    }
    if (value === "") {
      setFilterProducts([]);
    }
  };

  return loader ? (
    <MainLoader styles="w-full h-[100vh]" />
  ) : (
    <>
      <AdminWrapper>
        <div className="flex items-center justify-between mt-3">
          <h1 className="font-black lg:text-2xl text-xl">Our Products</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center justify-between border border-gray-300 rounded-lg w-[50vw] backdrop-blur-sm pl-4 py-3">
              <input
                type="text"
                onChange={handleFilterProducts}
                placeholder="search products"
                className="border-none placeholder:text-gray-600 placeholder:font-light h-full w-full outline-none"
              />
              <CiSearch className="mr-5 text-2xl" />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Link href={"/admin/products/add-new-product"}>
                <Button styles="py-[13px]">Add New</Button>
              </Link>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Products</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterproducts.length <= 0
              ? Allproducts.map((data, id) => {
                  return (
                    <>
                      <TableRow key={id}>
                        <TableCell>
                          <Image
                            alt="user image"
                            width={80}
                            height={80}
                            className="rounded-lg"
                            src={data?.images?.[0]?.url || ""}
                          />
                        </TableCell>
                        <TableCell>
                          <Link
                            onClick={() => setLoader(true)}
                            href={`/admin/products/edit-single-product/${data._id}`}
                            className="hover:underline transition-all"
                          >
                            {data._id}
                          </Link>
                        </TableCell>
                        <TableCell>{data.title}</TableCell>
                        <TableCell className="uppercase">
                          {data.category}
                        </TableCell>
                        <TableCell>{data.price}</TableCell>
                        <TableCell
                          className={
                            data.stock === 0 ? "text-red-500" : "text-black"
                          }
                        >
                          {data.stock}
                        </TableCell>
                        <TableCell
                          className={`${
                            data.featured && "text-green-500"
                          } capitalize`}
                        >
                          {data.featured ? "yes" : "no"}
                        </TableCell>
                        <TableCell>
                          <FaRegTrashAlt
                            onClick={() => handleDeleteProduct(data?._id)}
                            className="hover:text-red-500 text-gray-500 transition-all text-lg cursor-pointer"
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  );
                }).reverse()
              : filterproducts
                  .map((data, id) => {
                    return (
                      <>
                        <TableRow key={id}>
                          <TableCell>
                            <Image
                              alt="user image"
                              width={80}
                              height={80}
                              className="rounded-lg"
                              src={data?.images?.[0]?.url || ""}
                            />
                          </TableCell>
                          <TableCell>
                            <Link
                              href={`/admin/products/edit-single-product/${data._id}`}
                              className="hover:underline transition-all"
                            >
                              {data._id}
                            </Link>
                          </TableCell>
                          <TableCell>{data.title}</TableCell>
                          <TableCell className="uppercase">
                            {data.category}
                          </TableCell>
                          <TableCell>{data.price}</TableCell>
                          <TableCell
                            className={
                              data.stock === 0 ? "text-red-500" : "text-black"
                            }
                          >
                            {data.stock}
                          </TableCell>
                          <TableCell>
                            <FaRegTrashAlt
                              onClick={() => handleDeleteProduct(data?._id)}
                              className="hover:text-red-500 text-gray-500 transition-all text-lg cursor-pointer"
                            />
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })
                  .reverse()}
          </TableBody>
        </Table>
      </AdminWrapper>
    </>
  );
};

export default page;
