import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { loginUser } from '../../../../utils/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const result = loginUser(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7일
    });

    return NextResponse.json({ user: result.user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

