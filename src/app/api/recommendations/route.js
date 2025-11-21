import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getRecommendedProducts } from '../../../utils/products';
import { verifyToken } from '../../../utils/auth';

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

    const products = getRecommendedProducts(authResult.user.preferences || {});
    
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

