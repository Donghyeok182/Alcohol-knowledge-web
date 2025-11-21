'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RecommendationPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuthAndLoadRecommendations();
  }, []);

  const checkAuthAndLoadRecommendations = async () => {
    try {
      // 사용자 정보 확인
      const authResponse = await fetch('/api/auth/me');
      if (!authResponse.ok) {
        router.push('/login');
        return;
      }

      const authData = await authResponse.json();
      setUser(authData.user);

      // 선호도 기반 추천 가져오기
      const recResponse = await fetch('/api/recommendations');
      if (!recResponse.ok) {
        // 선호도가 없거나 추천이 없으면 전체 제품 표시
        const productsResponse = await fetch('/api/products');
        const productsData = await productsResponse.json();
        setProducts(productsData.products || []);
        setLoading(false);
        return;
      }

      const recData = await recResponse.json();
      setProducts(recData.products || []);
      setLoading(false);
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  const typeLabels = {
    whisky: { emoji: '🥃', label: '위스키' },
    sake: { emoji: '🍶', label: '사케' },
    beer: { emoji: '🍺', label: '맥주' },
    wine: { emoji: '🍷', label: '와인' },
  };

  const getProductSubtitle = (product) => {
    if (product.type === 'whisky') {
      return `${product.cask_type || ''} ${product.cask_type ? '캐스크' : ''}${product.age ? ` · ${product.age}년` : ''}`;
    }
    if (product.type === 'sake') {
      return `정미율 ${product.polishing_rate}%${product.rice_type ? ` · ${product.rice_type}` : ''}`;
    }
    if (product.type === 'beer') {
      return `IBU ${product.ibu || 'N/A'}${product.fermentation_method ? ` · ${product.fermentation_method}` : ''}`;
    }
    if (product.type === 'wine') {
      return `${product.grape_variety || ''}${product.region ? ` · ${product.region}` : ''}${product.vintage ? ` · ${product.vintage}` : ''}`;
    }
    return '';
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <p>추천 제품을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <p style={{ color: '#c62828' }}>{error}</p>
      </div>
    );
  }

  // 타입별로 그룹화
  const productsByType = products.reduce((acc, product) => {
    if (!acc[product.type]) {
      acc[product.type] = [];
    }
    acc[product.type].push(product);
    return acc;
  }, {});

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1>맞춤형 추천</h1>
        {user && (
          <p style={{ fontSize: '1.1rem', color: '#666', marginTop: '0.5rem' }}>
            안녕하세요, {user.name}님! 선호도에 맞춘 제품을 추천해드립니다.
          </p>
        )}
      </div>

      {products.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            추천할 제품이 없습니다.
          </p>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            회원가입 시 선호도를 선택하시면 더 정확한 추천을 받으실 수 있습니다.
          </p>
          <Link href="/register" className="btn btn-primary">
            회원가입하기
          </Link>
        </div>
      ) : (
        <>
          {Object.entries(productsByType).map(([type, typeProducts]) => {
            const typeInfo = typeLabels[type];
            return (
              <div key={type} style={{ marginTop: '3rem' }}>
                <h2>
                  {typeInfo.emoji} {typeInfo.label} 추천
                </h2>
                <div className="grid grid-2" style={{ marginTop: '1rem' }}>
                  {typeProducts.map((product) => (
                    <div key={product.id} className="card" style={{ cursor: 'pointer' }} onClick={() => router.push(`/products/${product.id}`)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                          borderRadius: '20px',
                          fontSize: '0.9rem'
                        }}>
                          {typeInfo.label}
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
                      <h3 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                      <p className="card-subtitle" style={{ marginBottom: '0.5rem' }}>
                        {getProductSubtitle(product)}
                      </p>
                      {product.price_range && (
                        <p style={{ 
                          fontSize: '1.1rem', 
                          fontWeight: 'bold', 
                          color: '#1976d2',
                          marginBottom: '0.5rem'
                        }}>
                          💰 {product.price_range}
                        </p>
                      )}
                      {product.description && (
                        <p className="card-content" style={{ marginBottom: '1rem' }}>
                          {product.description}
                        </p>
                      )}
                      {product.tags && product.tags.length > 0 && (
                        <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {product.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              style={{
                                padding: '0.25rem 0.75rem',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '20px',
                                fontSize: '0.85rem'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div style={{ marginTop: '1rem' }}>
                        <Link 
                          href={`/products/${product.id}`}
                          className="btn btn-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          상세 정보 보기 →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}

      <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
        <h2>💡 더 많은 정보가 필요하신가요?</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <Link href="/deep-dive" className="btn btn-secondary">
            심화 지식 아카이브
          </Link>
          <Link href="/utility" className="btn btn-secondary">
            실용적 음용 가이드
          </Link>
          <Link href="/standard" className="btn btn-secondary">
            글로벌 표준 및 용어집
          </Link>
        </div>
      </div>
    </div>
  );
}

