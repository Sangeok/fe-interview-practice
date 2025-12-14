# Interview Page Refactoring Analysis

**Analysis Date**: 2025-12-14
**Target File**: `fsd/pages/interview/ui/index.tsx`
**Status**: 리팩토링 필요 (Medium-High Priority)

## Executive Summary

기능은 정상 작동하지만 코드 품질과 유지보수성 측면에서 개선이 필요합니다. 특히 **useHeaderButton 훅에 실제 버그**가 존재하여 즉시 수정이 필요합니다.

---

## 🔴 High Priority Issues (즉시 수정 필요)

### 1. 타입 캐스팅 남용 (Type Safety 약화)

**위치**: `index.tsx:29, 46, 54, 60, 74`

**문제점**:
- `selectedOptions as InterviewOptionsValue` 반복 사용
- 타입 시스템을 우회하여 런타임 오류 위험 증가
- 빈 문자열 상태(`""`)에서 예상치 못한 동작 가능

**현재 코드**:
```typescript
const question_answer = getQuestionAnswer(tech, selectedOptions as InterviewOptionsValue);
// ...
selectedOptions: selectedOptions as InterviewOptionsValue,
// ...
selectedOptions={selectedOptions as InterviewOptionsValue}
```

**영향도**: 타입 안정성 저하, 유지보수 어려움

---

### 2. useHeaderButton 훅의 버그 ⚠️

**위치**: `fsd/pages/interview/model/hooks/useHeaderButton.ts:38`

**문제점**:
```typescript
const handleAddToReview = async () => {
  if (selectedOptions === "Subjective") {
    console.log("questions[currentMcqQuestionIndex]", questions[currentMcqQuestionIndex]); // ❌ 버그
    addInCorrectSubQuestion(questions[currentSubjQuestionIndex] as SubjectiveQuestion);
  } else if (selectedOptions === "Multiple Choice") {
    console.log("questions[currentMcqQuestionIndex]", questions[currentMcqQuestionIndex]);
    addInCorrectMultipleChoiceQuestion(questions[currentMcqQuestionIndex] as MultipleChoiceQuestion);
  }
  // ...
};
```

**버그 내용**:
- Subjective 분기에서 `currentMcqQuestionIndex` 사용 (잘못된 인덱스)
- console.log는 `currentMcqQuestionIndex`를 참조하지만 실제 저장은 `currentSubjQuestionIndex` 사용
- 로그와 실제 동작이 불일치

**영향도**: 실제 기능 오류, 디버깅 혼란

---

### 3. 개발 코드 잔재

**위치**: `useHeaderButton.ts:38, 41`

**문제점**:
- `console.log` 프로덕션 코드에 남아있음
- 디버깅 정보 노출

**현재 코드**:
```typescript
console.log("questions[currentMcqQuestionIndex]", questions[currentMcqQuestionIndex]);
```

**영향도**: 코드 품질, 프로페셔널리즘

---

## 🟡 Medium Priority Issues (리팩토링 권장)

### 4. 중복된 조건 로직

**위치**:
- `index.tsx:46, 50, 57`
- `getQuestionAnswer.ts:32, 34`

**문제점**:
```typescript
// index.tsx
selectedOptions === "Multiple Choice" ? (question_answer as MultipleChoiceQuestion[]) : []
selectedOptions === "Subjective" ? (question_answer as SubjectiveQuestion[]) : []
selectedOptions === "Multiple Choice" ? mcqQuestions : subjQuestions

// getQuestionAnswer.ts
if (interviewType === "Subjective") { ... }
else if (interviewType === "Multiple Choice") { ... }
```

**개선 방향**:
```typescript
// 타입 가드 함수
const isMultipleChoice = (opt: string): opt is "Multiple Choice" =>
  opt === "Multiple Choice";

const isSubjective = (opt: string): opt is "Subjective" =>
  opt === "Subjective";
```

**영향도**: 가독성 저하, DRY 원칙 위반

---

### 5. 매직 스트링 하드코딩

**위치**: 전체 파일

**문제점**:
- `"Multiple Choice"`, `"Subjective"` 문자열이 여러 파일에 반복
- 오타 가능성, 변경 시 일관성 유지 어려움

**개선 방향**:
```typescript
// constants/interviewTypes.ts
export const INTERVIEW_TYPES = {
  MULTIPLE_CHOICE: "Multiple Choice",
  SUBJECTIVE: "Subjective",
  CUSTOM: "Custom Questions",
} as const;

export type InterviewType = typeof INTERVIEW_TYPES[keyof typeof INTERVIEW_TYPES];
```

**영향도**: 유지보수성, 변경 용이성

---

### 6. 비효율적인 함수 구조

**위치**: `getQuestionAnswer.ts:20-30`

**문제점**:
```typescript
export const getQuestionAnswer = (tech: TechType, interviewType: InterviewOptionsValue) => {
  // 매핑 객체를 매번 생성
  const INTERVIEW_QUESTIONS_SUBJECTIVE = {
    JavaScript: JAVASCRIPT_SUBJECTIVE_QUESTIONS,
    React: REACT_SUBJECTIVE_QUESTIONS,
    TypeScript: TYPESCRIPT_SUBJECTIVE_QUESTIONS,
  };

  const INTERVIEW_QUESTIONS_MULTIPLE_CHOICE = { ... };
  // ...
};
```

**개선 방향**:
```typescript
// 모듈 레벨 상수로 추출
const INTERVIEW_QUESTIONS_SUBJECTIVE = {
  JavaScript: JAVASCRIPT_SUBJECTIVE_QUESTIONS,
  React: REACT_SUBJECTIVE_QUESTIONS,
  TypeScript: TYPESCRIPT_SUBJECTIVE_QUESTIONS,
} as const;

const INTERVIEW_QUESTIONS_MULTIPLE_CHOICE = { ... } as const;

export const getQuestionAnswer = (tech: TechType, interviewType: InterviewOptionsValue) => {
  // 상수 참조만 수행
};
```

**영향도**: 성능, 메모리 사용

---

### 7. 성능 최적화 누락

**위치**: `index.tsx:29`

**문제점**:
```typescript
const question_answer = getQuestionAnswer(tech, selectedOptions as InterviewOptionsValue);
```
- 매 렌더링마다 `getQuestionAnswer` 실행
- `tech`와 `selectedOptions`가 변경되지 않아도 재계산

**개선 방향**:
```typescript
const question_answer = useMemo(
  () => getQuestionAnswer(tech, selectedOptions as InterviewOptionsValue),
  [tech, selectedOptions]
);
```

**영향도**: 성능 최적화

---

## 🟢 Low Priority Issues (선택적 개선)

### 8. alert 사용

**위치**: `useHeaderButton.ts:45`

**문제점**:
```typescript
alert("복습 문제에 추가되었습니다.");
```
- 사용자 경험(UX)이 좋지 않음
- 현대적인 웹 앱에서 alert는 지양

**개선 방향**:
- Toast 알림 컴포넌트 사용
- UI 피드백 (체크 아이콘, 애니메이션)

**영향도**: 사용자 경험

---

### 9. 의존성 배열 최적화

**위치**:
- `useMCQSession.ts:23`
- `useSubjectiveSession.ts:28`

**문제점**:
```typescript
useEffect(() => {
  // ...
}, [selectedOptions, canShowInterview, sessionId, rawQuestions, initSession]);
```
- `sessionId`는 `${tech}:Multiple Choice`로 매번 새로 생성
- `rawQuestions`도 매 렌더링마다 새 배열 참조 가능
- 불필요한 effect 재실행 가능

**개선 방향**:
```typescript
// sessionId를 useMemo로 메모이제이션
const sessionId = useMemo(() => `${tech}:Multiple Choice`, [tech]);

// 또는 의존성 배열에서 제거하고 tech 직접 사용
useEffect(() => {
  const sessionId = `${tech}:Multiple Choice`;
  // ...
}, [selectedOptions, canShowInterview, tech, initSession]);
```

**영향도**: 성능 미세 최적화

---

### 10. 중복된 세션 훅 구조

**위치**:
- `useMCQSession.ts`
- `useSubjectiveSession.ts`

**문제점**:
```typescript
// 두 훅이 거의 동일한 구조
export function useMCQSession({ ... }) {
  const sessionId = `${tech}:Multiple Choice`;
  const initSession = useMCQSessionStore((s) => s.initSession);
  const questions = useMCQSessionStore((s) => s.shuffledQuestions);

  useEffect(() => { ... }, [...]);
  return { questions, sessionId };
}

export function useSubjectiveSession({ ... }) {
  const sessionId = `${tech}:Subjective`;
  const initSession = useSubjectiveSessionStore((s) => s.initSession);
  const questions = useSubjectiveSessionStore((s) => s.orderedQuestions);

  useEffect(() => { ... }, [...]);
  return { questions, sessionId };
}
```

**개선 방향**:
제네릭 훅으로 통합 검토 (단, 스토어 구조가 다르면 오버엔지니어링 가능)

**영향도**: DRY 원칙, 코드 중복 감소

---

## 리팩토링 우선순위 요약

| 순위 | 항목 | 파일 | 이유 | 예상 효과 |
|------|------|------|------|-----------|
| **1** | 버그 수정 (인덱스 참조) | useHeaderButton.ts | 실제 기능 오류 | 정확한 복습 추가 기능 |
| **2** | 타입 캐스팅 제거 | index.tsx | 타입 안정성 | 런타임 오류 방지 |
| **3** | console.log 제거 | useHeaderButton.ts | 코드 품질 | 프로덕션 코드 정리 |
| **4** | 매직 스트링 상수화 | 전체 | 유지보수성 | 변경 용이성 ↑ |
| **5** | 중복 로직 통합 | index.tsx, getQuestionAnswer.ts | 가독성 | DRY 원칙 준수 |
| **6** | 성능 최적화 | index.tsx, getQuestionAnswer.ts | 효율성 | 불필요한 재계산 방지 |
| 7 | alert → Toast | useHeaderButton.ts | UX | 사용자 경험 개선 |
| 8 | 의존성 배열 최적화 | 세션 훅들 | 성능 | 미세 최적화 |
| 9 | 세션 훅 통합 검토 | useMCQSession, useSubjectiveSession | 코드 중복 | 유지보수성 ↑ |

---

## 권장 리팩토링 순서

### Phase 1: 버그 수정 및 긴급 개선 (즉시)
1. ✅ useHeaderButton 버그 수정 (인덱스 참조)
2. ✅ console.log 제거
3. ✅ 타입 캐스팅 제거 및 타입 안정성 강화

### Phase 2: 코드 품질 개선 (단기)
4. ✅ 매직 스트링을 상수로 추출
5. ✅ 중복 조건 로직 통합 (타입 가드)
6. ✅ getQuestionAnswer 함수 최적화

### Phase 3: 성능 및 UX 개선 (중기)
7. ⚡ useMemo로 성능 최적화
8. 🎨 alert를 Toast로 교체
9. 🔧 의존성 배열 최적화

### Phase 4: 아키텍처 개선 (장기, 선택)
10. 🏗️ 세션 훅 통합 검토

---

## 코딩 컨벤션 체크

### ✅ 준수 사항
- Hook naming: `use[Feature][Purpose]` 패턴 사용
- FSD 구조: 레이어별 적절한 분리
- 컴포넌트 조직: UI, model, lib 분리

### ❌ 위반 사항
- **No abbreviations in iterators**: 준수 (확인된 범위 내)
- **Magic strings**: 여러 곳에서 하드코딩 사용
- **Type safety**: 과도한 type assertion 사용

---

## 테스트 커버리지 권장 사항

리팩토링 시 다음 테스트 추가 권장:

1. **useHeaderButton.test.ts**
   - `handleAddToReview` 함수의 올바른 인덱스 사용 검증
   - Subjective/Multiple Choice 분기별 테스트

2. **getQuestionAnswer.test.ts**
   - 각 tech/interviewType 조합별 반환값 검증
   - 빈 배열 반환 케이스 테스트

3. **InterviewPage.test.tsx**
   - 타입 안정성 검증
   - 조건부 렌더링 테스트

---

## 결론

**즉시 리팩토링 필요**. 특히 useHeaderButton의 버그는 사용자에게 영향을 미치는 기능적 결함이므로 우선적으로 수정해야 합니다.

전체적인 코드 구조는 양호하나, 타입 안정성과 중복 로직 제거를 통해 유지보수성을 크게 향상시킬 수 있습니다.

---

**Prepared by**: Claude Code Analysis
**Review Status**: Pending Implementation
