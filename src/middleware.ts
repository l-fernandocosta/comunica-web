import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from "next/server";
import { env } from "./env.mjs";
import AuthorizationCookies from "./lib/utils/authorization-cookie.handler";

export function middleware(request: NextRequest){
  const token = request.cookies.get(AuthorizationCookies.AuthorizationCookieName)

  if(!token){
    return NextResponse.redirect(new URL('/', request.url))
  }
  try {
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    jwtVerify(token.value, secret )
    return NextResponse.next();
  }catch(e){
    console.error(e)
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: [
    '/home/:path*', 
    '/swapi/:path*',
  ]
}