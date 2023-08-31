import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const authToken = request.cookies.get("TOKEN")?.value;
  // if (request.nextUrl.pathname === "/api/login") {
  //   return
  // }
  const authpath =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";
  if (authpath && authToken) {
    return NextResponse.redirect(new URL("/profile/user", request.url));
  }
  if (!authToken && !authpath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/show-tasks",
    "/add-task",
    "/profile/:path*",
    // "/api/:path*",
  ],
};
