"use client";

import React, { useState } from "react";
import addtaskSvg from "../../assets/addtask.svg";
import Image from "next/image";
import { addTask } from "@/services/taskServices";
import { toast } from "react-toastify";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "",
    userId: "64eed99c4b1d5db50c48d837",
  });

  async function handleaddTask(e) {
    e.preventDefault();
    try {
      const res = await addTask(task);
      toast.success("Task Added !!",{
        position:"top-center"
      })
      setTask({
        title: "",
        content: "",
        status: "",
      })
    } catch (err) {
      toast.error("Task faild to Add !!",{
        position:"top-center"
      })
    }
  }
  return (
    <div className="grid grid-cols-12 justify-center bg-slate-200 pt-4 pb-4 ">
      <div className="col-span-6 col-start-4 p-5 shadow-md bg-white rounded border-dotted- w-full">
        <div className=" mb-4">
          <Image
            src={addtaskSvg}
            style={{ height: "200px" }}
            alt="addtasksvg"
            priority
          ></Image>
        </div>
        <h1 className="text-3xl mb-5 text-center font-semibold">Add your Task here!!</h1>
        <form onSubmit={handleaddTask}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="title"
              name="floating_title"
              id="floating_title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => {
                setTask({ ...task, title: e.target.value });
              }}
              value={task.title}
              required
            />
            <label
              htmlFor="floating_title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <textarea
              type="Content"
              name="floating_content"
              id="floating_content"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => {
                setTask({ ...task, content: e.target.value });
              }}
              value={task.content}
              required
            />
            <label
              htmlFor="floating_content"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Content
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <select
              name="status"
              id="floatingstatus"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => {
                setTask({ ...task, status: e.target.value });
              }}
              value={task.status}
              required
            >
              <option value="" disabled>
                -- Select--
              </option>
              <option value="pending">pending</option>
              <option value="completed">completed</option>
            </select>
            <label
              htmlFor="floatingstatus"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Status
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <button className="ml-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddTask;
