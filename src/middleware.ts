import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth/login`, {
    headers: {
      Cookie: `session=${session?.value}`
    }
  });

  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ['/posts/create', '/posts/update', '/profile/update'] };
