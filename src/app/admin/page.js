'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();

      if (!response.ok || data.user?.role !== 'admin') {
        router.push('/login');
        return;
      }

      setUser(data.user);
      await loadData();
    } catch (err) {
      router.push('/login');
    }
  };

  const loadData = async () => {
    try {
      const [usersRes, productsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/products'),
      ]);

      const usersData = await usersRes.json();
      const productsData = await productsRes.json();

      setUsers(usersData.users || []);
      setProducts(productsData.products || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    // 로그아웃 이벤트 발생
    window.dispatchEvent(new CustomEvent('auth-change', { detail: { user: null } }));
    router.refresh(); // Navigation을 업데이트하기 위해 서버 컴포넌트 재렌더링
    router.push('/login');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <p>로딩 중...</p>
      </div>
    );
  }

  const typeLabels = {
    whisky: '위스키',
    sake: '사케',
    beer: '맥주',
    wine: '와인',
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>관리자 대시보드</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>안녕하세요, {user?.name}님</span>
          <button onClick={handleLogout} className="btn btn-secondary">
            로그아웃
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #ddd' }}>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            backgroundColor: activeTab === 'users' ? '#1976d2' : 'transparent',
            color: activeTab === 'users' ? 'white' : '#666',
            cursor: 'pointer',
            borderBottom: activeTab === 'users' ? '2px solid #1976d2' : '2px solid transparent',
            marginBottom: '-2px'
          }}
        >
          사용자 관리
        </button>
        <button
          onClick={() => setActiveTab('products')}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            backgroundColor: activeTab === 'products' ? '#1976d2' : 'transparent',
            color: activeTab === 'products' ? 'white' : '#666',
            cursor: 'pointer',
            borderBottom: activeTab === 'products' ? '2px solid #1976d2' : '2px solid transparent',
            marginBottom: '-2px'
          }}
        >
          제품 관리
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="card">
          <h2>사용자 목록</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>이름</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>이메일</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>역할</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>선호도</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>{u.id}</td>
                    <td style={{ padding: '1rem' }}>{u.name}</td>
                    <td style={{ padding: '1rem' }}>{u.email}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: u.role === 'admin' ? '#ffebee' : '#e3f2fd',
                        color: u.role === 'admin' ? '#c62828' : '#1976d2',
                        borderRadius: '20px',
                        fontSize: '0.9rem'
                      }}>
                        {u.role === 'admin' ? '관리자' : '사용자'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {u.preferences ? (
                        <div style={{ fontSize: '0.9rem' }}>
                          {u.preferences.category && u.preferences.category.length > 0 && (
                            <div>주종: {u.preferences.category.join(', ')}</div>
                          )}
                          {u.preferences.taste && u.preferences.taste.length > 0 && (
                            <div>맛: {u.preferences.taste.join(', ')}</div>
                          )}
                        </div>
                      ) : (
                        <span style={{ color: '#999' }}>없음</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>제품 목록</h2>
            <Link href="/admin/products/new" className="btn btn-primary">
              새 제품 추가
            </Link>
          </div>

          <div className="grid grid-2" style={{ marginTop: '1rem' }}>
            {products.map(product => (
              <div key={product.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    borderRadius: '20px',
                    fontSize: '0.9rem'
                  }}>
                    {typeLabels[product.type]}
                  </span>
                  {product.level && (
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: product.level === 'beginner' ? '#e8f5e9' : '#fff3e0',
                      color: product.level === 'beginner' ? '#2e7d32' : '#e65100',
                      borderRadius: '20px',
                      fontSize: '0.9rem'
                    }}>
                      {product.level === 'beginner' ? '초보자' : '고급자'}
                    </span>
                  )}
                </div>
                <h3>{product.name}</h3>
                {product.description && (
                  <p style={{ color: '#666', marginTop: '0.5rem' }}>{product.description}</p>
                )}
                <div style={{ marginTop: '1rem' }}>
                  <Link href={`/admin/products/${product.id}`} className="btn btn-secondary" style={{ marginRight: '0.5rem' }}>
                    수정
                  </Link>
                  <Link href={`/products/${product.id}`} className="btn btn-secondary">
                    보기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

