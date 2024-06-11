"use client";
import React, { useEffect, useState } from "react";
import AdminWrapper from "../components/AdminWrapper";
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
import { UserType } from "@/types";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import MainLoader from "@/components/MainLoader";

const page = () => {
  const [Allusers, setAllusers] = useState<UserType[]>([]);
  const [filterusers, setfilterusers] = useState<UserType[]>([]);
  const [loader, setLoader] = useState(false);

  const getAllUsers = async () => {
    try {
      const res = await fetch("/api/access-users", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setAllusers(data.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDeleteProduct = async (id: any) => {
    setLoader(true);
    try {
      await fetch(`/api/access-single-user?id=${id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      let filteredUsers = Allusers?.filter((data) => {
        return (
          data?.email
            ?.toLowerCase()
            .trim()
            .includes(value.toLowerCase().trim()) ||
          data?.name
            ?.toLowerCase()
            .trim()
            .includes(value.toLowerCase().trim()) ||
          data?._id?.toLowerCase().trim().includes(value.toLowerCase().trim())
        );
      });
      setfilterusers(filteredUsers as any);
    }
    if (value === "") {
      setfilterusers([]);
    }
  };

  return loader ? (
    <MainLoader styles="w-full h-[100vh]" />
  ) : (
    <>
      <AdminWrapper>
        <div className="flex items-center justify-between mt-3">
          <h1 className="font-black text-3xl">Our Users</h1>
          <div className="flex items-center justify-between border border-gray-300 rounded-lg w-[25rem] backdrop-blur-sm pl-4 py-3">
            <input
              type="text"
              onChange={handleFilterUsers}
              placeholder="search users"
              className="border-none placeholder:text-gray-600 placeholder:font-light rounded-lg h-full w-full outline-none"
            />
            <CiSearch className="mr-5 text-2xl" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Users</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterusers.length <= 0
              ? Allusers.map((data, id) => {
                  return (
                    <>
                      <TableRow key={id}>
                        <TableCell>
                          <Image
                            alt="user image"
                            width={40}
                            height={40}
                            className="rounded-full"
                            src={data?.avatar!}
                          />
                        </TableCell>
                        <TableCell>
                          <Link
                            onClick={() => setLoader(true)}
                            href={`/admin/users/edit-user-role/${data._id}`}
                            className="hover:underline transition-all"
                          >
                            {data._id}
                          </Link>
                        </TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.email}</TableCell>
                        <TableCell
                          className={
                            data.role === "admin"
                              ? "text-green-500 capitalize"
                              : "text-black capitalize"
                          }
                        >
                          {data.role}
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
              : filterusers
                  .map((data, id) => {
                    return (
                      <>
                        <TableRow key={id}>
                          <TableCell>
                            <Image
                              alt="user image"
                              width={40}
                              height={40}
                              className="rounded-full"
                              src={data?.avatar!}
                            />
                          </TableCell>
                          <TableCell>
                            <Link
                              href={`/admin/users/edit-user-role/${data._id}`}
                              className="hover:underline transition-all"
                            >
                              {data._id}
                            </Link>
                          </TableCell>
                          <TableCell>{data.name}</TableCell>
                          <TableCell>{data.email}</TableCell>
                          <TableCell
                            className={
                              data.role === "admin"
                                ? "text-green-500 capitalize"
                                : "text-black capitalize"
                            }
                          >
                            {data.role}
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
