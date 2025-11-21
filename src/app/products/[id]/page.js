'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = Array.isArray(params.id) ? params.id[0] : params.id;
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || '제품을 찾을 수 없습니다.');
          setLoading(false);
          return;
        }

        setProduct(data.product);
        setLoading(false);
      } catch (err) {
        setError('서버 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    const productId = Array.isArray(params.id) ? params.id[0] : params.id;
    if (productId) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <p style={{ color: '#c62828', marginBottom: '1rem' }}>{error || '제품을 찾을 수 없습니다.'}</p>
        <Link href="/recommendation" className="btn btn-primary">
          추천 페이지로 돌아가기
        </Link>
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
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
      <button
        onClick={() => router.back()}
        className="btn btn-secondary"
        style={{ marginBottom: '2rem' }}
      >
        ← 뒤로가기
      </button>

      <div className="card">
        <div style={{ marginBottom: '1rem' }}>
          <span style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            backgroundColor: '#e3f2fd',
            color: '#1976d2',
            borderRadius: '20px',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}>
            {typeLabels[product.type]}
          </span>
          {product.level && (
            <span style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              backgroundColor: product.level === 'beginner' ? '#e8f5e9' : '#fff3e0',
              color: product.level === 'beginner' ? '#2e7d32' : '#e65100',
              borderRadius: '20px',
              fontSize: '0.9rem',
              marginLeft: '0.5rem'
            }}>
              {product.level === 'beginner' ? '초보자' : '고급자'}
            </span>
          )}
        </div>

        <h1 style={{ marginBottom: '1rem' }}>{product.name}</h1>
        
        {product.price_range && (
          <div style={{ 
            fontSize: '1.3rem', 
            fontWeight: 'bold', 
            color: '#1976d2',
            marginBottom: '1rem',
            padding: '0.75rem',
            backgroundColor: '#e3f2fd',
            borderRadius: '6px',
            display: 'inline-block'
          }}>
            💰 가격: {product.price_range}
          </div>
        )}
        
        {product.description && (
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
            {product.description}
          </p>
        )}

        <div style={{ marginTop: '2rem' }}>
          <h2>상세 정보</h2>
          
          {product.type === 'whisky' && (
            <div style={{ marginTop: '1rem' }}>
              {product.cask_type && (
                <p><strong>캐스크 타입:</strong> {product.cask_type}</p>
              )}
              {product.age && (
                <p><strong>숙성 연수:</strong> {product.age}년</p>
              )}
            </div>
          )}

          {product.type === 'sake' && (
            <div style={{ marginTop: '1rem' }}>
              {product.polishing_rate && (
                <p><strong>정미율:</strong> {product.polishing_rate}%</p>
              )}
              {product.rice_type && (
                <p><strong>쌀 품종:</strong> {product.rice_type}</p>
              )}
              {product.serving_temp_range && (
                <div style={{ marginTop: '0.5rem' }}>
                  <strong>추천 온도:</strong>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                    <li>차갑게: {product.serving_temp_range.cold}</li>
                    <li>상온: {product.serving_temp_range.room}</li>
                    <li>따뜻하게: {product.serving_temp_range.warm}</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {product.type === 'beer' && (
            <div style={{ marginTop: '1rem' }}>
              {product.ibu !== null && (
                <p><strong>IBU:</strong> {product.ibu}</p>
              )}
              {product.hop_type && (
                <p><strong>홉 타입:</strong> {product.hop_type}</p>
              )}
              {product.fermentation_method && (
                <p><strong>발효 방식:</strong> {product.fermentation_method}</p>
              )}
            </div>
          )}

          {product.type === 'wine' && (
            <div style={{ marginTop: '1rem' }}>
              {product.grape_variety && (
                <p><strong>포도 품종:</strong> {product.grape_variety}</p>
              )}
              {product.region && (
                <p><strong>지역:</strong> {product.region}</p>
              )}
              {product.vintage && (
                <p><strong>빈티지:</strong> {product.vintage}</p>
              )}
              {product.sweetness_level && (
                <p><strong>당도:</strong> {product.sweetness_level}</p>
              )}
              {product.body && (
                <p><strong>바디:</strong> {product.body}</p>
              )}
            </div>
          )}

          {product.tags && product.tags.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <strong>태그:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {product.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '20px',
                      fontSize: '0.9rem'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {product.storage_method && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#fff3e0', borderRadius: '6px' }}>
            <h2>📦 보관 방법</h2>
            <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>{product.storage_method}</p>
          </div>
        )}

        {product.chemical_note && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
            <h2>화학적 특성</h2>
            <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>{product.chemical_note}</p>
          </div>
        )}
      </div>
    </div>
  );
}

