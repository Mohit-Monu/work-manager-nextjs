import { connectDb } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  await connectDb();

  const { taskId } = params;
  try {
    let task = await Task.findById(taskId);
    return NextResponse.json(task, { status: 201 });
  } catch (err) {
    const response = NextResponse.json(
      { message: "Failed to get tasks", success: false },
      { status: 500 }
    );
    return response;
  }
}

export async function PUT(request, { params }) {
  await connectDb();

  const { taskId } = params;
  try {
    const { title, content, status } = await request.json();
    const task = await Task.findById(taskId);
    task.title = title;
    task.content = content;
    task.status = status;
    const updatedTask = await task.save();
    const response = NextResponse.json(updatedTask, { status: 201 });
    return response;
  } catch (err) {
    const response = NextResponse.json(
      { message: "Failed to create task", success: false },
      { status: 500 }
    );
    return response;
  }
}

export async function DELETE(request, { params }) {
  await connectDb();

  const { taskid } = params;
  try {
    await Task.deleteOne({
      _id: taskid,
    });
    return NextResponse.json(
      { message: "Task deleted", success: true },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "SomeThing Went Wrong", success: false },
      { status: 500 }
    );
  }
}
