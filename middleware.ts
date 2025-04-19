import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isVoteItemsPage = req.nextUrl.pathname.startsWith('/vote-items')
  
  if (isVoteItemsPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl.origin))
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/votes/create',
    '/vote-items/:path*',
  ],
} 