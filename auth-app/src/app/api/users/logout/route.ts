import { NextResponse } from "next/server";

export async function GET() {
    try{
        const response = NextResponse.json({ message: "Logout successful" ,success:true,});   
        response.cookies.set("token", "", { httpOnly: true, secure: true, sameSite: "strict", maxAge: 0 });
        return response;
    }
    catch(error)
    {
        console.error("Logout error:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}