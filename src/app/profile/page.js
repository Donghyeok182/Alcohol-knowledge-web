'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const TASTE_OPTIONS = ['부드러움', '달콤함', '쓴맛', '신맛', '감칠맛', '깔끔함'];
const FEELING_OPTIONS = ['과일향', '견과류', '바닐라', '스모키', '홉향', '스파이스', '탄닌'];
const CATEGORY_OPTIONS = ['whisky', 'sake', 'beer', 'wine'];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });
  const [preferences, setPreferences] = useState({
    taste: [],
    feeling: [],
    category: [],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/users/profile');
      const data = await response.json();

      if (!response.ok) {
        router.push('/login');
        return;
      }

      setUser(data.user);
      setFormData({
        name: data.user.name || '',
        currentPassword: '',
        password: '',
        confirmPassword: '',
      });
      setPreferences(data.user.preferences || {
        taste: [],
        feeling: [],
        category: [],
      });
      setLoading(false);
    } catch (err) {
      setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

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
    setSuccess('');
    setSaving(true);

    // 비밀번호 변경 시 이전 비밀번호 확인
    if (formData.password) {
      if (!formData.currentPassword) {
        setError('비밀번호를 변경하려면 현재 비밀번호를 입력해주세요.');
        setSaving(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('새 비밀번호가 일치하지 않습니다.');
        setSaving(false);
        return;
      }
    }

    try {
      const updateData = {
        name: formData.name,
        preferences: {
          taste: preferences.taste,
          feeling: preferences.feeling,
          category: preferences.category,
        },
      };

      // 비밀번호가 입력된 경우에만 포함
      if (formData.password) {
        updateData.currentPassword = formData.currentPassword;
        updateData.password = formData.password;
      }

      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || '정보 수정에 실패했습니다.');
        setSaving(false);
        return;
      }

      const hasPreferencesChanged = JSON.stringify(data.user.preferences) !== JSON.stringify(user?.preferences);
      
      setSuccess(
        hasPreferencesChanged 
          ? '정보가 성공적으로 수정되었습니다. 선호도가 변경되어 추천이 업데이트됩니다.' 
          : '정보가 성공적으로 수정되었습니다.'
      );
      setFormData(prev => ({ ...prev, currentPassword: '', password: '', confirmPassword: '' }));
      
      // Navigation 업데이트를 위해 이벤트 발생
      window.dispatchEvent(new CustomEvent('auth-change', { detail: { user: data.user } }));
      
      // 선호도 변경 이벤트 발생 (추천 페이지가 자동으로 새로고침되도록)
      if (hasPreferencesChanged) {
        window.dispatchEvent(new CustomEvent('preferences-updated', { detail: { preferences: data.user.preferences } }));
      }
      
      // 사용자 정보 업데이트
      setUser(data.user);
    } catch (err) {
      setError('서버 오류가 발생했습니다.');
      setSaving(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" className="btn btn-secondary">
          ← 홈으로
        </Link>
      </div>

      <h1>개인정보 수정</h1>

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

        {success && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#e8f5e9',
            color: '#2e7d32',
            borderRadius: '6px',
            marginBottom: '1rem'
          }}>
            {success}
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            이메일
          </label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem',
              backgroundColor: '#f5f5f5',
              color: '#666'
            }}
          />
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            이메일은 변경할 수 없습니다.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            이름
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
            현재 비밀번호 (비밀번호 변경 시 필요)
          </label>
          <input
            type="password"
            value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            autoComplete="current-password"
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
            새 비밀번호 (변경하지 않으려면 비워두세요)
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            minLength={6}
            autoComplete="new-password"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        {formData.password && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              새 비밀번호 확인
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              minLength={6}
              autoComplete="new-password"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
          <h3 style={{ marginBottom: '1rem' }}>선호도 수정 (맞춤 추천을 위해 선택해주세요)</h3>
          
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
          disabled={saving}
          className="btn btn-primary"
          style={{ width: '100%', marginBottom: '1rem' }}
        >
          {saving ? '저장 중...' : '정보 수정'}
        </button>
      </form>
    </div>
  );
}

