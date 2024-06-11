import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
    image?: string;
    province?: string;
    city?: string;
    address?: string;
    phone?: number;
  }
  interface Session {
    user: {
      _id?: string;
      name?: string;
      email?: string;
      role?: string;
      image?: string;
      province?: string;
      city?: string;
      address?: string;
      phone?: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
    image?: string;
    province?: string;
    city?: string;
    address?: string;
    phone?: number;
  }
}
