import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"


//yes
export async function POST(request) {
  await connectDb();

  const { name, email, password, about, profileURL } = await request.json();
  const user = new User({
    name,
    email,
    password,
    about,
    profileURL,
  });
  try {
    const alreadyuser=await User.findOne({email:email})
    if(alreadyuser){
      const response = NextResponse.json(
        { message: "Email already registered", success: false },
        { status: 401 }
      );
      return response;
    }
    user.password=await bcrypt.hash(user.password,parseInt(process.env.SALT_ROUNDS))
    const createdUser = await user.save();
    const response = NextResponse.json(createdUser, { status: 201 });
    return response;
  } catch (err) {
    const response = NextResponse.json(
      { message: "Failed to create user", success: false },
      { status: 500 }
    );
    return response;
  }
}

export async function GET(request) {
  await connectDb();

  let users = [];
  try {
    users = await User.find().select("-password")
    return NextResponse.json(users, { status: 201 });
  } catch (err) {
    const response = NextResponse.json(
      { message: "Failed to create user", success: false },
      { status: 500 }
    );
    return response;
  }
}
