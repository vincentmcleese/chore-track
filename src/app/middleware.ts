// src/app/_middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

// Middleware function to check if the user is authenticated
export async function middleware(request: NextRequest) {
  console.log("Middleware triggered");
  const session = await auth();
  console.log("Session:", session);

  if (!session?.user) {
    console.log("User not authenticated, redirecting to login");
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("User authenticated, allowing request to proceed");
  return NextResponse.next();
}
