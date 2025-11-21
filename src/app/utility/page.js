import ServingTemperature from '../../components/ServingTemperature';

// 정적 생성 최적화
export const revalidate = false;

export default function UtilityPage() {
  return (
    <div>
      <h1>실용적 음용 가이드</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        서빙 팁, 페어링 전략 등 실전에서 바로 활용할 수 있는 정보를 제공합니다.
      </p>

      <ServingTemperature />

      <div style={{ marginTop: '3rem' }}>
        <div className="card">
          <h2>🥃 위스키 서빙 가이드</h2>
          
          <h3 style={{ marginTop: '1.5rem' }}>온도</h3>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>네이티브 (Neat)</strong>: 실온에서 그대로 마시기. 향미를 최대한 느낄 수 있습니다.</li>
            <li><strong>온 더 록스 (On the Rocks)</strong>: 얼음과 함께. 입문자에게 부드러운 맛을 제공합니다.</li>
            <li><strong>스플래시 (Splash)</strong>: 소량의 물 추가. 알코올 향을 부드럽게 하며 향미를 부각시킵니다.</li>
          </ul>

          <h3 style={{ marginTop: '1.5rem' }}>글라스 선택</h3>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>글렌케어런 글라스</strong>: 향미를 집중시키는 형태로 감상에 최적입니다.</li>
            <li><strong>롱 글라스</strong>: 온 더 록스에 적합합니다.</li>
            <li><strong>스니프터</strong>: 고급 위스키 감상에 사용됩니다.</li>
          </ul>

          <h3 style={{ marginTop: '1.5rem' }}>페어링</h3>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>셰리 캐스크 위스키</strong>: 다크 초콜릿, 견과류, 건조한 과일</li>
            <li><strong>버번 캐스크 위스키</strong>: 바닐라 아이스크림, 카라멜 디저트</li>
            <li><strong>스모키 위스키</strong>: 훈제 치즈, 훈제 연어</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <div className="card">
          <h2>🍺 맥주 서빙 가이드</h2>
          
          <h3 style={{ marginTop: '1.5rem' }}>온도</h3>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>라거</strong>: 4-7°C - 차갑게 마시면 깔끔한 맛이 부각됩니다.</li>
            <li><strong>에일</strong>: 7-12°C - 약간 차갑게. 향미를 느낄 수 있는 온도입니다.</li>
            <li><strong>IPA</strong>: 8-12°C - 홉 향을 최대한 느낄 수 있는 온도입니다.</li>
            <li><strong>스타우트</strong>: 10-13°C - 상대적으로 따뜻하게. 복잡한 맛을 즐길 수 있습니다.</li>
          </ul>

          <h3 style={{ marginTop: '1.5rem' }}>글라스 선택</h3>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>필스너 글라스</strong>: 라거, 필스너에 적합. 거품과 향미를 감상할 수 있습니다.</li>
            <li><strong>IPA 글라스</strong>: 홉 향을 집중시키는 형태입니다.</li>
            <li><strong>스니프터</strong>: 고급 에일, 스타우트 감상에 사용됩니다.</li>
          </ul>

          <h3 style={{ marginTop: '1.5rem' }}>페어링</h3>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>라거</strong>: 해산물, 가벼운 샐러드, 치킨</li>
            <li><strong>IPA</strong>: 매운 음식, 치즈, 버거</li>
            <li><strong>스타우트</strong>: 초콜릿 디저트, 스테이크, 훈제 고기</li>
            <li><strong>휘트 비어</strong>: 가벼운 파스타, 생선 요리</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <div className="card">
          <h2>🍶 사케 페어링 가이드</h2>
          
          <h3 style={{ marginTop: '1.5rem' }}>일본 요리와의 페어링</h3>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>다이긴죠</strong>: 회, 사시미, 가벼운 요리와 함께</li>
            <li><strong>준마이</strong>: 다양한 일본 요리와 잘 어울립니다</li>
            <li><strong>혼죠조</strong>: 구이 요리, 튀김과 함께</li>
          </ul>

          <h3 style={{ marginTop: '1.5rem' }}>서양 요리와의 페어링</h3>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>다이긴죠</strong>: 가벼운 파스타, 생선 요리</li>
            <li><strong>준마이</strong>: 치즈, 샐러드</li>
            <li><strong>혼죠조</strong>: 구이 고기, 스테이크</li>
          </ul>

          <h3 style={{ marginTop: '1.5rem' }}>온도별 페어링</h3>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>히야 (차갑게)</strong>: 회, 사시미, 가벼운 요리</li>
            <li><strong>조온 (상온)</strong>: 다양한 요리와 잘 어울립니다</li>
            <li><strong>누루깡/죠깡 (따뜻하게)</strong>: 구이 요리, 튀김, 따뜻한 요리</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <div className="card" style={{ backgroundColor: '#e8f5e9' }}>
          <h2>💡 일반적인 팁</h2>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>주류는 서빙 전에 적절한 온도로 준비하세요.</li>
            <li>글라스는 깨끗하게 세척하고, 향이 강한 세제는 피하세요.</li>
            <li>페어링은 대비(contrast)와 조화(harmony) 원칙을 고려하세요.</li>
            <li>입문자는 낮은 온도나 부드러운 맛부터 시작하는 것을 추천합니다.</li>
            <li>고급자는 다양한 온도와 서빙 방식을 시도해보세요.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

