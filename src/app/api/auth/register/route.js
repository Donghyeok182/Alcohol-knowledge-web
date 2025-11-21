import { NextResponse } from 'next/server';
import { registerUser } from '../../../../utils/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const result = registerUser(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ user: result.user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

