"use client";
import { loginUser } from "@/services/userServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import UserContext from "../context/userContext";

const LogInComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const UserCTX=useContext(UserContext)
  const router=useRouter()
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  async function LogInHandler(e) {
    e.preventDefault();
    if (data.email.trim() === "") {
      toast.warning("Enter Valid email", {
        position: "top-center",
      });
      return;
    }
    if (data.password.trim() === "") {
      toast.warning("Enter Valid password", {
        position: "top-center",
      });
      return;
    }
    try {
      const res = await loginUser(data);
      setIsLoading(true)
      UserCTX.state.refresh()
      router.push("/profile/user")
      setIsLoading(false)
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
    }
  }
  return (
    <div className="bg-slate-200 p-8" style={{ minHeight: "70vh" }}>
            <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50 ${
          isLoading ? "block" : "hidden"
        }`}
      >
        <div className="border-4 border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
      <div className="grid grid-cols-12 justify-center  pt-4 pb-4">
        <div className="col-span-6 col-start-4 p-5 bg-white rounded shadow-md w-full">
          <h1 className="text-3xl mb-5 text-center font-semibold">Log In</h1>
          <form onSubmit={LogInHandler}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 px-3 py-2 w-full border rounded-md focus:ring focus:ring-blue-300"
                required
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
                value={data.email}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password*
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 px-3 py-2 w-full border rounded-md focus:ring focus:ring-blue-300"
                required
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                value={data.password}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInComponent;
