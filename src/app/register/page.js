'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const TASTE_OPTIONS = ['부드러움', '달콤함', '쓴맛', '신맛', '감칠맛', '깔끔함'];
const FEELING_OPTIONS = ['과일향', '견과류', '바닐라', '스모키', '홉향', '스파이스', '탄닌'];
const CATEGORY_OPTIONS = ['whisky', 'sake', 'beer', 'wine'];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [preferences, setPreferences] = useState({
    taste: [],
    feeling: [],
    category: [],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePreference = (type, value) => {
    setPreferences(prev => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          preferences: {
            taste: preferences.taste,
            feeling: preferences.feeling,
            category: preferences.category,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || '회원가입에 실패했습니다.');
        setLoading(false);
        return;
      }

      // 회원가입 성공 후 로그인 페이지로
      router.push('/login?registered=true');
    } catch (err) {
      setError('서버 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>회원가입</h1>
      
      <form onSubmit={handleSubmit} className="card" autoComplete="off">
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
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            이름
          </label>
          <input
            id="name"
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
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            minLength={6}
            autoComplete="new-password"
            data-form-type="other"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
          <h3 style={{ marginBottom: '1rem' }}>선호도 선택 (맞춤 추천을 위해 선택해주세요)</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              좋아하는 맛
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {TASTE_OPTIONS.map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => togglePreference('taste', option)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: `2px solid ${preferences.taste.includes(option) ? '#1976d2' : '#ddd'}`,
                    backgroundColor: preferences.taste.includes(option) ? '#e3f2fd' : 'white',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              좋아하는 느낌/향
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {FEELING_OPTIONS.map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => togglePreference('feeling', option)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: `2px solid ${preferences.feeling.includes(option) ? '#1976d2' : '#ddd'}`,
                    backgroundColor: preferences.feeling.includes(option) ? '#e3f2fd' : 'white',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              관심 있는 주종
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {CATEGORY_OPTIONS.map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => togglePreference('category', option)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: `2px solid ${preferences.category.includes(option) ? '#1976d2' : '#ddd'}`,
                    backgroundColor: preferences.category.includes(option) ? '#e3f2fd' : 'white',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {option === 'whisky' ? '위스키' : option === 'sake' ? '사케' : option === 'beer' ? '맥주' : '와인'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: '100%', marginBottom: '1rem' }}
        >
          {loading ? '가입 중...' : '회원가입'}
        </button>

        <div style={{ textAlign: 'center' }}>
          <Link href="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
            이미 계정이 있으신가요? 로그인
          </Link>
        </div>
      </form>
    </div>
  );
}

