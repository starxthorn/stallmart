"use client";
import { NavCategories } from "@/data";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

const SideMenu = (props: any) => {
  return (
    <>
      <section className="overflow-scroll animation h-full z-50 lg:w-96 w-full bg-white border border-r-gray-300 fixed left-0 top-0 bottom-0">
        <div className="w-full flex justify-end items-end">
          <IoClose
            className="text-4xl mt-7 mr-7 cursor-pointer"
            onClick={() => props.ismenu(false)}
          />
        </div>
        <div className="items-center justify-center mt-10 uppercase flex flex-col gap-6 text-xl mb-5">
          {NavCategories?.map((data, id) => {
            return (
              <>
                <Link
                  href={`/category-filter/${data}`}
                  key={id}
                  onClick={() => props.ismenu(false)}
                >
                  <h1 className="text-gray-600 transition hover:text-yellow-600 text-sm font-medium">
                    {data}
                  </h1>
                </Link>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default SideMenu;
