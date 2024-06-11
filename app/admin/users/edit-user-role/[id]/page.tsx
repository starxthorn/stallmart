"use client";
import React, { useEffect, useState } from "react";
import AdminWrapper from "../../../components/AdminWrapper";
import { UserType } from "@/types";
import MainLoader from "@/components/MainLoader";
import { useSession } from "next-auth/react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const page = ({ params }: { params: { id: number } }) => {
  const session = useSession();
  const router = useRouter();
  const [process, setProcess] = useState(false);
  const [user, setUser] = useState<UserType | null>({
    _id: "",
    avatar: "",
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const getUser = async () => {
    try {
      const res = await fetch(`/api/access-single-user?id=${params.id}`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setProcess(true);
        setUser({
          _id: data.response._id,
          avatar: data.response.avatar,
          name: data.response.name,
          email: data.response.email,
          password: data.response.password,
          role: data.response.role || "admin",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcess(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/access-single-user?id=${params.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/users");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeRole = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...(user as any),
      [name]: value,
    });
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/access-single-user?id=${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.ok) {
        setProcess(true);
        router.push("/admin/users");
        setUser({
          _id: data.response._id,
          avatar: data.response.avatar,
          name: data.response.name,
          email: data.response.email,
          password: data.response.password,
          role: data.response.role,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcess(false);
    }
  };

  return (
    <>
      <AdminWrapper>
        <section className="w-full h-[100vh] relative flex items-start mt-32 justify-center">
          <form
            key={user?._id}
            onSubmit={handlesubmit}
            className="w-[28vw] rounded-lg bg-gray-100 h-[63vh] flex flex-col justify-start items-center px-8 pb-6 pt-7"
          >
            {session.status === "loading" || process ? (
              <MainLoader styles="w-full h-full" />
            ) : (
              <>
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-28 h-28 rounded-full"
                />
                <h1 className="mt-10 bg-gray-200 rounded-lg py-3 pl-4 pr-4 w-[25vw] my-2">
                  {user?._id}
                </h1>
                <h1 className="bg-gray-200 rounded-lg py-3 pl-4 pr-4 w-[25vw] my-2">
                  {user?.name}
                </h1>
                <h1 className="bg-gray-200 rounded-lg py-3 pl-4 pr-4 w-[25vw] my-2">
                  {user?.email}
                </h1>
                <select
                  onChange={handleChangeRole}
                  name="role"
                  id="role"
                  className="w-[25vw] py-3 px-4 my-2 bg-gray-200 rounded-lg"
                >
                  <option value={"admin"}>Admin</option>
                  <option value={"user"}>User</option>
                </select>
                <Button styles="mt-6 py-[14px] w-full" Buttontype="submit">
                  {process ? "processing ..." : "Save User"}
                </Button>
                <Button
                  Buttontype="button"
                  clicked={handleDeleteUser}
                  styles="bg-red-500 text-white border-none mt-3 py-[14px] w-full"
                >
                  Delete User
                </Button>
              </>
            )}
          </form>
        </section>
      </AdminWrapper>
    </>
  );
};

export default page;
