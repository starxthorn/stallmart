"use client";
import { useEffect, useState } from "react";
import AdminWrapper from "../components/AdminWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderTypes } from "@/types";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import MainLoader from "@/components/MainLoader";

const page = () => {
  const [orders, setOrders] = useState<OrderTypes[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderTypes[]>([]);
  const [loader, setLoader] = useState(false);
  const [value, setvalue] = useState("all");
  const router = useRouter();

  const getAllOrders = async () => {
    try {
      const res = await fetch(`/api/access-orders`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleDeleteOrder = async (_id?: number) => {
    try {
      const res = await fetch(`/api/access-single-order?id=${_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/orders");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const TextValue = e.target.value;
    setvalue(TextValue);
    let filtered = orders.filter((item) => {
      if (TextValue === "completed") {
        return item.isCompleted === true;
      }
      if (TextValue === "pending") {
        return item.isCompleted === false;
      }
    });
    console.log(filtered);
    setFilteredOrders(filtered);
  };

  return loader ? (
    <MainLoader styles="w-full h-[100vh]" />
  ) : (
    <>
      <AdminWrapper>
        <div className="flex items-center justify-between mt-3">
          <h1 className="font-black text-3xl">Our Orders</h1>
          <div>
            <select
              onChange={handleFilter}
              name="filter"
              className="w-[10vw] border border-gray-200 rounded-lg py-4 pl-3"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {value === "all"
              ? orders.map((data, id) => {
                  return (
                    <>
                      <TableRow key={id}>
                        <TableCell>
                          <Link
                            onClick={() => setLoader(true)}
                            href={`/admin/orders/edit-single-order/${data._id}`}
                            className="hover:underline transition-all"
                          >
                            {data._id}
                          </Link>
                        </TableCell>
                        <TableCell>{data?.user?.name}</TableCell>
                        <TableCell className="uppercase">
                          {data?.totalPrice}
                        </TableCell>{" "}
                        <TableCell
                          className={`${
                            data.isCompleted && "text-green-500"
                          } capitalize`}
                        >
                          {data.isCompleted ? "yes" : "no"}
                        </TableCell>
                        <TableCell>
                          <FaRegTrashAlt
                            onClick={() => handleDeleteOrder(data?._id)}
                            className="hover:text-red-500 text-gray-500 transition-all text-lg cursor-pointer"
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })
              : filteredOrders.map((data, id) => {
                  return (
                    <>
                      <TableRow key={id}>
                        <TableCell>
                          <Link
                            onClick={() => setLoader(true)}
                            href={`/admin/orders/edit-single-order/${data._id}`}
                            className="hover:underline transition-all"
                          >
                            {data._id}
                          </Link>
                        </TableCell>
                        <TableCell>{data?.user?.name}</TableCell>
                        <TableCell className="uppercase">
                          {data?.totalPrice}
                        </TableCell>{" "}
                        <TableCell
                          className={`${
                            data.isCompleted && "text-green-500"
                          } capitalize`}
                        >
                          {data.isCompleted ? "yes" : "no"}
                        </TableCell>
                        <TableCell>
                          <FaRegTrashAlt
                            onClick={() => handleDeleteOrder(data?._id)}
                            className="hover:text-red-500 text-gray-500 transition-all text-lg cursor-pointer"
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
          </TableBody>
        </Table>
      </AdminWrapper>
    </>
  );
};

export default page;
