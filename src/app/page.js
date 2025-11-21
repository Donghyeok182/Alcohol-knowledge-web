import Link from 'next/link';

// 홈페이지는 완전 정적 생성
export const revalidate = false;

export default function Home() {
  return (
    <div className="text-center">
      <h1>통합 주류 지식 허브에 오신 것을 환영합니다</h1>
      <p style={{ fontSize: '1.2rem', marginTop: '1rem', marginBottom: '2rem' }}>
        위스키, 사케, 맥주, 와인의 심층적인 과학적 지식을 탐구하세요
      </p>
      
      <div className="grid grid-2" style={{ marginTop: '3rem' }}>
        <div className="card">
          <h2>🔬 심화 지식 아카이브</h2>
          <p>주종별 제조 과학과 화학적 원리에 대한 상세한 문서를 확인하세요.</p>
          <Link href="/deep-dive" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            탐구하기
          </Link>
        </div>
        
        <div className="card">
          <h2>🎯 맞춤형 추천</h2>
          <p>당신의 레벨에 맞는 주류를 추천받고 개인화된 여정을 시작하세요.</p>
          <Link href="/recommendation" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            시작하기
          </Link>
        </div>
        
        <div className="card">
          <h2>🍽️ 실용적 음용 가이드</h2>
          <p>서빙 팁, 페어링 전략 등 실전에서 바로 활용할 수 있는 정보를 얻으세요.</p>
          <Link href="/utility" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            알아보기
          </Link>
        </div>
        
        <div className="card">
          <h2>📚 글로벌 표준 및 용어</h2>
          <p>주류 전문 용어와 표준을 학습하고 커뮤니티와 소통하세요.</p>
          <Link href="/standard" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            학습하기
          </Link>
        </div>
      </div>
    </div>
  );
}

