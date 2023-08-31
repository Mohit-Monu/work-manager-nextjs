import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  await connectDb();

  const { userId } = params;
  try {
    await User.deleteOne({
      _id: userId,
    });
    return NextResponse.json(
      { message: "USER deleted", success: true },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "SomeThing Went Wrong", success: false },
      { status: 500 }
    );
  }
}
export async function GET(request, { params }) {
  await connectDb();

  const { userId } = params;
  try {
    const user = await User.findById(userId).select("-password")
    return NextResponse.json({ user, success: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "SomeThing Went Wrong", success: false },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params }) {
  await connectDb();

  const { userId } = params;
  const { name, password, about, profileURL } = await request.json();
  try {
    const user = await User.findById(userId).select("-password")
    user.name = name;
    user.about = about;
    user.password = password;
    user.profileURL = profileURL;
    const updatedUser=await user.save()
    return NextResponse.json({ updatedUser, success: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "SomeThing Went Wrong", success: false },
      { status: 500 }
    );
  }
}
