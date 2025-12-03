# FE Interview Practice

AI 기반 프론트엔드 면접 연습 플랫폼

## 주요 기능

- **다양한 면접 유형**
  - 객관식: AI 해설 제공
  - 주관식: AI 상세 피드백 (0-10점 채점)
- **기술 스택 선택**: JavaScript, React, TypeScript
- **복습 시스템**: 틀린 문제 재학습 (IndexedDB 저장)
- **AI 통합**: Google Gemini API 기반 피드백 및 해설
- **진행 상황 추적**: 로컬 저장소 기반

## 기술 스택

- **프레임워크**: Next.js 15.5.0 (Turbopack)
- **UI**: React 19, Tailwind CSS 4, Lucide Icons
- **상태관리**: Zustand + IndexedDB
- **AI**: Google Gemini API
- **테스트**: Vitest, Testing Library, Playwright
- **아키텍처**: Feature-Sliced Design (FSD)

## 시작하기

### 사전 요구사항

- Node.js 20.x
- `NEXT_PUBLIC_GEMINI_API_KEY` 환경 변수

### 설치

```bash
npm install
```

### 환경 설정

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

### 개발 명령어

```bash
npm run dev       # 개발 서버 시작 (Turbopack)
npm run build     # 프로덕션 빌드
npm start         # 프로덕션 서버 시작
npm run lint      # ESLint 실행
npm test          # 테스트 실행
npm run test:watch    # 테스트 watch 모드
npm run test:ui       # Vitest UI
npm run test:coverage # 커버리지 리포트
```

[http://localhost:3000](http://localhost:3000) 접속

## 아키텍처

`fsd/` 디렉토리의 Feature-Sliced Design 구조:

```
fsd/
├── pages/          # pages layer
│   ├── main/       # 랜딩 페이지
│   ├── interview/  # 면접 페이지
│   └── review/     # 복습 페이지
├── widgets/        # widgets layer
│   ├── hero/
│   └── interviewOption/
├── features/       # features layer
│   └── chat/       # 채팅 컴포넌트
├── entities/       # entities layer
│   └── user/       # 사용자 스토어 + IndexedDB
└── shared/         # shared layer
    ├── ui/atoms/   # 공용 컴포넌트트
    ├── constants/
    ├── lib/
    └── model/
```

## 핵심 기능

### 상태 관리

- **useSelectTechStore**: 전역 기술 스택 선택 (Zustand)
- **useUserStore**: 사용자 데이터, 틀린 문제 관리 (Zustand + IndexedDB)
- **IndexedDB**: 복습 시스템을 위한 영구 저장소

### AI 통합

- **피드백 API** (`/api/generate-feedback`): 주관식 답변 평가
  - 점수 (0-10), 요약, 강점, 개선사항, 모범답안
  - Deep dive 모드: 추가 학습 주제 제공
- **해설 API** (`/api/generate-interpret`): 객관식 해설

### 면접 시스템

- 문제 은행: `fsd/pages/interview/constants/`
- `arrayShuffle`로 문제 순서 랜덤화
- 진행 상황 추적 및 답변 검증
- 틀린 답변 수집 → 복습 시스템

## CI/CD

### GitHub Actions

- 트리거: `main`, `develop` 브랜치 Push/PR
- 단계: Lint → Test → Build
- 설정: `.github/workflows/ci.yml`

### Vercel 배포

- 자동 배포: `main` (프로덕션), `develop` (프리뷰)
- 설정: `vercel.json`
- 필수: `NEXT_PUBLIC_GEMINI_API_KEY` 환경 변수

상세 내용: `docs/CI_CD_SETUP.md`

### 테스트

- 테스트 파일: 소스 코드와 같은 위치의 `__test__/` 디렉토리
- Vitest 글로벌: `describe`, `it`, `expect`, `vi`
- IndexedDB 모킹: `fake-indexeddb`

## 프로젝트 구조

```
app/
├── page.tsx                              # 랜딩 페이지
├── (main)/
│   ├── interviews/[title]/page.tsx       # 동적 면접 라우트
│   └── reviews/page.tsx                  # 복습 페이지
└── api/
    ├── generate-feedback/route.ts        # AI 피드백(주관식 문제에 대한 피드백)
    └── generate-interpret/route.ts       # AI 피드백(객관식 문제에 대한 피드백백)

fsd/
├── pages/interview/constants/            # 문제 은행
│   ├── JavascriptQA_Multiple.ts
│   ├── ReactQA_Multiple.ts
│   └── ...
├── widgets/interviewOption/
│   ├── multipleChoiceInterview/         # 객관식 UI
│   └── subjectiveInterview/             # 주관식 UI
├── features/chat/
│   ├── chatInput/                       # 사용자 입력
│   └── chatMessage/                     # 메시지 표시
└── entities/user/
    └── useUserStore.ts                  # 사용자 상태 + IndexedDB
```
