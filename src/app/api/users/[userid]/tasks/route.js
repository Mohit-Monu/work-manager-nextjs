import { connectDb } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectDb();

  const { userid } = params;
  try {
    const tasks = await Task.find({userId:userid})
    return NextResponse.json({ tasks, success: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "SomeThing Went Wrong", success: false },
      { status: 500 }
    );
  }
}
