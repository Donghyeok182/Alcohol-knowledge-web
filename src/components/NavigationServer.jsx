import { cookies } from 'next/headers';
import { verifyToken } from '../utils/auth';
import NavigationClient from './NavigationClient';

export default async function NavigationServer() {
  let user = null;
  
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (token) {
      const authResult = verifyToken(token);
      if (authResult.valid && authResult.user) {
        user = authResult.user;
      }
    }
  } catch (err) {
    // 인증 실패는 무시
  }

  return <NavigationClient initialUser={user} />;
}

