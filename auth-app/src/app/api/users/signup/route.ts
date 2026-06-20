import {connectDB} from "@/db/config";

import User from "@/models/userModel";

import {NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    const existingUser = await User.findOne({ email });
    if(existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

   const salt=await bcrypt.genSalt(10);
   const hashedPassword=await bcrypt.hash(password, salt);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    const savedUser=await newUser.save();
    console.log("User created:", savedUser);
    return NextResponse.json({ message: "User created successfully "+savedUser.toJSON() }, { status: 201 });
  }
    catch (error) {
        console.error(`Error: ${(error as Error).message}`);
        return NextResponse.json({ message: "Server error /n" + (error as { response?: { data?: string } }).response?.data }, { status: 500 });
    }
}