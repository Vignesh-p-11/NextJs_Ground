import { getDataFromToken } from "@/helper/extractDataFromToken";

import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";

import {connectDB} from "@/db/config";

connectDB();

export async function GET(request:NextRequest)
{
    try {
        const userId= await getDataFromToken(request);
        if(!userId)
        {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }
        const user=await User.findById({ _id: userId }).select("-password");
        if(!user)
        {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }
        return new Response(JSON.stringify({"data":user }), { status: 200 });
    }
    catch (error) {
        console.error("Error fetching user data:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}