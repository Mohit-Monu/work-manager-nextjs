"use client";

import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import { deleteTask, getAllTask } from "@/services/taskServices";
import { GiCrossedBones } from "react-icons/Gi";

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const UserCtx = useContext(UserContext).state.user;
  async function GetData() {
    try {
      setIsLoading(true);
      const tasks = await getAllTask(UserCtx._id);
      setTasks(tasks.tasks);
      setIsLoading(false);
    } catch (err) {}
  }
  useEffect(() => {
    GetData();
  }, [UserCtx]);

  const getStatusColor = (status) => {
    if (status === "completed") {
      return "bg-green-300";
    } else if (status === "pending") {
      return "bg-yellow-300";
    }
    return "bg-gray-300";
  };

  async function deleteTaskHandler(e) {
    const id = e.target.parentNode.value;
    try {
      const res = await deleteTask(id);
      GetData();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex items-center justify-center bg-gray-100 mt-5 mb-5">
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50 ${
          isLoading ? "block" : "hidden"
        }`}
      >
        <div className="border-4 border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
      <div className="w-2/3">
        <h1 className="text-3xl font-semibold">Your Tasks</h1>
        <p className="mb-4">Total Tasks: {tasks.length}</p>
        <div className="space-y-4">
          {tasks.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-md ${getStatusColor(item.status)}`}
            >
              <h3 className="text-lg font-semibold">
                Title: {item.title}
                <button
                  value={item._id}
                  style={{ float: "right" }}
                  onClick={deleteTaskHandler}
                >
                  <GiCrossedBones />
                </button>
              </h3>
              <p className="text-gray-600">Content: {item.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Status: {item.status}
              </p>
              <p className="text-sm text-gray-500">Author: {UserCtx.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowTasks;
