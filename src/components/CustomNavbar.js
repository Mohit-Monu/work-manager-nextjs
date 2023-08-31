"use client";
import UserContext from "@/app/context/userContext";
import Link from "next/link";
// rafce
import React, { useContext } from "react";
import { logoutUser } from "@/services/userServices";
import { useRouter } from "next/navigation";
const CustomNavbar = () => {
  const UserCTX = useContext(UserContext).state;
  const router = useRouter();
  async function LogoutHandler() {
    await logoutUser();
    UserCTX.logout();
    router.push("/login");
  }
  return (
    <nav className=" bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 h-12 py-2 px-3 flex justify-between items-center text-white">
      <div className="brand">
        <h1 className="text-2xl font-semibold">
          <a href="#!">Work Manager</a>
        </h1>
      </div>
      <div>
        {UserCTX.user.name && (
          <ul className="flex space-x-5">
            <li>
              <Link href="/" className="hover:text-blue-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/add-task" className="hover:text-blue-200">
                Add Task
              </Link>
            </li>
            <li>
              <Link href="/show-tasks" className="hover:text-blue-200">
                Show Tasks
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div>
        {!UserCTX.user.name ? (
          <ul className="flex space-x-5">
            <li>
              <Link href="/login">Log-In</Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-blue-200">
                Sign-Up
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-5">
            <li>
              <Link href="#!">{UserCTX.user.name}</Link>
            </li>
            <li>
              <Link
                href="#!"
                onClick={LogoutHandler}
                className="hover:text-blue-200"
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
export default CustomNavbar;