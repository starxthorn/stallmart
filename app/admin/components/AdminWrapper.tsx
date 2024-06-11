"use client";
import { useSession } from "next-auth/react";
import AdminSidebar from "./AdminSidebar";
import { redirect, usePathname } from "next/navigation";

const AdminWrapper = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const pathname = usePathname();

  if (session.data?.user.role === "user" && pathname.startsWith("/admin")) {
    redirect("/");
  }

  if (session.status === "unauthenticated") {
    redirect("/");
  }

  return (
    <>
      <main className="w-full lg:flex md:flex items-start justify-center hidden">
        <AdminSidebar />
        <section className="w-full h-[100vh] overflow-y-scroll p-4 px-6">
          {children}
        </section>
      </main>
    </>
  );
};

export default AdminWrapper;
