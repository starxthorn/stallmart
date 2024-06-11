"use client";
import AdminWrapper from "@/app/admin/components/AdminWrapper";
import ProductCard from "@/components/ProductCard";
import { OrderTypes } from "@/types";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import MainLoader from "@/components/MainLoader";

const page = ({ params }: { params: { id: number } }) => {
  const [singleOrder, setsingleOrder] = useState<OrderTypes | null>({});
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const getSingleOrder = async () => {
    try {
      const res = await fetch(`/api/access-single-order?id=${params?.id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setsingleOrder(data.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleOrder();
  }, []);

  const handleCheck = () => {
    setsingleOrder({
      ...singleOrder,
      isCompleted: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/access-single-order?id=${params?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(singleOrder),
      });
      if (res.ok) {
        router.push("/admin/orders");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteOrder = async () => {
    setLoader(true);
    try {
      const res = await fetch(`/api/access-single-order?id=${params?.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/orders");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return loader ? (
    <MainLoader styles="w-full h-[100vh]" />
  ) : (
    <>
      <AdminWrapper>
        <section className="w-full">
          <div className="flex items-center justify-end mt-3">
            <div className="flex items-center justify-center">
              <form
                onSubmit={handleSubmit}
                className="flex items-center justify-center"
              >
                <button
                  type="submit"
                  onClick={handleCheck}
                  className={`${
                    singleOrder?.isCompleted
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  } border py-[9px] mr-4 rounded-lg px-4`}
                >
                  {singleOrder?.isCompleted ? "Pending" : "Complete"}
                </button>
              </form>
              <Button
                styles="bg-red-500 text-white border-none"
                clicked={handleDeleteOrder}
              >
                Delete
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Province</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Total Payment</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{singleOrder?.user?.name}</TableCell>
                <TableCell>{singleOrder?.user?.email}</TableCell>
                <TableCell className="uppercase">
                  {singleOrder?.user?.province}
                </TableCell>
                <TableCell>{singleOrder?.user?.city}</TableCell>
                <TableCell>{singleOrder?.user?.address}</TableCell>
                <TableCell>{singleOrder?.user?.phone}</TableCell>
                <TableCell>{singleOrder?.totalPrice}</TableCell>
                <TableCell>
                  <FaRegTrashAlt
                    onClick={handleDeleteOrder}
                    className="hover:text-red-500 text-gray-500 transition-all text-lg cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex items-center justify-start flex-wrap gap-6 mt-10">
            {singleOrder?.products?.map((item, id) => {
              return (
                <>
                  <div className="relative w-[17vw]">
                    <ProductCard
                      route="/admin/products/edit-single-product/"
                      clicked={item?.productId?._id}
                      image={item?.productId?.images?.[0]?.url!}
                      title={item?.productId?.title}
                      key={id}
                      price={item?.productId?.price}
                      category={item?.productId?.category}
                    />
                    <div className="absolute p-1 text-xs px-2 border-4 border-gray-50 rounded-full bg-yellow-500 text-white -top-2 -right-5">
                      {item.quantityOfPro}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </AdminWrapper>
    </>
  );
};

export default page;
