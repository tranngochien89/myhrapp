
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST() {
  const serialized = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1, // Expire the cookie immediately
    path: '/',
  });

  const response = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL));
  response.headers.set('Set-Cookie', serialized);
  return response;
}
