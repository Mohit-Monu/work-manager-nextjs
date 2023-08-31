import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    const authToken = request.cookies.get("TOKEN")?.value;
    const data = jwt.verify(authToken, process.env.TOKEN);
    await connectDb()
    const user = await User.findById(data._id).select("-password");
    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Something Went Wrong" },
      { status: 500 }
    );
  }
}
