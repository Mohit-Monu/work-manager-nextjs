import { Task } from "@/models/task";
import { connectDb } from "@/helper/db";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDb();

  try {
    let tasks = await Task.find()
    return NextResponse.json(tasks, { status: 201 });
  } catch (err) {
    const response = NextResponse.json(
      { message: "Failed to get tasks", success: false },
      { status: 500 }
    );
    return response;
  }
}
export async function POST(request) {
  await connectDb();

  const { title, content,status} = await request.json();
  const authToken = request.cookies.get("TOKEN")?.value;
  const data = jwt.verify(authToken, process.env.TOKEN);
  const task = new Task({
    title,
    content,
    userId:data._id,
    status
  });
  try {
    const createdTask = await task.save();
    const response = NextResponse.json(createdTask, { status: 201 });
    return response;
  } catch (err) {
    console.log(err)
    const response = NextResponse.json(
      { message: "Failed to create task", success: false },
      { status: 500 }
    );
    return response;
  }
}
