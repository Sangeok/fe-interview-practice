### 세션 영속화(객관식) 후속 작업 제안

- **다시 풀기(Reset) UX 추가**: `EndQuestion` 또는 헤더에 초기화 버튼을 두고 `useMCQSessionStore.getState().resetSession()` 호출.
- **세션 버전 마이그레이션**: 질문 스키마 변경 시 `persist`의 `version`/`migrate`로 안전 복구 로직 추가.
- **데이터 불일치 처리**: 원본 문제 수/ID가 바뀌었을 때 세션 초기화 또는 재구성 전략 정의.
- **여러 세션 동시 보관(선택)**: 현재는 최신 세션 1개만 저장. 필요 시 `Record<sessionId, Session>` 구조 혹은 키를 `mcq-session:${sessionId}`로 분리.
- **주관식(Subjective)에도 동일 패턴 적용**: `useSubjectiveSessionStore` 도입(진행 인덱스, 힌트/해설 상태 등 설계).
- **정답 이력 저장(선택)**: `answers: Record<questionId, 'correct'|'incorrect'>`로 오답노트/통계 확장.
- **성능/용량 최적화**: `shuffledQuestions` 전체 대신 `id 순서`와 `options 순서`만 저장 후 재구성.
- **테스트 케이스 보강**:
  - 새로고침/재방문 시 진행률/점수/문항 순서가 유지되는지
  - 기술/옵션 변경 시 신규 세션으로 시작되는지
  - 데이터 변경(문항 수/ID) 시 안전한 초기화 동작
  - `advance`/`resetSession` 동작의 단위 테스트
- **개발 편의**: `zustand` devtools 미들웨어 도입(개발 모드 한정)으로 상태 추적.
- **접근성/UX**: 진행률/점수에 `aria-live` 등 보완, 저장 상태 노출(예: "진행 기록이 자동 저장됩니다").

### 현재 구현 요약

- `useMCQSessionStore`를 도입하여 셔플/진행률/점수를 `localStorage(mcq-session)`에 저장/복원.
- MCQ 셔플은 스토어의 `initSession` 단일 경로로 수행하여 순서의 일관성 보장.
- `InterviewPage`는 세션 키(`tech:selectedOptions`)로 세션 초기화 시점을 제어.
- `useMultipleChoiceQuiz`는 스토어 상태를 사용하도록 교체하여 진행/점수 변경 시 자동 영속화.

### 적용 파일

- `fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/store/useMCQSessionStore.ts`: 세션 스토어
- `fsd/pages/interview/ui/index.tsx`: 세션 초기화 및 스토어 기반 질문 배열 사용
- `fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/hooks/useMultipleChoiceQuiz.ts`: 스토어 구독/진행 처리


