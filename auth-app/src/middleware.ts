import { match } from "assert";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path=request.nextUrl.pathname;
  const token=request.cookies.get("token")?.value;

  const isPublicPath=path==="/login" || path==="/signup";

  if(!token && !isPublicPath)
  {
    return NextResponse.redirect(new URL("/login",request.nextUrl));
  }
  else if(token && isPublicPath)
  {
    return NextResponse.redirect(new URL("/profile",request.nextUrl));
  }
}

export const config={
    matcher:[
        "/",
        "/login",
        "/signup",
        "/profile",
        "/profile/:path*",
    ]
}