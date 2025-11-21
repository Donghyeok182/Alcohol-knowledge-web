import Link from 'next/link';
import { getGlossaryList } from '../../utils/data';

// 정적 생성 최적화를 위한 메타데이터
export const revalidate = 3600; // 1시간마다 재검증

export default function StandardPage() {
  const glossary = getGlossaryList();
  
  // 카테고리별로 그룹화
  const groupedGlossary = glossary.reduce((acc, term) => {
    if (!acc[term.category]) {
      acc[term.category] = [];
    }
    acc[term.category].push(term);
    return acc;
  }, {});

  const categories = Object.keys(groupedGlossary);

  return (
    <div>
      <h1>글로벌 표준 및 용어집</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        주류 전문 용어와 표준을 학습하고 이해하세요.
      </p>

      {categories.map((category) => (
        <div key={category} style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            paddingBottom: '0.5rem', 
            borderBottom: '3px solid #3498db',
            marginBottom: '1.5rem'
          }}>
            {category}
          </h2>
          
          <div className="grid grid-2">
            {groupedGlossary[category].map((term, index) => (
              <div key={index} className="card">
                <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>
                  {term.term}
                </h3>
                <p className="card-content" style={{ lineHeight: '1.8' }}>
                  {term.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="card" style={{ backgroundColor: '#fff3e0', marginTop: '3rem' }}>
        <h2>📚 추가 학습 자료</h2>
        <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
          더 깊이 있는 학습을 원하시나요? <Link href="/deep-dive" style={{ color: '#3498db', fontWeight: 'bold' }}>심화 지식 아카이브</Link>에서 
          각 용어의 과학적 배경과 메커니즘을 자세히 알아보실 수 있습니다.
        </p>
      </div>
    </div>
  );
}

