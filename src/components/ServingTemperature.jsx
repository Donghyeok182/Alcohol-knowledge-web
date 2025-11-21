'use client';

import { useState } from 'react';

export default function ServingTemperature() {
  const [selectedTemp, setSelectedTemp] = useState(null);

  const sakeTemperatures = [
    {
      name: '히야 (冷や)',
      temp: '5-10°C',
      description: '차갑게 마시는 방식. 깔끔한 맛을 즐길 수 있으며, 특히 다이긴죠에 적합합니다.',
      color: '#3498db'
    },
    {
      name: '스즈히비 (涼冷)',
      temp: '10-15°C',
      description: '약간 차갑게. 상쾌한 느낌을 주며, 여름에 즐기기 좋습니다.',
      color: '#5dade2'
    },
    {
      name: '히야즈케 (冷酒)',
      temp: '15-20°C',
      description: '상온 정도. 사케의 자연스러운 맛을 느낄 수 있습니다.',
      color: '#85c1e2'
    },
    {
      name: '조온 (常温)',
      temp: '20-25°C',
      description: '실온. 감칠맛이 부각되며, 다양한 사케에 적합합니다.',
      color: '#f39c12'
    },
    {
      name: '누루깡 (ぬる燗)',
      temp: '30-35°C',
      description: '미지근하게. 감칠맛이 강조되며, 입문자에게 친화적입니다.',
      color: '#e67e22'
    },
    {
      name: '죠깡 (上燗)',
      temp: '40-45°C',
      description: '따뜻하게. 감칠맛이 극대화되며, 겨울에 즐기기 좋습니다.',
      color: '#e74c3c'
    },
    {
      name: '아츠깡 (熱燗)',
      temp: '50-55°C',
      description: '뜨겁게. 강한 감칠맛을 느낄 수 있으나, 향미 손실이 있을 수 있습니다.',
      color: '#c0392b'
    }
  ];

  return (
    <div className="card">
      <h2>사케 서빙 온도 가이드</h2>
      <p style={{ marginBottom: '2rem' }}>
        사케는 온도에 따라 맛이 크게 달라집니다. 각 온도별 명칭과 특성을 확인하세요.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {sakeTemperatures.map((temp, index) => (
          <div
            key={index}
            className="card"
            style={{
              cursor: 'pointer',
              border: selectedTemp === index ? `3px solid ${temp.color}` : '1px solid #ddd',
              transition: 'all 0.3s'
            }}
            onClick={() => setSelectedTemp(selectedTemp === index ? null : index)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: temp.color, marginBottom: '0.5rem' }}>{temp.name}</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: temp.color }}>
                  {temp.temp}
                </div>
              </div>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: temp.color,
                  opacity: 0.2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}
              >
                {index === 0 ? '❄️' : index < 3 ? '🧊' : index < 5 ? '🌡️' : '🔥'}
              </div>
            </div>
            {selectedTemp === index && (
              <p style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: `2px solid ${temp.color}` }}>
                {temp.description}
              </p>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
        <h3>💡 팁</h3>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>다이긴죠</strong>: 차갑게(히야) 또는 상온이 최적입니다.</li>
          <li><strong>준마이, 혼죠조</strong>: 다양한 온도에서 즐길 수 있습니다.</li>
          <li><strong>입문자</strong>: 누루깡(30-35°C)부터 시작하는 것을 추천합니다.</li>
          <li><strong>고급자</strong>: 히야(5-10°C)에서 미묘한 향미를 감상하세요.</li>
        </ul>
      </div>
    </div>
  );
}

