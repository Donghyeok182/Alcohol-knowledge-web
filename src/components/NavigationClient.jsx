'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NavigationClient({ initialUser }) {
  const router = useRouter();
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/me', {
        cache: 'no-store', // 항상 최신 정보를 가져오기 위해 캐시 비활성화
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // 인증 실패 시 사용자 정보 제거
        setUser(null);
      }
    } catch (err) {
      // 인증 실패는 무시
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // initialUser가 변경되면 state 업데이트
    setUser(initialUser);
    
    // 초기 사용자 정보가 없으면 클라이언트에서 확인
    if (!initialUser) {
      checkAuth();
    }
  }, [initialUser, checkAuth]);

  // 로그인/로그아웃 이벤트 감지 및 사용자 정보 업데이트
  useEffect(() => {
    const handleAuthChange = (event) => {
      // 로그인 성공 시 즉시 사용자 정보 업데이트
      if (event.detail?.user) {
        setUser(event.detail.user);
      } else {
        checkAuth();
      }
    };

    const handleFocus = () => {
      checkAuth();
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [checkAuth]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    // 로그아웃 이벤트 발생
    window.dispatchEvent(new CustomEvent('auth-change', { detail: { user: null } }));
    router.refresh(); // NavigationServer를 다시 렌더링하여 사용자 정보 제거
    router.push('/');
  };

  return (
    <nav>
      <div className="nav-container">
        <Link href="/" className="logo">
          🥃 주류 지식 허브
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/deep-dive">심화 지식</Link>
          </li>
          <li>
            <Link href="/recommendation">맞춤형 추천</Link>
          </li>
          <li>
            <Link href="/utility">음용 가이드</Link>
          </li>
          <li>
            <Link href="/standard">표준 및 용어</Link>
          </li>
          {!loading && (
            <>
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <li>
                      <Link href="/admin">관리자</Link>
                    </li>
                  )}
                  <li>
                    <Link href="/profile" style={{ color: '#666', textDecoration: 'none' }}>
                      {user.name}님
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#1976d2',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      로그아웃
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">로그인</Link>
                  </li>
                  <li>
                    <Link href="/register">회원가입</Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

