import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export default clerkMiddleware(async (auth, request) => {
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.next()
  }

  await auth.protect()

  return NextResponse.next()
})

export const config = {
  matcher: ["/", "/check", "/((?!auth|.*\\.).*)"],
}
