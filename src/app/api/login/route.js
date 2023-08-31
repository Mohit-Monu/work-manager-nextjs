import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

export async function POST(request) {
  await connectDb();
  const { password, email } = await request.json();
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const response = NextResponse.json(
        { message: "Email not registered", success: false },
        { status: 404 }
      );
      return response;
    }
    const matched = await bcrypt.compare( password,user.password);
    if (!matched) {
      const response = NextResponse.json(
        { message: "Wrong Password", success: false },
        { status: 401 }
      );
      return response;
    }
    const token=jwt.sign({
      _id: user._id,
      name:user.name
    },process.env.TOKEN);
    const response = NextResponse.json(token, { status: 201 });
    response.cookies.set("TOKEN",token,{
        expiresIn:"1d",
        httpOnly:true
    })
    return response;
  } catch (err) {
    const response = NextResponse.json(
      { message: "somethinng went wrong", success: false },
      { status: 500 }
    );
    return response;
  }
}
