import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
  console.log('API/AUTH/LOGIN POST ');

  return NextResponse.json({}, { status: 200 });
}
