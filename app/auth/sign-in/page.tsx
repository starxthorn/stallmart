"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const page = () => {
  const [showPassword, setShowPassword] = useState("show");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const session = useSession();
  const pathname = usePathname();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  if (session.status !== "loading") {
    if (session.data && pathname.startsWith("/auth")) {
      redirect("/");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoader(true);
      const res = await fetch("/api/user-signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message);
      }
      if (res.ok) {
        toast("Logged In");
        await signIn("credentials", {
          email: user?.email,
          password: user?.password,
          redirect: true,
          callbackUrl: "/",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const handleShowAndHidePassword = () => {
    setShowPassword("hide");
    if (showPassword === "hide") {
      setShowPassword("show");
    }
  };

  return (
    <>
      <section className="w-full h-[100vh] flex items-center lg:pb-0 pb-60 lg:pt-0 pt-20 justify-center">
        <form
          className="lg:border w-96 lg:min-w-[25vw] lg:border-gray-300 rounded-md flex flex-col lg:p-4 p-2 lg:px-7"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold mt-2">Sign In to Stall Mart</h1>
          <h1 className={message.length >= 1 ? "my-4 text-red-500" : ""}>
            {message}
          </h1>
          <label
            htmlFor="email"
            className={message.length >= 1 ? "mt-0" : "mt-8"}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="off"
            onChange={handleChange}
            placeholder="m@example.com"
            className="border border-gray-300 rounded-lg pl-3 py-2 text-sm my-2 outline-none"
          />
          <label htmlFor="password">Password</label>
          <div className="border flex items-center justify-between border-gray-300 rounded-lg pl-3 py-2 text-sm my-2">
            <input
              type={showPassword === "hide" ? "text" : "password"}
              name="password"
              required
              autoComplete="off"
              onChange={handleChange}
              className="outline-none border-none bg-none w-full"
            />
            <h1
              className="pr-5 cursor-pointer"
              onClick={handleShowAndHidePassword}
            >
              {user.password.length >= 1 && showPassword}
            </h1>
          </div>
          <button
            type="submit"
            className={`mt-7 hover:opacity-70 py-4 bg-black w-full rounded-md text-white ${
              loader && "opacity-70"
            }`}
          >
            {loader ? "processing..." : "Sign In"}
          </button>
          <p className="my-4 text-gray-500 text-center">OR</p>
          <button
            type="button"
            onClick={() =>
              signIn("google", { redirect: true, callbackUrl: "/" })
            }
            className="text-black flex items-center justify-center gap-5 bg-gray-100 py-4 border-none hover:opacity-100"
          >
            <FcGoogle className="text-xl" />
            <h1 className="text-black">Continue with Google</h1>
          </button>
          <h1 className="mt-6 text-center">
            Not have any account?{" "}
            <Link href={"/auth/sign-up"} className="text-indigo-500 underline">
              create new
            </Link>
          </h1>
        </form>
      </section>
    </>
  );
};

export default page;
