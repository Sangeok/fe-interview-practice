## 테스트 구현 현황 보고서 (Test Implementation Status)

- 작성일: 2025-11-02
- 대상: `fe-interview-practice` 전체 리포지토리의 단위/통합 테스트 코드 및 커버리지 현황

### 1) 개요

- **목적**: 현재 구현된 테스트 코드를 전수 조사하고, 기능/도메인 단위로 어떤 부분까지 검증이 완료되었는지와 남은 공백(미구현/부족)을 명확히 기록합니다.
- **출처**:
  - 테스트 파일들(`**/*.test.ts`, `**/*.test.tsx`)
  - 커버리지 리포트: `coverage/lcov-report/index.html`

### 2) 전반 커버리지 요약 (istanbul)

- **Statements**: 78.89% (344/436)
- **Branches**: 77.55% (114/147)
- **Functions**: 73.72% (101/137)
- **Lines**: 79.33% (311/392)

### 3) 도메인별 테스트 구현 상세

#### A. API 라우트

- `app/api/generate-feedback/__test__/route.test.ts`
  - 성공 케이스(점수 구간별 0–4, 5–7, 8–10)와 실패 케이스(필드 누락 400, AI 에러 500, JSON 파싱 실패 500) 모두 검증.
  - `AiModel.generateScript.sendMessage` 모킹으로 외부 의존성 분리 및 응답 스키마 검증.
- `app/api/generate-interpret/__test__/route.test.ts`
  - 성공 응답(요약/디테일) 검증, 필드 누락 400, AI 에러 500, JSON 파싱 실패 500 등 오류 흐름 포함.
- 커버리지(폴더): `app/api/generate-feedback`, `app/api/generate-interpret` 각각 Statements 93.33%, Functions 100% 등 고수준.

#### B. 공용 라이브러리 (shared/lib)

- `fsd/shared/lib/__test__/array-shuffle.test.ts`
  - 비배열 입력 처리, 원본 불변성, `Math.random` 모킹으로 결정적 셔플 검증.
- `fsd/shared/lib/__test__/indexedDB.test.ts`
  - `openDB` 스키마/인덱스 생성, 저장/불러오기, 필드 누락 기본값 처리, 비지원/에러 전파 등 경계/에러 상황 포함한 폭넓은 검증.
- 커버리지(폴더): `fsd/shared/lib` Statements 91.17%.

#### C. 페이지 비즈니스 로직

- `fsd/pages/interview/lib/__test__/getQuestionAnswer.test.ts`
  - 기술/유형 조합별 정상 반환, 입력 오류에 대한 빈 배열 반환, 데이터 구조 유효성 및 일관성(참조 동일성) 검증.
- 커버리지(폴더): `fsd/pages/interview/lib` Statements 100%.

#### D. 엔티티/스토어

- `fsd/entities/user/__test__/useUserStore.test.ts`
  - 초기 상태/모든 메서드 제공 여부, 추가/중복 방지/삭제 플로우, IndexedDB 영속화·복원, 인스턴스 간 상태 공유, 통합 시나리오까지 포괄 검증.
- 커버리지(폴더): `fsd/entities/user` 100% 전 항목.

#### E. 전역 선택 스토어

- `fsd/shared/model/__test__/useSelectTechStore.test.ts`
  - 상태 전이, 인스턴스 간 공유, 타입 안정성, 중복 세팅 방지, 빠른 상태 변경, 언마운트/리마운트 시 지속 등 검증.
- 커버리지(폴더): `fsd/shared/model` 100%.

#### F. 채팅 UI 계층 (features/chat)

- 상위 메시지 스위처
  - `fsd/features/chat/chatMessage/ui/__test__/ChatMessage.test.tsx`
    - `role` 별 분기(사용자/시스템/어시스턴트) 렌더링, 핸들러 전파, 로딩 상태 전파, 엣지 케이스(빈 컨텐츠/옵셔널 프롭 미지정) 검증.
- BotMessage 타입 분기/프레젠테이션
  - 타입 가드: `fsd/features/chat/chatMessage/ui/_component/BotMessage/lib/__test__/isFeedbackData.test.ts`
    - `FeedbackData`/`DeepDiveFeedbackData`/`Response` 상호 배타성 및 다형성 검증, 다양한 비정상 입력 케이스 포함.
  - 렌더러: `fsd/features/chat/chatMessage/ui/_component/BotMessage/ui/__test__/index.test.tsx`
    - 로딩/일반 문자열/피드백/딥다이브 데이터에 따른 분기 우선순위, 아바타 프롭 전파, 상태 전이 검증.
- 개별 메시지(사용자)
  - `fsd/features/chat/chatMessage/ui/_component/__test__/UserMessage.test.tsx`
    - 구조/스타일/다양한 텍스트 컨텐츠/접근성/리렌더 동작 검증.
- 커버리지(폴더 주요 지표)
  - `fsd/features/chat/chatMessage/ui` 100%
  - `fsd/features/chat/chatMessage/ui/_component` 100%
  - `fsd/features/chat/chatMessage/ui/_component/BotMessage/lib` 100%
  - `fsd/features/chat/chatMessage/ui/_component/BotMessage/model/hooks` Lines 31.57% (낮음)
  - `fsd/features/chat/chatMessage/ui/_component/BotMessage/ui` 100%
  - `fsd/features/chat/chatMessage/ui/_component/BotMessage/ui/_component` 66.66%
  - `fsd/features/chat/chatMessage/ui/_component/BotMessage/ui/_component/DeepDiveFeedbackMessage/ui` 0%
  - `fsd/features/chat/chatMessage/ui/_component/BotMessage/ui/_component/FeedbackMessage/_component` 0%
  - `fsd/features/chat/chatMessage/ui/_component/BotMessage/ui/_component/FeedbackMessage/ui` 0%

#### G. 채팅 입력(UI)

- 커버리지(폴더): `fsd/features/chat/chatInput/ui` Statements 82.35%, Branches 53.84% 등.
  - 직접 테스트 파일은 확인되지 않으나(렌더 경유), 통합 테스트 경로에서 일부 라인이 커버됨.

#### H. 위젯 – 객관식 인터뷰 (multipleChoiceInterview)

- 훅
  - `fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/hooks/__test__/useAnswerValidation.test.ts`
    - 선택/검증/재설정/제출 가능 상태/통합 시나리오/엣지 케이스 전반 검증.
  - 커버리지(폴더): `model/hooks` Statements 33.87% (다른 훅 미검증 추정: `useMultipleChoiceQuiz`, `useAnswerFeedbackState` 등).
- UI
  - `fsd/widgets/interviewOption/ui/multipleChoiceInterview/ui/__test__/index.test.tsx`
    - 진행 헤더/문항 표시/정오 처리/해설 카드/네비게이션/로딩/엣지 케이스/통합 상호작용 검증.
  - 커버리지(폴더): `ui` 100%.

#### I. 위젯 – 주관식 인터뷰 (subjectiveInterview)

- 훅
  - `fsd/widgets/interviewOption/ui/subjectiveInterview/model/hooks/useSubjectiveInterview/__test__/index.test.ts`
    - 초기 상태/메시지 전송(API 모킹)/점수 반영/저득점/에러 시 흐름/다음 문항/종료 처리 등 통합 수준 검증.
  - 커버리지(폴더): `.../useSubjectiveInterview` Statements 93.75%, `.../internal` 98.3%.
  - 상위 폴더 집계(`model/hooks`)는 0%로 표시되지만, 개별 하위 훅은 높은 커버리지를 보임(집계 산식/인덱스 파일 영향 추정).
- 메시지 유틸
  - `fsd/widgets/interviewOption/ui/subjectiveInterview/lib/__test__/messagelib.test.ts`
    - 메시지 생성/ID 생성 규칙/필터링/일관성/불변성 검증.
- UI
  - `fsd/widgets/interviewOption/ui/subjectiveInterview/ui/__test__/index.test.tsx`
    - 메시지/입력/로딩/네비게이션/완료 UI/스크롤 훅/프롭 전파/엣지 케이스 등 광범위 검증.
  - 커버리지(폴더): `ui` 100%.

### 4) 완료 범위와 공백(미구현/보완 필요)

- **완료(신뢰도 높음)**

  - API 라우트 `generate-feedback`/`generate-interpret`: 정상/에러/파싱 실패 전체 흐름 검증.
  - 스토어: `useUserStore`, `useSelectTechStore` 전 범위.
  - 페이지 로직: `getQuestionAnswer` 전 범위.
  - 공용 라이브러리: `array-shuffle`, `indexedDB` 주요 경계/에러 포함 폭넓은 테스트.
  - UI: `ChatMessage` 스위처, `BotMessage` 최상위 분기, 주관식/객관식 UI 컴포넌트 통합 동작.

- **부분 완료(누락 케이스 존재)**

  - `fsd/features/chat/chatInput/ui`: Statements 82.35%, Branches 53.84%로 분기 검증 부족.
  - `fsd/features/chat/chatMessage/ui/_component/BotMessage/ui/_component`: 66.66% — 하위 세부 컴포넌트 일부 미검증.
  - 주관식 훅 상위 폴더(`model/hooks`)는 0%로 표시되나, 실질적으로 핵심 훅(`useSubjectiveInterview`)은 높은 커버리지 확보.

- **미구현/부족(우선 보완 권장)**
  - `fsd/features/chat/chatMessage/ui/_component/BotMessage/model/hooks`: Lines 31.57% — 예: `useTypewriter` 효과/클린업/속도 제어/인터럽트 케이스 테스트 필요.
  - `fsd/features/chat/chatMessage/ui/_component/BotMessage/ui/_component/DeepDiveFeedbackMessage/ui`: 0% — 렌더링, 섹션 표시, 토픽 반복 등 단위 테스트 필요.
  - `fsd/features/chat/chatMessage/ui/_component/BotMessage/ui/_component/FeedbackMessage/_component`: 0% — 하위 원자 컴포넌트 출력/조건부 UI 검증 필요.
  - `fsd/features/chat/chatMessage/ui/_component/BotMessage/ui/_component/FeedbackMessage/ui`: 0% — 피드백 블록/포인트 리스트/요약 등 검증 필요.
  - `fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/hooks`: 33.87% — `useMultipleChoiceQuiz`, `useAnswerFeedbackState`의 상태 전이/경계/에러 흐름 보강 필요.

### 5) 단기 보완 제안 (테스트 추가 우선순위)

1. BotMessage 하위 UI 컴포넌트 단위 테스트 추가
   - DeepDive/Feedback 관련 UI의 조건부 렌더링, 리스트/카운트, 국제화 문자열 노출 확인.
2. BotMessage 모델 훅(`useTypewriter` 등) 테스트
   - 타이핑 효과 시작/중단/속도/클린업/비동기 경합(언마운트 시 타이머 정리) 검증.
3. 객관식 훅 보강
   - `useMultipleChoiceQuiz`: 인덱스 이동/점수 반영/종료 조건/빈 목록 처리.
   - `useAnswerFeedbackState`: 정오/로딩/해설 상태 머신 전이, 연속 인터랙션, 리셋.
4. ChatInput UI 직접 단위 테스트
   - 입력/전송 핸들러, 로딩 시 비활성화, 키보드 제출, 엣지 입력(빈 문자열/공백) 처리.

### 6) 테스트 파일 인벤토리 (현재 확인된 목록)

- API
  - `app/api/generate-feedback/__test__/route.test.ts`
  - `app/api/generate-interpret/__test__/route.test.ts`
- Shared Lib
  - `fsd/shared/lib/__test__/array-shuffle.test.ts`
  - `fsd/shared/lib/__test__/indexedDB.test.ts`
- Pages/Interview
  - `fsd/pages/interview/lib/__test__/getQuestionAnswer.test.ts`
- Entities/Store
  - `fsd/entities/user/__test__/useUserStore.test.ts`
- Shared/Model
  - `fsd/shared/model/__test__/useSelectTechStore.test.ts`
- Features/ChatMessage
  - `fsd/features/chat/chatMessage/ui/__test__/ChatMessage.test.tsx`
  - `fsd/features/chat/chatMessage/ui/_component/__test__/UserMessage.test.tsx`
  - `fsd/features/chat/chatMessage/ui/_component/BotMessage/lib/__test__/isFeedbackData.test.ts`
  - `fsd/features/chat/chatMessage/ui/_component/BotMessage/ui/__test__/index.test.tsx`
- Widgets/MultipleChoice
  - `fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/hooks/__test__/useAnswerValidation.test.ts`
  - `fsd/widgets/interviewOption/ui/multipleChoiceInterview/ui/__test__/index.test.tsx`
- Widgets/Subjective
  - `fsd/widgets/interviewOption/ui/subjectiveInterview/model/hooks/useSubjectiveInterview/__test__/index.test.ts`
  - `fsd/widgets/interviewOption/ui/subjectiveInterview/lib/__test__/messagelib.test.ts`
  - `fsd/widgets/interviewOption/ui/subjectiveInterview/ui/__test__/index.test.tsx`

---

본 문서는 현재 시점의 테스트 구현 상태를 정리한 것이며, 변경 사항(테스트 추가/삭제, 리팩터링, 구조 변경)이 발생하면 함께 갱신되어야 합니다.
