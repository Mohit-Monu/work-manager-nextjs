import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server";
export async function POST(){
  await connectDb();

    const response=NextResponse.json({
        message:"Logged Out!!",
        success:true
    },{status:201})
    response.cookies.set("TOKEN","",{
        expires:new Date(0)
    })
    return response
}