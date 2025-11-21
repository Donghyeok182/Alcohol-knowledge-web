import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '../../../../utils/auth';
import { updateUser, getUserById } from '../../../../utils/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: '인증되지 않았습니다.' },
        { status: 401 }
      );
    }

    const authResult = verifyToken(token);
    if (!authResult.valid || !authResult.user) {
      return NextResponse.json(
        { error: '인증되지 않았습니다.' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user: authResult.user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: '인증되지 않았습니다.' },
        { status: 401 }
      );
    }

    const authResult = verifyToken(token);
    if (!authResult.valid || !authResult.user) {
      return NextResponse.json(
        { error: '인증되지 않았습니다.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const updates = {};

    // 이름 수정
    if (body.name) {
      updates.name = body.name;
    }

    // 비밀번호 변경
    if (body.password) {
      if (!body.currentPassword) {
        return NextResponse.json(
          { error: '현재 비밀번호를 입력해주세요.' },
          { status: 400 }
        );
      }

      // 현재 비밀번호 확인
      const user = getUserById(authResult.user.id);
      if (!user) {
        return NextResponse.json(
          { error: '사용자를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      const isCurrentPasswordValid = bcrypt.compareSync(body.currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return NextResponse.json(
          { error: '현재 비밀번호가 올바르지 않습니다.' },
          { status: 400 }
        );
      }

      if (body.password.length < 6) {
        return NextResponse.json(
          { error: '비밀번호는 최소 6자 이상이어야 합니다.' },
          { status: 400 }
        );
      }
      updates.password = bcrypt.hashSync(body.password, 10);
    }

    // 선호도 수정
    if (body.preferences) {
      updates.preferences = body.preferences;
    }

    const updatedUser = updateUser(authResult.user.id, updates);

    if (!updatedUser) {
      return NextResponse.json(
        { error: '사용자 정보 수정에 실패했습니다.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        preferences: updatedUser.preferences
      }
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

