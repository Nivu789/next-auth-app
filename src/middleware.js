import { NextRequest, NextResponse } from "next/server";


export function middleware(request){
    const authCookie = request.cookies.get("token")
    const username = request.cookies.get("user")
    if(request.nextUrl.pathname.startsWith('/profile')){
        if(!authCookie) return NextResponse.redirect(new URL('/login',request.url))
    }

    if(request.nextUrl.pathname.startsWith('/login')||request.nextUrl.pathname.startsWith('/signup') || request.nextUrl.pathname.startsWith('/verify-email')){
        if(authCookie) return NextResponse.redirect(new URL(`/profile/${username.value}`,request.url))
    }
}