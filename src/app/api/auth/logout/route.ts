import { deleteSession } from '@/shared/firebase-admin';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { APIResponse } from '@/typing/API';

export async function POST() {
  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie)
    return NextResponse.json<APIResponse<string>>(
      { success: false, error: 'Session not found.' },
      { status: 400 }
    );

  cookies().delete('session');
  await deleteSession(sessionCookie);

  return NextResponse.json<APIResponse<string>>({
    success: true,
    data: 'Signed out successfully.'
  });
}
