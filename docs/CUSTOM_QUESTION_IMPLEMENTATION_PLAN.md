# Custom Question Feature Implementation Plan

## Overview

사용자가 주관식 질문을 추가하여 연습할 수 있는 기능. Subjective 타입만 지원하며, AI 피드백 생성 방식은 기존과 동일.

## Design Decisions

- **Question Type**: Subjective only (Multiple choice 미지원)
- **AI Feedback**: 기존 `/api/generate-feedback` 동일 사용
- **Sharing**: 질문 공유 기능 불필요
- **Editing**: 기존 predefined 질문 편집 불허
- **Limits**: Custom 질문 최대 개수 제한 없음
- **Review**: Custom 오답을 별도 카테고리로 관리 (객관식/주관식/사용자질문)
- **Tags**: 난이도/태그 시스템 불필요

## Architecture

### 1. Type Definition

```typescript
// fsd/entities/customQuestion/model/type.ts

type Technology = 'javascript' | 'react' | 'typescript';

interface CustomSubjectiveQuestion {
  id: string;  // UUID
  technology: Technology;
  question: string;
  modelAnswer?: string;  // optional 모범답안
  createdAt: number;
  updatedAt: number;
}
```

### 2. IndexedDB Schema

```typescript
// fsd/shared/lib/indexedDB.ts 확장

Database: 'fe-interview-practice'
Version: 2

Stores:
  - user (existing)
  - customQuestions (new)
    - keyPath: 'id'
    - indices:
      - technology (non-unique)
      - createdAt (non-unique)
```

### 3. State Management

#### useCustomQuestionStore (Zustand)

```typescript
// fsd/entities/customQuestion/model/useCustomQuestionStore.ts

interface CustomQuestionStore {
  questions: CustomSubjectiveQuestion[];

  // CRUD
  addQuestion: (data: Omit<CustomSubjectiveQuestion, 'id' | 'createdAt' | 'updatedAt'>) => void;
  removeQuestion: (id: string) => void;
  updateQuestion: (id: string, updates: Partial<Pick<CustomSubjectiveQuestion, 'question' | 'modelAnswer'>>) => void;

  // Query
  getQuestionsByTech: (tech: Technology) => CustomSubjectiveQuestion[];

  // Persistence
  hydrateFromDB: () => Promise<void>;
  persistToDB: () => Promise<void>;
}

Implementation:
  - addQuestion: Generate UUID, timestamps, add to array, persist
  - removeQuestion: Filter by id, persist
  - updateQuestion: Update timestamp, persist
  - persistToDB: Call customQuestionDB.saveAll()
  - hydrateFromDB: Call customQuestionDB.loadAll()
```

#### useUserStore Extension

```typescript
// fsd/entities/user/useUserStore.ts

// 추가 필드
interface UserStore {
  // ... existing fields

  inCorrectCustomQuestion: Array<{
    customQuestionId: string;
    userAnswer: string;
    feedback: FeedbackData | DeepDiveFeedbackData;
    attemptedAt: number;
  }>;

  // 추가 메서드
  addInCorrectCustomQuestion: (data: {
    customQuestionId: string;
    userAnswer: string;
    feedback: FeedbackData | DeepDiveFeedbackData;
  }) => void;

  removeInCorrectCustomQuestion: (customQuestionId: string) => void;
}
```

### 4. File Structure

```
fsd/
├── entities/
│   ├── user/
│   │   └── useUserStore.ts  # inCorrectCustomQuestion 추가
│   └── customQuestion/
│       ├── model/
│       │   ├── type.ts
│       │   └── useCustomQuestionStore.ts
│       └── lib/
│           └── customQuestionDB.ts
│
├── features/
│   └── customQuestionManagement/
│       ├── createQuestion/
│       │   ├── ui/
│       │   │   └── CreateQuestionDialog.tsx
│       │   └── model/
│       │       └── hooks/
│       │           └── useCreateQuestion.ts
│       ├── updateQuestion/
│       │   └── ui/
│       │       └── UpdateQuestionDialog.tsx
│       └── deleteQuestion/
│           └── ui/
│               └── DeleteQuestionButton.tsx
│
├── widgets/
│   ├── customQuestionManager/
│   │   ├── ui/
│   │   │   ├── index.tsx
│   │   │   └── _component/
│   │   │       ├── QuestionList.tsx
│   │   │       └── QuestionCard.tsx
│   │   └── model/
│   │       └── hooks/
│   │           └── useQuestionManager.ts
│   ├── customQuestionReview/
│   │   └── ui/
│   │       └── index.tsx
│   └── customSubjectiveInterview/
│       └── ui/
│           └── index.tsx
│
└── pages/
    ├── customQuestionManagement/
    │   └── ui/
    │       └── index.tsx
    └── customInterview/
        └── ui/
            └── index.tsx
```

### 5. Routing

```
app/
├── (main)/
│   ├── interviews/
│   │   └── [title]/page.tsx          # Existing: predefined questions
│   ├── custom-interviews/
│   │   └── page.tsx                  # New: custom question interview
│   ├── custom-questions/
│   │   └── page.tsx                  # New: question management
│   └── reviews/
│       └── page.tsx                  # Modified: add custom tab
```

## Implementation Phases

### Phase 1: Core Data Layer

**Goal**: Custom 질문 CRUD 기능 구현

**Tasks**:
1. Type 정의 (`fsd/entities/customQuestion/model/type.ts`)
2. IndexedDB 스키마 확장 (`fsd/shared/lib/indexedDB.ts`)
3. customQuestionDB 서비스 (`fsd/entities/customQuestion/lib/customQuestionDB.ts`)
   - `saveQuestion(q: CustomSubjectiveQuestion)`
   - `loadQuestions(filters?: { technology?: Technology })`
   - `updateQuestion(id: string, updates)`
   - `deleteQuestion(id: string)`
4. useCustomQuestionStore 구현
5. 테스트 작성 (`__test__/customQuestionDB.test.ts`)

**Validation**:
- IndexedDB에 질문 저장/로드 성공
- Technology 필터링 동작
- Store 상태 persistence 확인

### Phase 2: Question Management UI

**Goal**: 질문 관리 페이지 구현

**Tasks**:
1. CreateQuestionDialog 컴포넌트
   - Technology 선택 (radio)
   - Question 입력 (textarea)
   - Model answer (optional textarea)
   - Validation (빈 질문 방지)
2. QuestionCard 컴포넌트
   - 질문 미리보기
   - 수정/삭제 버튼
3. QuestionList 컴포넌트
   - Technology 탭
   - QuestionCard 배열 렌더링
4. CustomQuestionManager 위젯
5. 페이지 라우트 (`app/(main)/custom-questions/page.tsx`)
6. Main page 진입점 추가

**Validation**:
- 질문 생성 UI 동작
- 질문 수정/삭제 UI 동작
- Technology 필터링 UI 동작
- IndexedDB 동기화 확인

### Phase 3: Custom Interview Integration

**Goal**: Custom 질문으로 면접 진행 기능

**Tasks**:
1. CustomSubjectiveInterview 위젯
   - 기존 SubjectiveInterview 로직 재사용
   - Custom questions 데이터로 초기화
2. AI 피드백 API 연동
   - 기존 `/api/generate-feedback` 사용
   - FeedbackData/DeepDiveFeedbackData 동일 처리
3. useUserStore 확장
   - `inCorrectCustomQuestion` 필드 추가
   - `addInCorrectCustomQuestion` 메서드
4. 오답 저장 로직
   - 사용자 답변 + 피드백 저장
   - customQuestionId 참조
5. 페이지 라우트 (`app/(main)/custom-interviews/page.tsx`)
6. Main page 진입점 추가

**Validation**:
- Custom 질문으로 면접 진행 가능
- AI 피드백 정상 생성
- 오답 IndexedDB 저장 확인

### Phase 4: Review Integration

**Goal**: Custom 오답 복습 기능

**Tasks**:
1. Review 페이지 탭 추가
   - "사용자 질문" 탭 추가
   - inCorrectCustomQuestion 데이터 표시
2. CustomQuestionReview 위젯
   - 질문 + 이전 답변 + 피드백 표시
   - 재시도 기능
   - 오답 제거 버튼
3. useUserStore 확장
   - `removeInCorrectCustomQuestion` 메서드
4. Session snapshot 처리
   - Review 진행 중 데이터 변경 방지

**Validation**:
- Custom 오답 탭 표시
- 오답 복습 기능 동작
- 오답 제거 기능 동작
- Session 격리 확인

## User Flow

### 질문 생성 플로우

```
1. Main Page
   ↓ "질문 관리" 버튼 클릭
2. /custom-questions
   - Technology 탭 선택 (JS/React/TS)
   - "+" 버튼 클릭
   ↓
3. CreateQuestionDialog
   - Question 입력
   - Model Answer 입력 (optional)
   - "생성" 클릭
   ↓
4. useCustomQuestionStore.addQuestion()
   ↓
5. IndexedDB.customQuestions 저장
   ↓
6. QuestionList 업데이트
```

### 면접 진행 플로우

```
1. Main Page
   ↓ "Custom 면접 시작" 버튼 클릭
2. /custom-interviews
   - selectedTech의 custom questions 로드
   ↓
3. CustomSubjectiveInterview
   - 질문 순차 표시
   - 사용자 답변 입력
   - "제출" 클릭
   ↓
4. /api/generate-feedback 호출
   ↓
5. AI FeedbackData/DeepDiveFeedbackData 수신
   ↓
6. 피드백 점수 기반 오답 판정
   ↓
7. useUserStore.addInCorrectCustomQuestion()
   ↓
8. IndexedDB.user 저장
```

### 복습 플로우

```
1. /reviews
   ↓ "사용자 질문" 탭 클릭
2. inCorrectCustomQuestion 로드
   ↓
3. CustomQuestionReview
   - 질문 + 이전 답변 + 피드백 표시
   - "재시도" 클릭
   ↓
4. 답변 재입력
   ↓
5. AI 피드백 재생성
   ↓
6. 정답 시 "오답 제거" 버튼 클릭
   ↓
7. useUserStore.removeInCorrectCustomQuestion()
```

## Technical Considerations

### IndexedDB Version Migration

```typescript
// fsd/shared/lib/indexedDB.ts

const DB_VERSION = 2;

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('fe-interview-practice', DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      const oldVersion = event.oldVersion;

      // Version 1: user store (existing)
      if (oldVersion < 1) {
        const userStore = db.createObjectStore('user', { keyPath: 'name' });
        userStore.createIndex('updatedAt', 'updatedAt', { unique: false });
      }

      // Version 2: customQuestions store (new)
      if (oldVersion < 2) {
        const customQStore = db.createObjectStore('customQuestions', { keyPath: 'id' });
        customQStore.createIndex('technology', 'technology', { unique: false });
        customQStore.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
```

### Custom Question Validation

```typescript
// fsd/entities/customQuestion/lib/validation.ts

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const validateCustomQuestion = (
  question: string,
  technology: Technology
): ValidationResult => {
  const errors: string[] = [];

  if (!question.trim()) {
    errors.push('질문을 입력하세요');
  }

  if (question.length > 1000) {
    errors.push('질문은 1000자 이하여야 합니다');
  }

  if (!technology) {
    errors.push('기술을 선택하세요');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};
```

### Custom Question ID Reference

```typescript
// useUserStore에서 customQuestionId로 참조
// Review 시 useCustomQuestionStore에서 질문 데이터 fetch

const CustomQuestionReview = () => {
  const incorrectCustomQs = useUserStore(s => s.inCorrectCustomQuestion);
  const getQuestionById = (id: string) => {
    return useCustomQuestionStore
      .getState()
      .questions.find(q => q.id === id);
  };

  return incorrectCustomQs.map(item => {
    const question = getQuestionById(item.customQuestionId);
    if (!question) return null; // 삭제된 질문

    return (
      <QuestionReviewCard
        question={question.question}
        userAnswer={item.userAnswer}
        feedback={item.feedback}
      />
    );
  });
};
```

### AI Feedback Integration

```typescript
// 기존 API 그대로 사용
// Custom 질문도 동일한 피드백 형식

const handleSubmitAnswer = async (answer: string, question: CustomSubjectiveQuestion) => {
  const response = await fetch('/api/generate-feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question: question.question,
      userAnswer: answer,
      modelAnswer: question.modelAnswer || undefined
    })
  });

  const feedback: FeedbackData | DeepDiveFeedbackData = await response.json();

  // 점수 기반 오답 판정 (예: < 7점)
  if (feedback.score < 7) {
    useUserStore.getState().addInCorrectCustomQuestion({
      customQuestionId: question.id,
      userAnswer: answer,
      feedback
    });
  }
};
```

## Testing Strategy

### Unit Tests

1. **customQuestionDB.test.ts**
   - Save/load/update/delete operations
   - Technology filtering
   - Error handling

2. **useCustomQuestionStore.test.ts**
   - State mutations
   - Persistence integration
   - Query methods

3. **validation.test.ts**
   - Question validation rules
   - Edge cases (empty, too long)

### Integration Tests

1. **Question Management Flow**
   - Create → display → update → delete
   - IndexedDB synchronization

2. **Interview Flow**
   - Load custom questions → answer → AI feedback → save incorrect
   - useUserStore integration

3. **Review Flow**
   - Load incorrect custom questions → display → retry → remove
   - Session isolation

## Performance Considerations

- **IndexedDB Indexing**: Technology, createdAt indices for fast filtering
- **Lazy Loading**: Load questions only when needed (per-technology)
- **Memoization**: useMemo for filtered question lists
- **Debouncing**: Search/filter inputs in question management UI

## Edge Cases

1. **Deleted Question in Review**
   - User deletes custom question with incorrect answer
   - Review UI: Show "질문이 삭제되었습니다" or skip

2. **Empty Custom Question List**
   - Show empty state with "질문 추가" CTA

3. **IndexedDB Version Conflicts**
   - Multiple tabs open during version upgrade
   - Handle blocked event, prompt user to close other tabs

4. **AI Feedback API Failure**
   - Retry logic with exponential backoff
   - Show error message, allow retry

## Future Enhancements (Out of Scope)

- Import/export questions as JSON
- Question difficulty levels
- Tags/categories system
- Sharing questions with other users
- Multiple choice custom questions
- Bulk question management

## Checklist

### Phase 1
- [ ] CustomSubjectiveQuestion type
- [ ] IndexedDB schema v2
- [ ] customQuestionDB service
- [ ] useCustomQuestionStore
- [ ] Unit tests

### Phase 2
- [ ] CreateQuestionDialog
- [ ] QuestionCard/QuestionList
- [ ] CustomQuestionManager widget
- [ ] /custom-questions page
- [ ] Main page integration

### Phase 3
- [ ] CustomSubjectiveInterview widget
- [ ] AI feedback integration
- [ ] useUserStore extension (inCorrectCustomQuestion)
- [ ] /custom-interviews page
- [ ] Incorrect answer saving

### Phase 4
- [ ] Review page tab addition
- [ ] CustomQuestionReview widget
- [ ] Remove incorrect answer feature
- [ ] Session snapshot handling

## Dependencies

**No new dependencies required** - all functionality uses existing tech stack:
- Zustand (state management)
- IndexedDB (persistence)
- Next.js App Router (routing)
- Existing UI components (Dialog, Button, Tabs)
- @google/generative-ai (AI feedback)

## Estimated Effort

- **Phase 1**: 4-6 hours
- **Phase 2**: 6-8 hours
- **Phase 3**: 4-6 hours
- **Phase 4**: 3-4 hours
- **Total**: 17-24 hours

## Rollout Strategy

1. Implement Phase 1-2 first (question management)
2. Gather user feedback on management UI
3. Implement Phase 3 (interview integration)
4. Test AI feedback quality with custom questions
5. Implement Phase 4 (review integration)
6. Final testing and deployment

---

**Document Version**: 1.0
**Last Updated**: 2025-12-12
**Status**: Ready for Implementation
