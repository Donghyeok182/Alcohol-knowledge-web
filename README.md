# 통합 주류 지식 허브 MVP

위스키, 사케, 맥주, 와인 4대 주종의 심층적인 과학적 지식을 제공하고, 사용자 선호도 기반 맞춤형 추천을 제공하는 웹 플랫폼입니다.

## 기술 스택

- **프론트엔드**: Next.js 16.0.1 (App Router)
- **백엔드**: Next.js API Routes
- **데이터베이스**: JSON 파일 (MVP 단계, 향후 SQLite 마이그레이션 예정)
- **인증**: JWT (jsonwebtoken)
- **비밀번호 해싱**: bcryptjs
- **언어**: JavaScript (ES6+)

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

## 프로젝트 구조

```
backend-pj/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # 인증 API (로그인, 회원가입, 로그아웃)
│   │   │   ├── products/      # 제품 API (CRUD)
│   │   │   ├── recommendations/ # 추천 API
│   │   │   ├── admin/         # 관리자 API
│   │   │   └── users/         # 사용자 API (프로필 수정)
│   │   ├── admin/             # 관리자 대시보드
│   │   ├── login/             # 로그인 페이지
│   │   ├── register/          # 회원가입 페이지
│   │   ├── profile/           # 프로필 수정 페이지
│   │   ├── recommendation/    # 맞춤형 추천 페이지
│   │   ├── products/[id]/     # 제품 상세 페이지
│   │   ├── deep-dive/         # 심화 지식 아카이브
│   │   ├── utility/           # 실용적 음용 가이드
│   │   └── standard/          # 글로벌 표준 및 용어집
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   ├── NavigationServer.jsx  # 네비게이션 서버 컴포넌트
│   │   ├── NavigationClient.jsx # 네비게이션 클라이언트 컴포넌트
│   │   └── ServingTemperature.jsx # 서빙 온도 컴포넌트
│   └── utils/                 # 유틸리티 함수
│       ├── auth.js            # 인증 로직
│       ├── products.js        # 제품 로직
│       ├── db.js              # 데이터베이스 유틸리티
│       ├── data.js            # 데이터 로딩
│       └── markdown.js        # 마크다운 파싱
├── data/
│   └── glossary.json          # 용어집 데이터
├── db.json                    # 데이터베이스 파일 (사용자, 제품)
└── package.json
```

## 주요 기능

1. **심화 지식 아카이브** - 주종별 제조 과학 상세 문서
   - 위스키: 에스테르화 및 아세탈 형성 메커니즘
   - 사케: 정미율에 따른 맛 변화 메커니즘
   - 맥주: 홉 첨가 타이밍과 아로마 화합물 보존
   - 와인: 탄닌과 폴리페놀의 화학적 특성

2. **맞춤형 추천** - 사용자 선호도 기반 추천 시스템
   - 회원가입 시 선호도 선택 (맛, 느낌, 주종)
   - 선호도 기반 제품 추천
   - 제품 상세 정보 제공

3. **실용적 음용 가이드** - 서빙 팁, 페어링 전략

4. **글로벌 표준** - 공인 용어집

5. **사용자 인증**
   - 회원가입/로그인
   - JWT 기반 인증
   - 관리자/일반 사용자 역할 구분

6. **관리자 기능**
   - 사용자 관리
   - 제품 관리 (추가/수정/삭제)
   - 제품별 상세 정보 관리

## 기본 관리자 계정

- **이메일**: admin@gmail.com
- **비밀번호**: admin

## 데이터베이스

현재 MVP 단계에서는 JSON 파일(`db.json`)을 데이터베이스로 사용합니다.
- 사용자 데이터: `db.json`의 `users` 배열
- 제품 데이터: `db.json`의 `products` 배열
- 향후 SQLite 또는 PostgreSQL로 마이그레이션 예정

## 제품 데이터

각 주종별로 특화된 데이터 필드를 제공합니다:

- **위스키**: 캐스크 타입, 숙성 연수, 화학적 특성, 가격, 보관 방법
- **사케**: 정미율, 쌀 품종, 추천 온도 (차갑게/상온/따뜻하게), 가격, 보관 방법
- **맥주**: IBU, 홉 타입, 발효 방식, 가격, 보관 방법
- **와인**: 포도 품종, 지역, 빈티지, 당도, 바디, 가격, 보관 방법

## 주요 기능 상세

### 1. 심화 지식 아카이브
- 주종별 제조 과학 상세 문서
- 화학적 원리 설명 (에스테르화, 아세탈 형성 등)
- 마크다운 기반 콘텐츠 제공

### 2. 맞춤형 추천 시스템
- **Content-Based Filtering (CBF)** 알고리즘 사용
- 사용자 선호도 기반 점수 계산
- 카테고리(5점) > 맛(3점) > 느낌(2점) 가중치 적용
- 상위 12개 제품 추천

### 3. 사용자 인증
- JWT 기반 인증
- HTTP-only 쿠키로 토큰 저장
- 비밀번호 bcrypt 해싱
- 프로필 수정 기능 (현재 비밀번호 확인 필수)

### 4. 관리자 기능
- 사용자 목록 조회
- 제품 CRUD (생성/조회/수정/삭제)
- 제품별 상세 정보 관리

## 성능 최적화

- **Server Components**: 정적 페이지는 서버에서 렌더링
- **ISR (Incremental Static Regeneration)**: 용어집 페이지 1시간 재검증
- **API 캐싱**: 반복 요청 최적화
- **하이브리드 패턴**: Navigation Server/Client 분리

## 보안 기능

- HTTP-only 쿠키로 XSS 공격 방지
- 서버 사이드 인증 검증
- 비밀번호 bcrypt 해싱 (salt rounds: 10)
- 관리자 권한 검증

## 개발 환경 설정

```bash
# Node.js 버전
Node.js 18.x 이상 권장

# 포트
기본 포트: 3000
```

## 추가 문서

프로젝트의 상세한 기술 문서는 다음 파일들을 참고하세요:

- `CODE_ANALYSIS.md` - 핵심 코드 설명 및 최적화 전략
- `TECHNICAL_DETAILS.md` - 기술적 상세 설명
- `PROJECT_OVERVIEW.md` - 프로젝트 전체 개요
- `ARCHITECTURE.md` - 아키텍처 설계 문서

## 라이선스

이 프로젝트는 개인 학습 목적으로 제작되었습니다.

