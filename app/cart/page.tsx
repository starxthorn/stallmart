"use client";
import Button from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/context/AuthContext";
import { ProductTypes } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";

const page = () => {
  const { cart, handleremovecart, total } = useCart();
  const session = useSession();
  const router = useRouter();

  const handleCheck = () => {
    if (session.status === "unauthenticated" && !session.data) {
      // hanldePlaceOrder();
      router.push("/auth/sign-in");
    }
  };

  if (cart.length === 0) {
    router.push("/");
  }

  return (
    <>
      <section className="container mx-auto lg:mt-60 mt-56 mb-56">
        <div className="lg:px-0 px-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price x Qty</TableHead>
                <TableHead className="pr-4">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart &&
                cart.map((item, id) => {
                  return (
                    <TableRow key={id}>
                      <TableCell className="text-xl capitalize">
                        <Image
                          alt={item?.product?.title!}
                          width={140}
                          height={140}
                          className="rounded-lg"
                          src={item?.product?.images?.[0]?.url!}
                        />
                      </TableCell>
                      <TableCell className="lg:text-xl capitalize">
                        {item?.product?.title}
                      </TableCell>
                      <TableCell className="lg:text-xl capitalize">
                        {item?.quantity} x {item?.product?.price}
                      </TableCell>
                      <TableCell className="lg:text-xl capitalize">
                        <FaRegTrashAlt
                          onClick={() =>
                            handleremovecart(item?.product as ProductTypes)
                          }
                          className="hover:text-red-500 text-gray-500 transition-all text-lg cursor-pointer"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <div className="w-full flex items-center justify-end ">
          <div className="mt-10 lg:mx-0 mx-5 bg-gray-50 w-full lg:w-[20vw] p-6 lg:rounded-lg">
            <h1 className="text-black text-2xl font-black capitalize">
              SubTotal: <span className="self-end">{total}</span>
            </h1>
            <h1 className="mt-5">
              Tax included. <span className="underline">Shipping </span>
              calculated at checkout.
            </h1>
            <Link href={"/shipping-address-details"}>
              <Button clicked={handleCheck} styles="w-full mt-5">
                CHECKOUT (COD)
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
