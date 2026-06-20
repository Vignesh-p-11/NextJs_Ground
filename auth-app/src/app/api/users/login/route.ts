import mongoose from "mongoose";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/helper/TokenGenerator";


export async function POST(request:NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
        return new Response(JSON.stringify({ message: "Email and password are required" }), { status: 400 });
    }

    const user=await User.findOne({email});
    if(!user)
    {
        return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    
    }
    
    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect)
    {
        return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    const tokenData={
        id:user._id,
        email:user.email,
        username:user.username
    }
    const token=generateToken(tokenData);

    const response=NextResponse.json({ message: "Login successful", token });
    response.cookies.set("token", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 3600 });
    return response;
}
catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
}
}