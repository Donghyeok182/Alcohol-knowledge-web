import Link from 'next/link';

// 정적 생성 최적화
export const revalidate = false; // 완전 정적 페이지

export default function DeepDivePage() {
  const topics = [
    {
      id: 'whisky-esterification',
      title: '위스키: 캐스크 숙성 중 에스테르화 및 아세탈 형성 메커니즘',
      description: '위스키 숙성 과정에서 발생하는 화학적 반응을 심층 분석합니다.',
      category: '위스키',
      icon: '🥃'
    },
    {
      id: 'sake-polishing',
      title: '사케: 정미율 수치(%)에 따른 깔끔함/감칠맛 변화 메커니즘',
      description: '정미율이 사케의 맛 프로필에 미치는 과학적 영향을 탐구합니다.',
      category: '사케',
      icon: '🍶'
    },
    {
      id: 'beer-hop-timing',
      title: '맥주: 홉 첨가 타이밍에 따른 아로마 화합물 보존 전략',
      description: '홉 첨가 시점이 맥주의 향미에 미치는 영향을 분석합니다.',
      category: '맥주',
      icon: '🍺'
    },
    {
      id: 'wine-tannin',
      title: '와인: 탄닌과 폴리페놀의 화학적 특성 및 숙성 메커니즘',
      description: '와인의 구조감과 복잡성을 만드는 탄닌의 과학적 원리를 탐구합니다.',
      category: '와인',
      icon: '🍷'
    }
  ];

  return (
    <div>
      <h1>심화 지식 아카이브</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
        주종별 제조 과학과 화학적 원리에 대한 상세한 문서를 탐구하세요.
      </p>

      <div className="grid grid-3">
        {topics.map((topic) => (
          <div key={topic.id} className="card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{topic.icon}</div>
            <h3>{topic.title}</h3>
            <p className="card-content">{topic.description}</p>
            <span className="badge" style={{ backgroundColor: '#3498db', color: 'white' }}>
              {topic.category}
            </span>
            <div style={{ marginTop: '1rem' }}>
              <Link href={`/deep-dive/${topic.id}`} className="btn btn-primary">
                자세히 보기
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

