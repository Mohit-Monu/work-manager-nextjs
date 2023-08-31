"use client";

import { addUser } from "@/services/userServices";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignUpComponent = () => {
  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
    about: "",
    profileUrl: "",
  });

  async function SignUpHandler(e) {
    e.preventDefault()
    if(data.name.trim()==="" ){
      toast.warning("Enter Valid Name",{
        position:"top-center"
      })
      return
    }
    if(data.email.trim()==="" ){
      toast.warning("Enter Valid email",{
        position:"top-center"
      })
      return
    }
    if(data.password.trim().length<=5 ){
      toast.warning("Enter password min 6 length",{
        position:"top-center"
      })
      return
    }
    try{
      await addUser(data)
      toast.success("User Created !!",{
        position:"top-center"
      })
      setData({
        name:"",
        password:"",
        email:"",
        about:""
      })
    }catch(err){
      toast.error(err.message,{
        position:"top-center"
      })
    }
  }
  return (
    <div className="grid grid-cols-12 justify-center bg-slate-200 pt-4 pb-4 ">
      <div className="col-span-6 col-start-4 p-5 bg-white rounded shadow-md w-full">
        <h1 className="text-3xl mb-5 text-center font-semibold">Sign Up</h1>
        <form onSubmit={SignUpHandler}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 px-3 py-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
              value={data.name}
            />
          </div>
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
          <div className="mb-4">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              About
            </label>
            <textarea
              type="text"
              id="about"
              name="about"
              className="mt-1 px-3 py-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              onChange={(e) => {
                setData({ ...data, about: e.target.value });
              }}
              value={data.about}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpComponent;
