"use client";
import { ButtonProps } from "@/types";
import React from "react";

const Button = ({
  Buttontype,
  styles,
  clicked,
  children,
}: ButtonProps) => {
  return (
    <>
      <button
        type={Buttontype || "button"}
        onClick={clicked}
        className={`px-6 py-[9px] hover:opacity-80 border border-black transition-all bg-black text-white rounded-md ${styles}`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
