'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: 'whisky',
    name: '',
    description: '',
    level: 'beginner',
    chemical_note: '',
    // 위스키
    cask_type: '',
    age: '',
    // 사케
    polishing_rate: '',
    rice_type: '',
    serving_temp_cold: '',
    serving_temp_room: '',
    serving_temp_warm: '',
    // 맥주
    ibu: '',
    hop_type: '',
    fermentation_method: '',
    // 와인
    grape_variety: '',
    region: '',
    vintage: '',
    sweetness_level: '',
    body: '',
    // 공통
    price: '',
    price_range: '',
    storage_method: '',
    tags: [],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const TAG_OPTIONS = ['부드러움', '달콤함', '쓴맛', '신맛', '감칠맛', '깔끔함', '과일향', '견과류', '바닐라', '스모키', '홉향', '스파이스', '탄닌', '복잡함', '입문자', '고급자'];

  const toggleTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const productData = {
        type: formData.type,
        name: formData.name,
        description: formData.description || null,
        level: formData.level,
        chemical_note: formData.chemical_note || null,
        tags: formData.tags,
      };

      // 타입별 필드 추가
      if (formData.type === 'whisky') {
        productData.cask_type = formData.cask_type || null;
        productData.age = formData.age ? parseInt(formData.age) : null;
      } else if (formData.type === 'sake') {
        productData.polishing_rate = formData.polishing_rate ? parseInt(formData.polishing_rate) : null;
        productData.rice_type = formData.rice_type || null;
        if (formData.serving_temp_cold || formData.serving_temp_room || formData.serving_temp_warm) {
          productData.serving_temp_range = {
            cold: formData.serving_temp_cold || '',
            room: formData.serving_temp_room || '',
            warm: formData.serving_temp_warm || ''
          };
        }
      } else if (formData.type === 'beer') {
        productData.ibu = formData.ibu ? parseInt(formData.ibu) : null;
        productData.hop_type = formData.hop_type || null;
        productData.fermentation_method = formData.fermentation_method || null;
      } else if (formData.type === 'wine') {
        productData.grape_variety = formData.grape_variety || null;
        productData.region = formData.region || null;
        productData.vintage = formData.vintage ? parseInt(formData.vintage) : null;
        productData.sweetness_level = formData.sweetness_level || null;
        productData.body = formData.body || null;
      }

      // 공통 필드
      productData.price = formData.price ? parseInt(formData.price) : null;
      productData.price_range = formData.price_range || null;
      productData.storage_method = formData.storage_method || null;

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || '제품 생성에 실패했습니다.');
        setLoading(false);
        return;
      }

      router.push('/admin');
    } catch (err) {
      setError('서버 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin" className="btn btn-secondary">
          ← 관리자 대시보드로
        </Link>
      </div>

      <h1>새 제품 추가</h1>

      <form onSubmit={handleSubmit} className="card" style={{ marginTop: '2rem' }}>
        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '6px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            주종 *
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          >
            <option value="whisky">위스키</option>
            <option value="sake">사케</option>
            <option value="beer">맥주</option>
            <option value="wine">와인</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            제품명 *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            설명
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            레벨
          </label>
          <select
            value={formData.level || ''}
            onChange={(e) => setFormData({ ...formData, level: e.target.value || null })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          >
            <option value="">선택 안함</option>
            <option value="beginner">초보자</option>
            <option value="advanced">고급자</option>
          </select>
        </div>

        {formData.type === 'whisky' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                캐스크 타입
              </label>
              <input
                type="text"
                value={formData.cask_type}
                onChange={(e) => setFormData({ ...formData, cask_type: e.target.value })}
                placeholder="예: 셰리, 버번, 미즈나라"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                숙성 연수
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>
          </>
        )}

        {formData.type === 'sake' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                정미율 (%)
              </label>
              <input
                type="number"
                value={formData.polishing_rate}
                onChange={(e) => setFormData({ ...formData, polishing_rate: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                쌀 품종
              </label>
              <input
                type="text"
                value={formData.rice_type}
                onChange={(e) => setFormData({ ...formData, rice_type: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                추천 온도
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.9rem' }}>차갑게</label>
                  <input
                    type="text"
                    value={formData.serving_temp_cold}
                    onChange={(e) => setFormData({ ...formData, serving_temp_cold: e.target.value })}
                    placeholder="5-10°C"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.9rem' }}>상온</label>
                  <input
                    type="text"
                    value={formData.serving_temp_room}
                    onChange={(e) => setFormData({ ...formData, serving_temp_room: e.target.value })}
                    placeholder="15-20°C"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.9rem' }}>따뜻하게</label>
                  <input
                    type="text"
                    value={formData.serving_temp_warm}
                    onChange={(e) => setFormData({ ...formData, serving_temp_warm: e.target.value })}
                    placeholder="40-45°C"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {formData.type === 'beer' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                IBU
              </label>
              <input
                type="number"
                value={formData.ibu}
                onChange={(e) => setFormData({ ...formData, ibu: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                홉 타입
              </label>
              <input
                type="text"
                value={formData.hop_type}
                onChange={(e) => setFormData({ ...formData, hop_type: e.target.value })}
                placeholder="예: 시트라, 캐스케이드"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                발효 방식
              </label>
              <input
                type="text"
                value={formData.fermentation_method}
                onChange={(e) => setFormData({ ...formData, fermentation_method: e.target.value })}
                placeholder="예: 에일, 라거"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>
          </>
        )}

        {formData.type === 'wine' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                포도 품종
              </label>
              <input
                type="text"
                value={formData.grape_variety}
                onChange={(e) => setFormData({ ...formData, grape_variety: e.target.value })}
                placeholder="예: 카베르네 소비뇽"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                지역
              </label>
              <input
                type="text"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="예: 보르도"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                빈티지
              </label>
              <input
                type="number"
                value={formData.vintage}
                onChange={(e) => setFormData({ ...formData, vintage: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                당도
              </label>
              <input
                type="text"
                value={formData.sweetness_level}
                onChange={(e) => setFormData({ ...formData, sweetness_level: e.target.value })}
                placeholder="예: 드라이, 미디엄, 스위트"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                바디
              </label>
              <input
                type="text"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                placeholder="예: 라이트, 미디엄, 풀바디"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>
          </>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            화학적 특성
          </label>
          <textarea
            value={formData.chemical_note}
            onChange={(e) => setFormData({ ...formData, chemical_note: e.target.value })}
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            가격 (원)
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="예: 45000"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            가격 범위
          </label>
          <input
            type="text"
            value={formData.price_range}
            onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
            placeholder="예: 40,000-50,000원"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            보관 방법
          </label>
          <textarea
            value={formData.storage_method}
            onChange={(e) => setFormData({ ...formData, storage_method: e.target.value })}
            rows={3}
            placeholder="제품의 보관 방법 및 주의사항"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            태그
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {TAG_OPTIONS.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '0.5rem 1rem',
                  border: `2px solid ${formData.tags.includes(tag) ? '#1976d2' : '#ddd'}`,
                  backgroundColor: formData.tags.includes(tag) ? '#e3f2fd' : 'white',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          {loading ? '생성 중...' : '제품 생성'}
        </button>
      </form>
    </div>
  );
}

