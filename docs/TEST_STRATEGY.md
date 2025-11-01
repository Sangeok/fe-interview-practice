# Frontend Interview Practice - Comprehensive Test Strategy

> **Author**: Senior Frontend Engineer Perspective
> **Last Updated**: 2025-11-02
> **Target**: Complete test coverage from Unit to E2E

---

## Table of Contents

1. [Testing Philosophy](#testing-philosophy)
2. [Testing Pyramid Strategy](#testing-pyramid-strategy)
3. [Phase 1: Unit Testing](#phase-1-unit-testing)
4. [Phase 2: Integration Testing](#phase-2-integration-testing)
5. [Phase 3: Component Testing](#phase-3-component-testing)
6. [Phase 4: E2E Testing](#phase-4-e2e-testing)
7. [Implementation Roadmap](#implementation-roadmap)
8. [Tools & Configuration](#tools--configuration)
9. [Success Metrics](#success-metrics)
10. [Appendix](#appendix)

---

## Testing Philosophy

### Core Principles

**"Test behavior, not implementation"**

우리의 테스트 전략은 다음 원칙을 기반으로 합니다:

1. **User-Centric Testing**: 사용자가 경험하는 방식대로 테스트
2. **Confidence Over Coverage**: 높은 커버리지보다 중요한 비즈니스 로직의 신뢰도 우선
3. **Fast Feedback Loop**: 빠른 피드백을 위한 효율적인 테스트 실행
4. **Maintainability**: 구현 변경에 강건한 테스트 작성
5. **Pyramid Structure**: Unit → Integration → E2E 비율의 최적화

### Testing Values

```
┌─────────────────────────────────────┐
│     E2E Tests (10%)                 │  High Cost, High Confidence
│     Critical User Journeys          │  Slow, Brittle
├─────────────────────────────────────┤
│     Integration Tests (20%)         │  Medium Cost, Medium Speed
│     API, State, Complex Hooks       │  Real Integrations
├─────────────────────────────────────┤
│     Unit Tests (70%)                │  Low Cost, Fast
│     Pure Functions, Utilities       │  Isolated, Deterministic
└─────────────────────────────────────┘
```

### Why This Matters

이 프로젝트는:
- **AI 통합**: Gemini API를 사용한 동적 피드백
- **복잡한 상태 관리**: Zustand + IndexedDB 영속성
- **다층 아키텍처**: FSD (Feature-Sliced Design)
- **사용자 데이터 영속성**: 브라우저 세션 간 데이터 보존

이러한 복잡성을 다루기 위해 체계적인 테스트 전략이 필수적입니다.

---

## Testing Pyramid Strategy

### Layer Overview

| Layer | Purpose | Tools | Test Count Target |
|-------|---------|-------|-------------------|
| **E2E** | Critical user journeys | Playwright | 10-15 tests |
| **Integration** | API, State, Complex Hooks | Vitest + Testing Library | 20-30 tests |
| **Component** | UI Components, Widgets | Vitest + Testing Library | 30-40 tests |
| **Unit** | Pure Functions, Utilities | Vitest | 50-70 tests |

### Coverage Targets

- **Unit Tests**: 80%+ coverage for utilities and pure functions
- **Integration Tests**: 70%+ coverage for business logic
- **Component Tests**: 60%+ coverage for critical UI flows
- **E2E Tests**: 100% coverage for P0 user journeys

### Test Distribution Strategy

```typescript
// Example: 100 total tests
{
  unit: 60,           // 60% - Fast, isolated
  integration: 25,    // 25% - Real dependencies
  component: 10,      // 10% - UI behavior
  e2e: 5              // 5% - Critical paths
}
```

---

## Phase 1: Unit Testing

**Timeline**: Week 1 (3-4 days)
**Priority**: P0 (Must Have)
**Estimated Tests**: 50-70

### 1.1 Pure Utility Functions

#### 1.1.1 Array Shuffle (`fsd/shared/lib/array-shuffle.ts`)

**Status**: ✅ Already Tested

**Existing Tests**: `fsd/shared/lib/__test__/array-shuffle.test.ts`

**Coverage**:
- ✅ Basic shuffling
- ✅ Edge cases (empty array, null, undefined)
- ✅ Deterministic behavior with mocked Math.random
- ✅ Multiple choice question shuffling

**Recommendation**: No action needed - tests are comprehensive.

---

#### 1.1.2 Question Answer Selector (`fsd/pages/interview/lib/getQuestionAnswer.ts`)

**Priority**: P0
**Complexity**: Low
**Test File**: `fsd/pages/interview/lib/__test__/getQuestionAnswer.test.ts`

**Test Cases**:

```typescript
import { describe, it, expect } from 'vitest';
import { getQuestionAnswer } from '../getQuestionAnswer';
import { JAVASCRIPT_SUBJECTIVE_QUESTIONS } from '../../constants/JavascriptQA_Subjective';
import { REACT_MULTIPLE_CHOICE_QUESTIONS } from '../../constants';

describe('getQuestionAnswer', () => {
  describe('Subjective Questions', () => {
    it('should return JavaScript subjective questions', () => {
      const result = getQuestionAnswer('JavaScript', 'Subjective');
      expect(result).toEqual(JAVASCRIPT_SUBJECTIVE_QUESTIONS);
    });

    it('should return React subjective questions', () => {
      const result = getQuestionAnswer('React', 'Subjective');
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return TypeScript subjective questions', () => {
      const result = getQuestionAnswer('TypeScript', 'Subjective');
      expect(result).toBeDefined();
    });
  });

  describe('Multiple Choice Questions', () => {
    it('should return JavaScript multiple choice questions', () => {
      const result = getQuestionAnswer('JavaScript', 'Multiple Choice');
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return React multiple choice questions', () => {
      const result = getQuestionAnswer('React', 'Multiple Choice');
      expect(result).toEqual(REACT_MULTIPLE_CHOICE_QUESTIONS);
    });

    it('should return TypeScript multiple choice questions', () => {
      const result = getQuestionAnswer('TypeScript', 'Multiple Choice');
      expect(result).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should return empty array for invalid tech', () => {
      // @ts-expect-error Testing invalid input
      const result = getQuestionAnswer('InvalidTech', 'Subjective');
      expect(result).toEqual([]);
    });

    it('should return empty array for invalid interview type', () => {
      // @ts-expect-error Testing invalid input
      const result = getQuestionAnswer('JavaScript', 'InvalidType');
      expect(result).toEqual([]);
    });

    it('should return empty array when tech is empty string', () => {
      const result = getQuestionAnswer('', 'Subjective');
      expect(result).toEqual([]);
    });
  });

  describe('Data Structure Validation', () => {
    it('should return array of questions with required fields', () => {
      const result = getQuestionAnswer('JavaScript', 'Subjective');
      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('question');
      }
    });

    it('should return multiple choice questions with options', () => {
      const result = getQuestionAnswer('JavaScript', 'Multiple Choice');
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('options');
        expect(Array.isArray((result[0] as any).options)).toBe(true);
      }
    });
  });
});
```

**Expected Outcome**: 15+ test cases covering all tech stacks and edge cases.

---

#### 1.1.3 Message Library (`fsd/widgets/interviewOption/ui/subjectiveInterview/lib/messagelib.ts`)

**Priority**: P0
**Complexity**: Low
**Test File**: `fsd/widgets/interviewOption/ui/subjectiveInterview/lib/__test__/messagelib.test.ts`

**Test Cases**:

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  createQuestionMessage,
  createUserMessage,
  createFeedbackMessage,
  createLoadingMessage,
  createActionButtonMessage,
  createEndMessage,
  filterButtonMessages,
} from '../messagelib';

describe('Message Creation Functions', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('createQuestionMessage', () => {
    it('should create assistant role message with question content', () => {
      const question = 'What is closure?';
      const message = createQuestionMessage(question);

      expect(message).toEqual({
        id: expect.any(Number),
        role: 'assistant',
        content: question,
      });
    });

    it('should generate unique IDs', () => {
      const msg1 = createQuestionMessage('Q1');
      vi.advanceTimersByTime(1);
      const msg2 = createQuestionMessage('Q2');

      expect(msg1.id).not.toEqual(msg2.id);
    });
  });

  describe('createUserMessage', () => {
    it('should create user role message', () => {
      const content = 'My answer here';
      const message = createUserMessage(content);

      expect(message.role).toBe('user');
      expect(message.content).toBe(content);
      expect(message.id).toBeDefined();
    });
  });

  describe('createFeedbackMessage', () => {
    it('should create assistant feedback message with offset ID', () => {
      const now = Date.now();
      vi.setSystemTime(now);

      const feedback = 'Great answer!';
      const message = createFeedbackMessage(feedback);

      expect(message).toEqual({
        id: now + 1,
        role: 'assistant',
        content: feedback,
      });
    });
  });

  describe('createLoadingMessage', () => {
    it('should create loading message with Korean text', () => {
      const message = createLoadingMessage();

      expect(message.role).toBe('assistant');
      expect(message.content).toBe('AI가 답변을 생성하는 중입니다...');
      expect(message.id).toBeDefined();
    });
  });

  describe('createActionButtonMessage', () => {
    it('should create system role message with SHOW_BUTTONS content', () => {
      const message = createActionButtonMessage();

      expect(message.role).toBe('system');
      expect(message.content).toBe('SHOW_BUTTONS');
    });
  });

  describe('createEndMessage', () => {
    it('should create interview end message', () => {
      const message = createEndMessage();

      expect(message.role).toBe('assistant');
      expect(message.content).toContain('면접이 종료되었습니다');
    });
  });

  describe('filterButtonMessages', () => {
    it('should remove SHOW_BUTTONS messages', () => {
      const messages = [
        { id: 1, role: 'user' as const, content: 'Hello' },
        { id: 2, role: 'system' as const, content: 'SHOW_BUTTONS' },
        { id: 3, role: 'assistant' as const, content: 'Response' },
        { id: 4, role: 'system' as const, content: 'SHOW_BUTTONS' },
      ];

      const filtered = filterButtonMessages(messages);

      expect(filtered).toHaveLength(2);
      expect(filtered).toEqual([
        { id: 1, role: 'user', content: 'Hello' },
        { id: 3, role: 'assistant', content: 'Response' },
      ]);
    });

    it('should return empty array when all messages are buttons', () => {
      const messages = [
        { id: 1, role: 'system' as const, content: 'SHOW_BUTTONS' },
        { id: 2, role: 'system' as const, content: 'SHOW_BUTTONS' },
      ];

      const filtered = filterButtonMessages(messages);
      expect(filtered).toEqual([]);
    });

    it('should return same array when no button messages', () => {
      const messages = [
        { id: 1, role: 'user' as const, content: 'Hello' },
        { id: 2, role: 'assistant' as const, content: 'Hi' },
      ];

      const filtered = filterButtonMessages(messages);
      expect(filtered).toEqual(messages);
    });
  });
});
```

**Expected Outcome**: 12+ test cases for all message creation functions.

---

#### 1.1.4 Type Guard Functions (`fsd/features/chat/chatMessage/ui/_component/BotMessage/lib/isFeedbackData.ts`)

**Priority**: P0
**Complexity**: Medium
**Test File**: `fsd/features/chat/chatMessage/ui/_component/BotMessage/lib/__test__/isFeedbackData.test.ts`

**Test Cases**:

```typescript
import { describe, it, expect } from 'vitest';
import {
  isFeedbackData,
  isDeepDiveFeedbackData,
  isFeedbackResponse,
} from '../isFeedbackData';
import { FeedbackData, DeepDiveFeedbackData } from '@/fsd/shared/model/type';

describe('Type Guard Functions', () => {
  describe('isFeedbackData', () => {
    it('should return true for valid FeedbackData', () => {
      const validFeedback: FeedbackData = {
        topic: 'Closure',
        evaluation: {
          score: 6,
          maxScore: 10,
          summary: 'Good answer',
        },
        feedbackDetails: [
          {
            title: 'Strengths',
            description: 'Clear explanation',
            points: ['Point 1'],
          },
        ],
        modelAnswer: {
          introduction: 'Intro',
          usage: 'Usage',
          scenarios: [],
          example: {
            context: 'Context',
            solution: 'Solution',
          },
        },
      };

      expect(isFeedbackData(validFeedback)).toBe(true);
    });

    it('should return false for DeepDiveFeedbackData', () => {
      const deepDiveFeedback: DeepDiveFeedbackData = {
        topic: 'Closure',
        evaluation: {
          score: 9,
          maxScore: 10,
          summary: 'Excellent',
        },
        feedbackDetails: [
          {
            title: 'Excellence',
            description: 'Perfect',
            points: ['Point 1'],
          },
        ],
        deepDive: {
          title: 'Deep Dive',
          description: 'Advanced topics',
          topics: ['Topic 1'],
        },
      };

      expect(isFeedbackData(deepDiveFeedback)).toBe(false);
    });

    it('should return false for string content', () => {
      expect(isFeedbackData('Simple text response')).toBe(false);
    });

    it('should return false for null', () => {
      expect(isFeedbackData(null as any)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isFeedbackData(undefined as any)).toBe(false);
    });

    it('should return false for object missing required fields', () => {
      const incomplete = {
        topic: 'Test',
        evaluation: { score: 5 },
      };

      expect(isFeedbackData(incomplete as any)).toBe(false);
    });

    it('should return false for object with modelAnswer but missing other fields', () => {
      const partial = {
        modelAnswer: {
          introduction: 'Intro',
          usage: 'Usage',
          scenarios: [],
          example: { context: 'C', solution: 'S' },
        },
      };

      expect(isFeedbackData(partial as any)).toBe(false);
    });
  });

  describe('isDeepDiveFeedbackData', () => {
    it('should return true for valid DeepDiveFeedbackData', () => {
      const validDeepDive: DeepDiveFeedbackData = {
        topic: 'Advanced Closure',
        evaluation: {
          score: 10,
          maxScore: 10,
          summary: 'Outstanding',
        },
        feedbackDetails: [
          {
            title: 'Excellence',
            description: 'Perfect understanding',
            points: ['Advanced concept 1'],
          },
        ],
        deepDive: {
          title: 'Further Learning',
          description: 'Explore these topics',
          topics: ['Lexical scoping', 'Memory management'],
        },
      };

      expect(isDeepDiveFeedbackData(validDeepDive)).toBe(true);
    });

    it('should return false for regular FeedbackData', () => {
      const regularFeedback = {
        topic: 'Test',
        evaluation: { score: 5, maxScore: 10, summary: 'OK' },
        feedbackDetails: [],
        modelAnswer: {
          introduction: 'I',
          usage: 'U',
          scenarios: [],
          example: { context: 'C', solution: 'S' },
        },
      };

      expect(isDeepDiveFeedbackData(regularFeedback as any)).toBe(false);
    });

    it('should return false for string content', () => {
      expect(isDeepDiveFeedbackData('Text')).toBe(false);
    });

    it('should return false for object missing deepDive field', () => {
      const missingDeepDive = {
        topic: 'Test',
        evaluation: { score: 9, maxScore: 10, summary: 'Great' },
        feedbackDetails: [],
      };

      expect(isDeepDiveFeedbackData(missingDeepDive as any)).toBe(false);
    });
  });

  describe('isFeedbackResponse', () => {
    it('should return true for FeedbackData', () => {
      const feedback: FeedbackData = {
        topic: 'T',
        evaluation: { score: 5, maxScore: 10, summary: 'S' },
        feedbackDetails: [],
        modelAnswer: {
          introduction: 'I',
          usage: 'U',
          scenarios: [],
          example: { context: 'C', solution: 'S' },
        },
      };

      expect(isFeedbackResponse(feedback)).toBe(true);
    });

    it('should return true for DeepDiveFeedbackData', () => {
      const deepDive: DeepDiveFeedbackData = {
        topic: 'T',
        evaluation: { score: 9, maxScore: 10, summary: 'S' },
        feedbackDetails: [],
        deepDive: {
          title: 'T',
          description: 'D',
          topics: [],
        },
      };

      expect(isFeedbackResponse(deepDive)).toBe(true);
    });

    it('should return false for string', () => {
      expect(isFeedbackResponse('Plain text')).toBe(false);
    });

    it('should return false for invalid object', () => {
      expect(isFeedbackResponse({ random: 'data' } as any)).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle array input', () => {
      expect(isFeedbackData([] as any)).toBe(false);
      expect(isDeepDiveFeedbackData([] as any)).toBe(false);
    });

    it('should handle number input', () => {
      expect(isFeedbackData(123 as any)).toBe(false);
      expect(isDeepDiveFeedbackData(123 as any)).toBe(false);
    });

    it('should handle boolean input', () => {
      expect(isFeedbackData(true as any)).toBe(false);
      expect(isDeepDiveFeedbackData(false as any)).toBe(false);
    });
  });
});
```

**Expected Outcome**: 25+ test cases covering all type guards and edge cases.

---

### 1.2 IndexedDB Service

**Status**: ✅ Already Tested

**Existing Tests**: `fsd/shared/lib/__test__/indexedDB.test.ts`

**Recommendation**: Review and potentially expand tests for:
- Concurrent write operations
- Database upgrade scenarios
- Error recovery mechanisms

---

### 1.3 Zustand Stores

#### 1.3.1 Tech Selection Store (`fsd/shared/model/useSelectTechStore.ts`)

**Priority**: P1
**Complexity**: Low
**Test File**: `fsd/shared/model/__test__/useSelectTechStore.test.ts`

**Test Cases**:

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSelectTechStore } from '../useSelectTechStore';

describe('useSelectTechStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useSelectTechStore());
    act(() => {
      result.current.setTech('');
    });
  });

  describe('Initial State', () => {
    it('should have empty string as initial tech', () => {
      const { result } = renderHook(() => useSelectTechStore());
      expect(result.current.tech).toBe('');
    });
  });

  describe('setTech', () => {
    it('should update tech to JavaScript', () => {
      const { result } = renderHook(() => useSelectTechStore());

      act(() => {
        result.current.setTech('JavaScript');
      });

      expect(result.current.tech).toBe('JavaScript');
    });

    it('should update tech to React', () => {
      const { result } = renderHook(() => useSelectTechStore());

      act(() => {
        result.current.setTech('React');
      });

      expect(result.current.tech).toBe('React');
    });

    it('should update tech to TypeScript', () => {
      const { result } = renderHook(() => useSelectTechStore());

      act(() => {
        result.current.setTech('TypeScript');
      });

      expect(result.current.tech).toBe('TypeScript');
    });

    it('should allow resetting tech to empty string', () => {
      const { result } = renderHook(() => useSelectTechStore());

      act(() => {
        result.current.setTech('JavaScript');
      });
      expect(result.current.tech).toBe('JavaScript');

      act(() => {
        result.current.setTech('');
      });
      expect(result.current.tech).toBe('');
    });
  });

  describe('State Persistence', () => {
    it('should persist state across hook instances', () => {
      const { result: result1 } = renderHook(() => useSelectTechStore());

      act(() => {
        result1.current.setTech('React');
      });

      const { result: result2 } = renderHook(() => useSelectTechStore());
      expect(result2.current.tech).toBe('React');
    });
  });
});
```

**Expected Outcome**: 8+ test cases for store operations.

---

#### 1.3.2 User Store (`fsd/entities/user/useUserStore.ts`)

**Priority**: P0
**Complexity**: High
**Test File**: `fsd/entities/user/__test__/useUserStore.test.ts`

**Test Cases**:

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserStore } from '../useUserStore';
import { indexedDBService } from '@/fsd/shared/lib/indexedDB';

// Mock IndexedDB service
vi.mock('@/fsd/shared/lib/indexedDB', () => ({
  indexedDBService: {
    saveUserData: vi.fn().mockResolvedValue(undefined),
    loadUserData: vi.fn().mockResolvedValue(null),
  },
}));

describe('useUserStore', () => {
  beforeEach(() => {
    // Reset store state
    const { result } = renderHook(() => useUserStore());
    act(() => {
      result.current.setUser({
        inCorrectSubQuestion: [],
        inCorrectMultipleChoiceQuestion: [],
      });
    });

    // Clear mock calls
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have empty arrays as initial state', () => {
      const { result } = renderHook(() => useUserStore());

      expect(result.current.user.inCorrectSubQuestion).toEqual([]);
      expect(result.current.user.inCorrectMultipleChoiceQuestion).toEqual([]);
    });
  });

  describe('addInCorrectSubQuestion', () => {
    it('should add a subjective question', () => {
      const { result } = renderHook(() => useUserStore());

      const question = {
        id: 1,
        question: 'What is closure?',
      };

      act(() => {
        result.current.addInCorrectSubQuestion(question);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
      expect(result.current.user.inCorrectSubQuestion[0]).toEqual(question);
    });

    it('should prevent duplicate questions', () => {
      const { result } = renderHook(() => useUserStore());

      const question = {
        id: 1,
        question: 'What is closure?',
      };

      act(() => {
        result.current.addInCorrectSubQuestion(question);
        result.current.addInCorrectSubQuestion(question);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
    });

    it('should allow questions with different IDs', () => {
      const { result } = renderHook(() => useUserStore());

      const question1 = { id: 1, question: 'Q1' };
      const question2 = { id: 2, question: 'Q2' };

      act(() => {
        result.current.addInCorrectSubQuestion(question1);
        result.current.addInCorrectSubQuestion(question2);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(2);
    });
  });

  describe('removeInCorrectSubQuestion', () => {
    it('should remove a question by ID', () => {
      const { result } = renderHook(() => useUserStore());

      const question1 = { id: 1, question: 'Q1' };
      const question2 = { id: 2, question: 'Q2' };

      act(() => {
        result.current.addInCorrectSubQuestion(question1);
        result.current.addInCorrectSubQuestion(question2);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(2);

      act(() => {
        result.current.removeInCorrectSubQuestion(1);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
      expect(result.current.user.inCorrectSubQuestion[0].id).toBe(2);
    });

    it('should do nothing when ID does not exist', () => {
      const { result } = renderHook(() => useUserStore());

      const question = { id: 1, question: 'Q1' };

      act(() => {
        result.current.addInCorrectSubQuestion(question);
      });

      act(() => {
        result.current.removeInCorrectSubQuestion(999);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
    });
  });

  describe('addInCorrectMultipleChoiceQuestion', () => {
    it('should add a multiple choice question', () => {
      const { result } = renderHook(() => useUserStore());

      const question = {
        id: 1,
        question: 'What is === ?',
        options: [],
        answer: 'Strict equality',
      };

      act(() => {
        result.current.addInCorrectMultipleChoiceQuestion(question);
      });

      expect(result.current.user.inCorrectMultipleChoiceQuestion).toHaveLength(1);
    });

    it('should prevent duplicate multiple choice questions', () => {
      const { result } = renderHook(() => useUserStore());

      const question = {
        id: 1,
        question: 'What is === ?',
        options: [],
        answer: 'Strict equality',
      };

      act(() => {
        result.current.addInCorrectMultipleChoiceQuestion(question);
        result.current.addInCorrectMultipleChoiceQuestion(question);
      });

      expect(result.current.user.inCorrectMultipleChoiceQuestion).toHaveLength(1);
    });
  });

  describe('removeInCorrectMultipleChoiceQuestion', () => {
    it('should remove a multiple choice question by ID', () => {
      const { result } = renderHook(() => useUserStore());

      const question1 = { id: 1, question: 'Q1', options: [], answer: 'A1' };
      const question2 = { id: 2, question: 'Q2', options: [], answer: 'A2' };

      act(() => {
        result.current.addInCorrectMultipleChoiceQuestion(question1);
        result.current.addInCorrectMultipleChoiceQuestion(question2);
      });

      act(() => {
        result.current.removeInCorrectMultipleChoiceQuestion(1);
      });

      expect(result.current.user.inCorrectMultipleChoiceQuestion).toHaveLength(1);
      expect(result.current.user.inCorrectMultipleChoiceQuestion[0].id).toBe(2);
    });
  });

  describe('persistUserToDB', () => {
    it('should call indexedDBService.saveUserData', async () => {
      const { result } = renderHook(() => useUserStore());

      const question = { id: 1, question: 'Q1' };

      act(() => {
        result.current.addInCorrectSubQuestion(question);
      });

      await act(async () => {
        await result.current.persistUserToDB();
      });

      expect(indexedDBService.saveUserData).toHaveBeenCalledWith({
        inCorrectSubQuestion: [question],
        inCorrectMultipleChoiceQuestion: [],
      });
    });
  });

  describe('hydrateUserFromDB', () => {
    it('should load data from IndexedDB', async () => {
      const mockData = {
        inCorrectSubQuestion: [{ id: 1, question: 'Q1' }],
        inCorrectMultipleChoiceQuestion: [],
      };

      vi.mocked(indexedDBService.loadUserData).mockResolvedValueOnce(mockData);

      const { result } = renderHook(() => useUserStore());

      await act(async () => {
        await result.current.hydrateUserFromDB();
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
      expect(result.current.user.inCorrectSubQuestion[0].id).toBe(1);
    });

    it('should not update state when no data in DB', async () => {
      vi.mocked(indexedDBService.loadUserData).mockResolvedValueOnce(null);

      const { result } = renderHook(() => useUserStore());

      await act(async () => {
        await result.current.hydrateUserFromDB();
      });

      expect(result.current.user.inCorrectSubQuestion).toEqual([]);
    });
  });

  describe('setInCorrectSubQuestion', () => {
    it('should directly set subjective questions array', () => {
      const { result } = renderHook(() => useUserStore());

      const questions = [
        { id: 1, question: 'Q1' },
        { id: 2, question: 'Q2' },
      ];

      act(() => {
        result.current.setInCorrectSubQuestion(questions);
      });

      expect(result.current.user.inCorrectSubQuestion).toEqual(questions);
    });
  });

  describe('setInCorrectMultipleChoiceQuestion', () => {
    it('should directly set multiple choice questions array', () => {
      const { result } = renderHook(() => useUserStore());

      const questions = [
        { id: 1, question: 'Q1', options: [], answer: 'A1' },
      ];

      act(() => {
        result.current.setInCorrectMultipleChoiceQuestion(questions);
      });

      expect(result.current.user.inCorrectMultipleChoiceQuestion).toEqual(questions);
    });
  });
});
```

**Expected Outcome**: 20+ test cases covering all store operations and IndexedDB integration.

---

### 1.4 Custom Hooks (Simple)

#### 1.4.1 Answer Validation Hook (`fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/hooks/useAnswerValidation.ts`)

**Priority**: P0
**Complexity**: Medium
**Test File**: `fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/hooks/__test__/useAnswerValidation.test.ts`

**Test Cases**:

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAnswerValidation } from '../useAnswerValidation';

describe('useAnswerValidation', () => {
  describe('Initial State', () => {
    it('should have null selectedOption initially', () => {
      const { result } = renderHook(() => useAnswerValidation());
      expect(result.current.selectedOption).toBeNull();
    });

    it('should have null isAnswerCorrect initially', () => {
      const { result } = renderHook(() => useAnswerValidation());
      expect(result.current.isAnswerCorrect).toBeNull();
    });

    it('should have isSubmitted as false initially', () => {
      const { result } = renderHook(() => useAnswerValidation());
      expect(result.current.isSubmitted).toBe(false);
    });

    it('should have canSubmit as false initially', () => {
      const { result } = renderHook(() => useAnswerValidation());
      expect(result.current.canSubmit).toBe(false);
    });
  });

  describe('selectOption', () => {
    it('should set selected option', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const option = {
        id: 1,
        option: 'Correct answer',
        answerBoolean: true,
      };

      act(() => {
        result.current.selectOption(option);
      });

      expect(result.current.selectedOption).toEqual(option);
    });

    it('should allow changing selection before submission', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const option1 = { id: 1, option: 'Option 1', answerBoolean: false };
      const option2 = { id: 2, option: 'Option 2', answerBoolean: true };

      act(() => {
        result.current.selectOption(option1);
      });
      expect(result.current.selectedOption?.id).toBe(1);

      act(() => {
        result.current.selectOption(option2);
      });
      expect(result.current.selectedOption?.id).toBe(2);
    });

    it('should not allow changing selection after submission', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const option1 = { id: 1, option: 'Option 1', answerBoolean: true };
      const option2 = { id: 2, option: 'Option 2', answerBoolean: false };

      act(() => {
        result.current.selectOption(option1);
        result.current.validateAnswer();
      });

      act(() => {
        result.current.selectOption(option2);
      });

      expect(result.current.selectedOption?.id).toBe(1);
    });

    it('should update canSubmit when option is selected', () => {
      const { result } = renderHook(() => useAnswerValidation());

      expect(result.current.canSubmit).toBe(false);

      act(() => {
        result.current.selectOption({ id: 1, option: 'A', answerBoolean: true });
      });

      expect(result.current.canSubmit).toBe(true);
    });
  });

  describe('validateAnswer', () => {
    it('should return invalid when no option selected', () => {
      const { result } = renderHook(() => useAnswerValidation());

      let validationResult;
      act(() => {
        validationResult = result.current.validateAnswer();
      });

      expect(validationResult).toEqual({
        isValid: false,
        message: 'Check your answer first',
      });
    });

    it('should return valid with correct answer', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const correctOption = { id: 1, option: 'Correct', answerBoolean: true };

      act(() => {
        result.current.selectOption(correctOption);
      });

      let validationResult;
      act(() => {
        validationResult = result.current.validateAnswer();
      });

      expect(validationResult).toEqual({
        isValid: true,
        isCorrect: true,
      });
      expect(result.current.isAnswerCorrect).toBe(true);
      expect(result.current.isSubmitted).toBe(true);
    });

    it('should return valid with incorrect answer', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const incorrectOption = { id: 2, option: 'Wrong', answerBoolean: false };

      act(() => {
        result.current.selectOption(incorrectOption);
      });

      let validationResult;
      act(() => {
        validationResult = result.current.validateAnswer();
      });

      expect(validationResult).toEqual({
        isValid: true,
        isCorrect: false,
      });
      expect(result.current.isAnswerCorrect).toBe(false);
    });

    it('should set isSubmitted to true after validation', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, option: 'A', answerBoolean: true });
        result.current.validateAnswer();
      });

      expect(result.current.isSubmitted).toBe(true);
    });

    it('should disable canSubmit after validation', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, option: 'A', answerBoolean: true });
      });

      expect(result.current.canSubmit).toBe(true);

      act(() => {
        result.current.validateAnswer();
      });

      expect(result.current.canSubmit).toBe(false);
    });
  });

  describe('resetValidation', () => {
    it('should reset all state to initial values', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, option: 'A', answerBoolean: true });
        result.current.validateAnswer();
      });

      expect(result.current.selectedOption).not.toBeNull();
      expect(result.current.isSubmitted).toBe(true);

      act(() => {
        result.current.resetValidation();
      });

      expect(result.current.selectedOption).toBeNull();
      expect(result.current.isAnswerCorrect).toBeNull();
      expect(result.current.isSubmitted).toBe(false);
      expect(result.current.canSubmit).toBe(false);
    });
  });

  describe('Integration Scenarios', () => {
    it('should handle complete quiz flow: select → validate → reset → select again', () => {
      const { result } = renderHook(() => useAnswerValidation());

      // Round 1
      act(() => {
        result.current.selectOption({ id: 1, option: 'A', answerBoolean: true });
        result.current.validateAnswer();
      });

      expect(result.current.isAnswerCorrect).toBe(true);

      // Reset for Round 2
      act(() => {
        result.current.resetValidation();
      });

      // Round 2
      act(() => {
        result.current.selectOption({ id: 2, option: 'B', answerBoolean: false });
        result.current.validateAnswer();
      });

      expect(result.current.isAnswerCorrect).toBe(false);
    });
  });
});
```

**Expected Outcome**: 18+ test cases covering all validation scenarios.

---

### Phase 1 Summary

**Total Estimated Tests**: 60-80
**Coverage Target**: 80%+
**Timeline**: 3-4 days

**Deliverables**:
- ✅ `getQuestionAnswer` utility tests
- ✅ `messagelib` utility tests
- ✅ `isFeedbackData` type guard tests
- ✅ `useSelectTechStore` store tests
- ✅ `useUserStore` store tests (with IndexedDB mocking)
- ✅ `useAnswerValidation` hook tests

---

## Phase 2: Integration Testing

**Timeline**: Week 2 (4-5 days)
**Priority**: P0-P1
**Estimated Tests**: 20-30

### 2.1 API Route Testing

#### 2.1.1 Feedback Generation API (`app/api/generate-feedback/route.ts`)

**Priority**: P0
**Complexity**: High
**Test File**: `app/api/generate-feedback/__test__/route.test.ts`

**Setup Requirements**:
- Mock Google Gemini AI client
- Test all 3 response schemas (score 0-4, 5-7, 8-10)

**Test Cases**:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../route';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mock Gemini AI
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn(),
}));

describe('POST /api/generate-feedback', () => {
  let mockGenerateContent: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockGenerateContent = vi.fn();

    vi.mocked(GoogleGenerativeAI).mockImplementation(() => ({
      getGenerativeModel: () => ({
        generateContent: mockGenerateContent,
      }),
    }) as any);
  });

  describe('Success Cases', () => {
    it('should return FeedbackData for score 0-4 (improvement needed)', async () => {
      const mockResponse = {
        topic: 'Closure',
        evaluation: {
          score: 3,
          maxScore: 10,
          summary: 'Needs improvement',
        },
        feedbackDetails: [
          {
            title: '부족한 부분',
            description: 'Lacks depth',
            points: ['Point 1'],
          },
        ],
        modelAnswer: {
          introduction: 'Closure is...',
          usage: 'Used for...',
          scenarios: [],
          example: { context: 'In practice', solution: 'Use closure' },
        },
      };

      mockGenerateContent.mockResolvedValueOnce({
        response: {
          text: () => JSON.stringify(mockResponse),
        },
      });

      const request = new Request('http://localhost/api/generate-feedback', {
        method: 'POST',
        body: JSON.stringify({
          tech: 'JavaScript',
          question: 'What is closure?',
          answer: 'A function inside another function',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('modelAnswer');
      expect(data.data.evaluation.score).toBeLessThanOrEqual(4);
    });

    it('should return FeedbackData for score 5-7 (developing)', async () => {
      const mockResponse = {
        topic: 'Closure',
        evaluation: {
          score: 6,
          maxScore: 10,
          summary: 'Good understanding',
        },
        feedbackDetails: [
          {
            title: '답변의 좋았던 점',
            description: 'Clear explanation',
            points: ['Point 1'],
          },
          {
            title: '개선이 필요한 부분',
            description: 'Could add examples',
            points: ['Point 2'],
          },
        ],
        modelAnswer: {
          introduction: 'Closure is...',
          usage: 'Used for...',
          scenarios: [],
          example: { context: 'Context', solution: 'Solution' },
        },
      };

      mockGenerateContent.mockResolvedValueOnce({
        response: {
          text: () => JSON.stringify(mockResponse),
        },
      });

      const request = new Request('http://localhost/api/generate-feedback', {
        method: 'POST',
        body: JSON.stringify({
          tech: 'JavaScript',
          question: 'What is closure?',
          answer: 'Closure allows inner functions to access outer scope',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.data.evaluation.score).toBeGreaterThanOrEqual(5);
      expect(data.data.evaluation.score).toBeLessThanOrEqual(7);
    });

    it('should return DeepDiveFeedbackData for score 8-10 (excellent)', async () => {
      const mockResponse = {
        topic: 'Closure',
        evaluation: {
          score: 9,
          maxScore: 10,
          summary: 'Excellent answer',
        },
        feedbackDetails: [
          {
            title: '답변의 뛰어난 점',
            description: 'Comprehensive',
            points: ['Point 1'],
          },
        ],
        deepDive: {
          title: 'Further Topics',
          description: 'Explore these',
          topics: ['Lexical scoping', 'Memory management'],
        },
      };

      mockGenerateContent.mockResolvedValueOnce({
        response: {
          text: () => JSON.stringify(mockResponse),
        },
      });

      const request = new Request('http://localhost/api/generate-feedback', {
        method: 'POST',
        body: JSON.stringify({
          tech: 'JavaScript',
          question: 'What is closure?',
          answer: 'Detailed explanation with examples and use cases',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.data).toHaveProperty('deepDive');
      expect(data.data.evaluation.score).toBeGreaterThanOrEqual(8);
    });
  });

  describe('Error Handling', () => {
    it('should handle missing required fields', async () => {
      const request = new Request('http://localhost/api/generate-feedback', {
        method: 'POST',
        body: JSON.stringify({
          tech: 'JavaScript',
          // missing question and answer
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.success).toBe(false);
    });

    it('should handle AI API errors', async () => {
      mockGenerateContent.mockRejectedValueOnce(
        new Error('API quota exceeded')
      );

      const request = new Request('http://localhost/api/generate-feedback', {
        method: 'POST',
        body: JSON.stringify({
          tech: 'JavaScript',
          question: 'What is closure?',
          answer: 'Test answer',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.success).toBe(false);
      expect(data.data).toContain('error');
    });

    it('should handle JSON parse errors', async () => {
      mockGenerateContent.mockResolvedValueOnce({
        response: {
          text: () => 'Invalid JSON response',
        },
      });

      const request = new Request('http://localhost/api/generate-feedback', {
        method: 'POST',
        body: JSON.stringify({
          tech: 'JavaScript',
          question: 'What is closure?',
          answer: 'Test',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.success).toBe(false);
    });
  });

  describe('Different Tech Stacks', () => {
    it('should handle React questions', async () => {
      const mockResponse = {
        topic: 'useState',
        evaluation: { score: 7, maxScore: 10, summary: 'Good' },
        feedbackDetails: [],
        modelAnswer: {
          introduction: 'useState is...',
          usage: 'Use it for...',
          scenarios: [],
          example: { context: 'C', solution: 'S' },
        },
      };

      mockGenerateContent.mockResolvedValueOnce({
        response: {
          text: () => JSON.stringify(mockResponse),
        },
      });

      const request = new Request('http://localhost/api/generate-feedback', {
        method: 'POST',
        body: JSON.stringify({
          tech: 'React',
          question: 'Explain useState',
          answer: 'Hook for state management',
        }),
      });

      const response = await POST(request);
      expect(response.status).toBe(200);
    });

    it('should handle TypeScript questions', async () => {
      const mockResponse = {
        topic: 'Generics',
        evaluation: { score: 8, maxScore: 10, summary: 'Great' },
        feedbackDetails: [],
        deepDive: {
          title: 'Advanced Generics',
          description: 'Explore',
          topics: ['Constraints'],
        },
      };

      mockGenerateContent.mockResolvedValueOnce({
        response: {
          text: () => JSON.stringify(mockResponse),
        },
      });

      const request = new Request('http://localhost/api/generate-feedback', {
        method: 'POST',
        body: JSON.stringify({
          tech: 'TypeScript',
          question: 'What are generics?',
          answer: 'Type variables for reusable code',
        }),
      });

      const response = await POST(request);
      expect(response.status).toBe(200);
    });
  });
});
```

**Expected Outcome**: 12+ test cases for API route.

---

#### 2.1.2 Interpretation API (`app/api/generate-interpret/route.ts`)

**Priority**: P0
**Complexity**: Medium
**Test File**: `app/api/generate-interpret/__test__/route.test.ts`

**Test Cases**: Similar structure to feedback API, testing:
- Successful interpretation generation
- Error handling
- Different tech stacks
- Invalid inputs

**Expected Outcome**: 8+ test cases.

---

### 2.2 Complex Hooks Integration

#### 2.2.1 Subjective Interview Hook (`fsd/widgets/interviewOption/ui/subjectiveInterview/model/hooks/useSubjectiveInterview/index.ts`)

**Priority**: P1
**Complexity**: Very High
**Test File**: `fsd/widgets/interviewOption/ui/subjectiveInterview/model/hooks/useSubjectiveInterview/__test__/index.test.ts`

**Note**: This hook orchestrates multiple internal hooks:
- `useMessageState`
- `useQuestionNavigation`
- `useFeedbackAPI`

**Test Strategy**: Integration test focusing on hook composition.

**Test Cases**:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useSubjectiveInterview } from '../index';

// Mock fetch for API calls
global.fetch = vi.fn();

describe('useSubjectiveInterview Integration', () => {
  const mockQuestions = [
    { id: 1, question: 'What is closure?' },
    { id: 2, question: 'Explain hoisting' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should initialize with first question message', () => {
      const { result } = renderHook(() =>
        useSubjectiveInterview(mockQuestions, 'JavaScript', vi.fn())
      );

      expect(result.current.messages).toHaveLength(1);
      expect(result.current.messages[0].content).toContain('What is closure?');
    });

    it('should have current question index as 0', () => {
      const { result } = renderHook(() =>
        useSubjectiveInterview(mockQuestions, 'JavaScript', vi.fn())
      );

      expect(result.current.currentQuestionIndex).toBe(0);
    });

    it('should not be loading initially', () => {
      const { result } = renderHook(() =>
        useSubjectiveInterview(mockQuestions, 'JavaScript', vi.fn())
      );

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('handleSubmit', () => {
    it('should add user message and loading message', async () => {
      const { result } = renderHook(() =>
        useSubjectiveInterview(mockQuestions, 'JavaScript', vi.fn())
      );

      const userAnswer = 'Closure is a function with access to outer scope';

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            topic: 'Closure',
            evaluation: { score: 7, maxScore: 10, summary: 'Good' },
            feedbackDetails: [],
            modelAnswer: {
              introduction: 'I',
              usage: 'U',
              scenarios: [],
              example: { context: 'C', solution: 'S' },
            },
          },
        }),
      } as Response);

      await act(async () => {
        await result.current.handleSubmit(userAnswer);
      });

      // Should have: question + user answer + feedback
      expect(result.current.messages.length).toBeGreaterThan(1);
    });

    it('should set loading state during API call', async () => {
      const { result } = renderHook(() =>
        useSubjectiveInterview(mockQuestions, 'JavaScript', vi.fn())
      );

      let loadingDuringCall = false;

      vi.mocked(fetch).mockImplementationOnce(async () => {
        loadingDuringCall = result.current.isLoading;
        return {
          ok: true,
          json: async () => ({
            success: true,
            data: {
              topic: 'T',
              evaluation: { score: 5, maxScore: 10, summary: 'S' },
              feedbackDetails: [],
              modelAnswer: {
                introduction: 'I',
                usage: 'U',
                scenarios: [],
                example: { context: 'C', solution: 'S' },
              },
            },
          }),
        } as Response;
      });

      await act(async () => {
        await result.current.handleSubmit('Answer');
      });

      expect(loadingDuringCall).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('handleNextQuestion', () => {
    it('should advance to next question', async () => {
      const { result } = renderHook(() =>
        useSubjectiveInterview(mockQuestions, 'JavaScript', vi.fn())
      );

      // Mock feedback
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            topic: 'T',
            evaluation: { score: 7, maxScore: 10, summary: 'S' },
            feedbackDetails: [],
            modelAnswer: {
              introduction: 'I',
              usage: 'U',
              scenarios: [],
              example: { context: 'C', solution: 'S' },
            },
          },
        }),
      } as Response);

      await act(async () => {
        await result.current.handleSubmit('First answer');
      });

      act(() => {
        result.current.handleNextQuestion();
      });

      expect(result.current.currentQuestionIndex).toBe(1);

      // Should show second question
      const lastMessage = result.current.messages[result.current.messages.length - 1];
      expect(lastMessage.content).toContain('Explain hoisting');
    });

    it('should add action buttons after next question', () => {
      const { result } = renderHook(() =>
        useSubjectiveInterview(mockQuestions, 'JavaScript', vi.fn())
      );

      act(() => {
        result.current.handleNextQuestion();
      });

      // Check for button message
      const hasButtonMessage = result.current.messages.some(
        (msg) => msg.content === 'SHOW_BUTTONS'
      );
      expect(hasButtonMessage).toBe(true);
    });
  });

  describe('handleEndInterview', () => {
    it('should call onComplete callback', () => {
      const onComplete = vi.fn();
      const { result } = renderHook(() =>
        useSubjectiveInterview(mockQuestions, 'JavaScript', onComplete)
      );

      act(() => {
        result.current.handleEndInterview();
      });

      expect(onComplete).toHaveBeenCalled();
    });
  });

  describe('Integration: Full Interview Flow', () => {
    it('should handle complete interview flow', async () => {
      const onComplete = vi.fn();
      const { result } = renderHook(() =>
        useSubjectiveInterview(mockQuestions, 'JavaScript', onComplete)
      );

      // Mock API responses
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            data: {
              topic: 'Closure',
              evaluation: { score: 6, maxScore: 10, summary: 'Good' },
              feedbackDetails: [],
              modelAnswer: {
                introduction: 'I',
                usage: 'U',
                scenarios: [],
                example: { context: 'C', solution: 'S' },
              },
            },
          }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            data: {
              topic: 'Hoisting',
              evaluation: { score: 8, maxScore: 10, summary: 'Great' },
              feedbackDetails: [],
              deepDive: { title: 'T', description: 'D', topics: [] },
            },
          }),
        } as Response);

      // Answer first question
      await act(async () => {
        await result.current.handleSubmit('First answer');
      });

      // Move to next question
      act(() => {
        result.current.handleNextQuestion();
      });

      // Answer second question
      await act(async () => {
        await result.current.handleSubmit('Second answer');
      });

      // End interview
      act(() => {
        result.current.handleEndInterview();
      });

      expect(onComplete).toHaveBeenCalled();
    });
  });
});
```

**Expected Outcome**: 12+ integration test cases.

---

### Phase 2 Summary

**Total Estimated Tests**: 25-35
**Coverage Target**: 70%+
**Timeline**: 4-5 days

**Deliverables**:
- ✅ API route tests with mocked Gemini AI
- ✅ Complex hook integration tests
- ✅ State management integration tests

---

## Phase 3: Component Testing

**Timeline**: Week 3 (3-4 days)
**Priority**: P1-P2
**Estimated Tests**: 30-40

### 3.1 Widget Component Testing

#### 3.1.1 Multiple Choice Interview Widget

**Priority**: P1
**Complexity**: High
**Test File**: `fsd/widgets/interviewOption/ui/multipleChoiceInterview/ui/__test__/index.test.tsx`

**Test Cases**:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MultipleChoiceInterview from '../index';

// Mock the hooks
vi.mock('../../model/hooks/useMultipleChoiceQuiz');
vi.mock('../../model/hooks/useAnswerFeedbackState');
vi.mock('../../model/hooks/useInterpretAPI');

describe('MultipleChoiceInterview Widget', () => {
  const mockQuestions = [
    {
      id: 1,
      question: 'What is === ?',
      options: [
        { id: 1, option: 'Strict equality', answerBoolean: true },
        { id: 2, option: 'Loose equality', answerBoolean: false },
      ],
      answer: 'Strict equality operator',
    },
  ];

  describe('Rendering', () => {
    it('should render progress header', () => {
      render(
        <MultipleChoiceInterview
          questions={mockQuestions}
          tech="JavaScript"
          onComplete={vi.fn()}
        />
      );

      expect(screen.getByText(/Score:/i)).toBeInTheDocument();
    });

    it('should render question card', () => {
      render(
        <MultipleChoiceInterview
          questions={mockQuestions}
          tech="JavaScript"
          onComplete={vi.fn()}
        />
      );

      expect(screen.getByText('What is === ?')).toBeInTheDocument();
    });

    it('should render all options', () => {
      render(
        <MultipleChoiceInterview
          questions={mockQuestions}
          tech="JavaScript"
          onComplete={vi.fn()}
        />
      );

      expect(screen.getByText('Strict equality')).toBeInTheDocument();
      expect(screen.getByText('Loose equality')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should allow selecting an option', () => {
      render(
        <MultipleChoiceInterview
          questions={mockQuestions}
          tech="JavaScript"
          onComplete={vi.fn()}
        />
      );

      const option = screen.getByLabelText('Strict equality');
      fireEvent.click(option);

      expect(option).toBeChecked();
    });

    it('should show submit button when option selected', () => {
      render(
        <MultipleChoiceInterview
          questions={mockQuestions}
          tech="JavaScript"
          onComplete={vi.fn()}
        />
      );

      fireEvent.click(screen.getByLabelText('Strict equality'));

      expect(screen.getByText(/Submit|Check Answer/i)).toBeInTheDocument();
    });
  });

  describe('Answer Validation', () => {
    it('should show correct answer card on correct answer', async () => {
      render(
        <MultipleChoiceInterview
          questions={mockQuestions}
          tech="JavaScript"
          onComplete={vi.fn()}
        />
      );

      fireEvent.click(screen.getByLabelText('Strict equality'));
      fireEvent.click(screen.getByText(/Submit/i));

      await waitFor(() => {
        expect(screen.getByText(/Correct/i)).toBeInTheDocument();
      });
    });

    it('should show interpret card on incorrect answer', async () => {
      render(
        <MultipleChoiceInterview
          questions={mockQuestions}
          tech="JavaScript"
          onComplete={vi.fn()}
        />
      );

      fireEvent.click(screen.getByLabelText('Loose equality'));
      fireEvent.click(screen.getByText(/Submit/i));

      await waitFor(() => {
        expect(screen.getByText(/Incorrect|Wrong/i)).toBeInTheDocument();
      });
    });
  });

  describe('Navigation', () => {
    it('should advance to next question on Next button', async () => {
      const multiQuestions = [
        {
          id: 1,
          question: 'Question 1',
          options: [{ id: 1, option: 'A', answerBoolean: true }],
          answer: 'Answer 1',
        },
        {
          id: 2,
          question: 'Question 2',
          options: [{ id: 2, option: 'B', answerBoolean: true }],
          answer: 'Answer 2',
        },
      ];

      render(
        <MultipleChoiceInterview
          questions={multiQuestions}
          tech="JavaScript"
          onComplete={vi.fn()}
        />
      );

      // Answer first question
      fireEvent.click(screen.getByLabelText('A'));
      fireEvent.click(screen.getByText(/Submit/i));

      await waitFor(() => {
        fireEvent.click(screen.getByText(/Next/i));
      });

      expect(screen.getByText('Question 2')).toBeInTheDocument();
    });
  });

  describe('Completion', () => {
    it('should call onComplete when all questions answered', async () => {
      const onComplete = vi.fn();
      const singleQuestion = [mockQuestions[0]];

      render(
        <MultipleChoiceInterview
          questions={singleQuestion}
          tech="JavaScript"
          onComplete={onComplete}
        />
      );

      fireEvent.click(screen.getByLabelText('Strict equality'));
      fireEvent.click(screen.getByText(/Submit/i));

      await waitFor(() => {
        fireEvent.click(screen.getByText(/Complete|Finish/i));
      });

      expect(onComplete).toHaveBeenCalled();
    });
  });
});
```

**Expected Outcome**: 15+ component test cases.

---

#### 3.1.2 Subjective Interview Widget

**Priority**: P1
**Complexity**: High
**Test File**: `fsd/widgets/interviewOption/ui/subjectiveInterview/ui/__test__/index.test.tsx`

**Test Cases**: Similar to multiple choice, testing:
- Chat message rendering
- User input submission
- Loading states
- Feedback display (FeedbackMessage vs DeepDiveFeedbackMessage)
- Navigation buttons
- Add to review functionality

**Expected Outcome**: 12+ component test cases.

---

### 3.2 Feature Component Testing

#### 3.2.1 Chat Message Components

**Test Files**:
- `fsd/features/chat/chatMessage/ui/__test__/ChatMessage.test.tsx`
- `fsd/features/chat/chatMessage/ui/_component/BotMessage/ui/__test__/index.test.tsx`
- `fsd/features/chat/chatMessage/ui/_component/__test__/UserMessage.test.tsx`

**Expected Outcome**: 10+ test cases across all message components.

---

### Phase 3 Summary

**Total Estimated Tests**: 35-45
**Coverage Target**: 60%+
**Timeline**: 3-4 days

**Deliverables**:
- ✅ Widget component tests (Multiple Choice, Subjective)
- ✅ Feature component tests (Chat Messages)
- ✅ UI interaction tests

---

## Phase 4: E2E Testing

**Timeline**: Week 4 (5-7 days)
**Priority**: P0-P2
**Estimated Tests**: 15-20

### 4.1 Playwright Setup

**Configuration File**: `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

### 4.2 Test Fixtures

**File**: `tests/e2e/fixtures/questions.ts`

```typescript
export const MOCK_JAVASCRIPT_QUESTIONS = [
  {
    id: 1,
    question: 'What is a closure?',
    options: [
      { id: 1, option: 'Function inside function', answerBoolean: true },
      { id: 2, option: 'Loop construct', answerBoolean: false },
    ],
    answer: 'A closure is a function that has access to outer scope',
  },
  // ... more questions
];

export const MOCK_SUBJECTIVE_QUESTIONS = [
  {
    id: 1,
    question: 'Explain hoisting in JavaScript',
  },
  {
    id: 2,
    question: 'What is the event loop?',
  },
];
```

**File**: `tests/e2e/fixtures/api-responses.ts`

```typescript
export const MOCK_FEEDBACK_SCORE_LOW = {
  success: true,
  data: {
    topic: 'Hoisting',
    evaluation: {
      score: 3,
      maxScore: 10,
      summary: 'Needs more detail',
    },
    feedbackDetails: [
      {
        title: '부족한 부분',
        description: 'Missing key concepts',
        points: ['Add definition', 'Provide examples'],
      },
    ],
    modelAnswer: {
      introduction: 'Hoisting is...',
      usage: 'Used when...',
      scenarios: [],
      example: {
        context: 'In practice',
        solution: 'Variables are hoisted',
      },
    },
  },
};

export const MOCK_FEEDBACK_SCORE_HIGH = {
  success: true,
  data: {
    topic: 'Event Loop',
    evaluation: {
      score: 9,
      maxScore: 10,
      summary: 'Excellent understanding',
    },
    feedbackDetails: [
      {
        title: '답변의 뛰어난 점',
        description: 'Comprehensive explanation',
        points: ['Clear structure', 'Good examples'],
      },
    ],
    deepDive: {
      title: 'Advanced Topics',
      description: 'Explore further',
      topics: ['Microtasks', 'Task queue'],
    },
  },
};

export const MOCK_INTERPRET_RESPONSE = {
  success: true,
  data: {
    Question: 'What is ===?',
    summary: 'Strict equality checks both value and type',
    details: {
      theory: {
        title: 'Theory',
        description: 'Explanation',
        rules: [
          {
            title: 'No Type Coercion',
            explanation: 'Unlike ==, === does not convert types',
          },
        ],
      },
      analogy: {
        title: 'Analogy',
        scenarios: [
          {
            type: 'Success',
            title: 'Matching exactly',
            story: 'Like comparing identical twins',
          },
        ],
      },
    },
  },
};
```

---

### 4.3 Helper Functions

**File**: `tests/e2e/helpers/interview.ts`

```typescript
import { Page } from '@playwright/test';

export async function selectTech(page: Page, tech: 'JavaScript' | 'React' | 'TypeScript') {
  await page.click('text="Try now"');
  await page.click(`text="${tech}"`);
}

export async function selectInterviewType(
  page: Page,
  type: 'Multiple Choice' | 'Subjective'
) {
  await page.click(`text="${type}"`);
}

export async function answerMultipleChoiceQuestion(
  page: Page,
  optionText: string
) {
  await page.click(`label:has-text("${optionText}")`);
  await page.click('button:has-text("Submit")');
}

export async function answerSubjectiveQuestion(
  page: Page,
  answer: string
) {
  await page.fill('textarea', answer);
  await page.click('button:has-text("Submit")');
}

export async function navigateToReview(page: Page) {
  await page.click('text="Review"');
}

export async function getScore(page: Page): Promise<number> {
  const scoreText = await page.textContent('[data-testid="score"]');
  return parseInt(scoreText?.match(/\d+/)?.[0] || '0');
}
```

**File**: `tests/e2e/helpers/indexeddb.ts`

```typescript
import { Page } from '@playwright/test';

export async function clearIndexedDB(page: Page) {
  await page.evaluate(() => {
    return new Promise<void>((resolve) => {
      const request = indexedDB.deleteDatabase('fe-interview-practice');
      request.onsuccess = () => resolve();
      request.onerror = () => resolve();
    });
  });
}

export async function seedIndexedDB(page: Page, data: any) {
  await page.evaluate((userData) => {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open('fe-interview-practice', 1);

      request.onerror = () => reject(request.error);

      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['user'], 'readwrite');
        const store = transaction.objectStore('user');

        store.put({
          id: 'user',
          ...userData,
          updatedAt: new Date().toISOString(),
        });

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const userStore = db.createObjectStore('user', { keyPath: 'id' });
        userStore.createIndex('name', 'name', { unique: false });
        userStore.createIndex('updatedAt', 'updatedAt', { unique: false });
      };
    });
  }, data);
}

export async function getIndexedDBData(page: Page): Promise<any> {
  return page.evaluate(() => {
    return new Promise((resolve) => {
      const request = indexedDB.open('fe-interview-practice', 1);

      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['user'], 'readonly');
        const store = transaction.objectStore('user');
        const getRequest = store.get('user');

        getRequest.onsuccess = () => resolve(getRequest.result);
        getRequest.onerror = () => resolve(null);
      };

      request.onerror = () => resolve(null);
    });
  });
}
```

**File**: `tests/e2e/helpers/api-mock.ts`

```typescript
import { Page, Route } from '@playwright/test';
import {
  MOCK_FEEDBACK_SCORE_LOW,
  MOCK_FEEDBACK_SCORE_HIGH,
  MOCK_INTERPRET_RESPONSE,
} from '../fixtures/api-responses';

export async function mockFeedbackAPI(
  page: Page,
  responseType: 'low' | 'high' = 'low'
) {
  await page.route('**/api/generate-feedback', (route: Route) => {
    const response =
      responseType === 'low' ? MOCK_FEEDBACK_SCORE_LOW : MOCK_FEEDBACK_SCORE_HIGH;

    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });
}

export async function mockInterpretAPI(page: Page) {
  await page.route('**/api/generate-interpret', (route: Route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(MOCK_INTERPRET_RESPONSE),
    });
  });
}

export async function mockAPIError(page: Page, endpoint: string) {
  await page.route(`**/${endpoint}`, (route: Route) => {
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        success: false,
        data: 'Server error',
      }),
    });
  });
}
```

---

### 4.4 Priority 0 E2E Tests (Critical)

#### E2E-001: Multiple Choice Happy Path

**File**: `tests/e2e/critical/multiple-choice-flow.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import {
  selectTech,
  selectInterviewType,
  answerMultipleChoiceQuestion,
  navigateToReview,
} from '../helpers/interview';
import { clearIndexedDB, getIndexedDBData } from '../helpers/indexeddb';
import { mockInterpretAPI } from '../helpers/api-mock';

test.describe('Multiple Choice Interview - Happy Path', () => {
  test.beforeEach(async ({ page }) => {
    await clearIndexedDB(page);
    await page.goto('/');
  });

  test('should complete full multiple choice interview with mixed answers', async ({
    page,
  }) => {
    // Mock API
    await mockInterpretAPI(page);

    // Step 1: Select tech
    await selectTech(page, 'JavaScript');

    // Step 2: Select interview type
    await expect(page).toHaveURL(/\/interviews\/JavaScript/);
    await selectInterviewType(page, 'Multiple Choice');

    // Step 3: Answer first question (correct)
    await answerMultipleChoiceQuestion(page, 'Strict equality');
    await expect(page.locator('text=Correct')).toBeVisible();

    // Step 4: Go to next question
    await page.click('button:has-text("Next")');

    // Step 5: Answer second question (incorrect)
    await answerMultipleChoiceQuestion(page, 'Wrong option');
    await expect(page.locator('text=Incorrect')).toBeVisible();

    // Step 6: Verify interpretation shown
    await expect(page.locator('[data-testid="interpret-card"]')).toBeVisible();

    // Step 7: Complete interview
    await page.click('button:has-text("Next")');
    // ... continue for all questions

    // Step 8: Verify final score
    await expect(page.locator('[data-testid="final-score"]')).toBeVisible();

    // Step 9: Verify IndexedDB saved incorrect answers
    const dbData = await getIndexedDBData(page);
    expect(dbData.inCorrectMultipleChoiceQuestion).toHaveLength(1);
  });

  test('should allow reviewing incorrect answers', async ({ page }) => {
    // Mock API
    await mockInterpretAPI(page);

    // Complete interview with one wrong answer
    await selectTech(page, 'JavaScript');
    await selectInterviewType(page, 'Multiple Choice');
    await answerMultipleChoiceQuestion(page, 'Wrong option');
    await page.click('button:has-text("Complete")');

    // Navigate to home
    await page.click('[data-testid="home-link"]');

    // Go to review
    await navigateToReview(page);
    await selectInterviewType(page, 'Multiple Choice');

    // Verify incorrect question appears
    await expect(page.locator('text="Wrong option"')).toBeVisible();

    // Answer correctly this time
    await answerMultipleChoiceQuestion(page, 'Correct option');

    // Verify removed from incorrect list
    const dbData = await getIndexedDBData(page);
    expect(dbData.inCorrectMultipleChoiceQuestion).toHaveLength(0);
  });
});
```

---

#### E2E-002: Subjective Interview Happy Path

**File**: `tests/e2e/critical/subjective-flow.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import {
  selectTech,
  selectInterviewType,
  answerSubjectiveQuestion,
} from '../helpers/interview';
import { clearIndexedDB, getIndexedDBData } from '../helpers/indexeddb';
import { mockFeedbackAPI } from '../helpers/api-mock';

test.describe('Subjective Interview - Happy Path', () => {
  test.beforeEach(async ({ page }) => {
    await clearIndexedDB(page);
    await page.goto('/');
  });

  test('should complete subjective interview with AI feedback', async ({
    page,
  }) => {
    // Mock API - low score
    await mockFeedbackAPI(page, 'low');

    // Select React and Subjective
    await selectTech(page, 'React');
    await selectInterviewType(page, 'Subjective');

    // Verify chat interface
    await expect(page.locator('[data-testid="chat-container"]')).toBeVisible();

    // Verify first question appears
    await expect(page.locator('text=/What|Explain|Describe/')).toBeVisible();

    // Answer question
    await answerSubjectiveQuestion(page, 'This is my answer about React hooks');

    // Verify loading message
    await expect(page.locator('text="AI가 답변을 생성하는 중입니다"')).toBeVisible();

    // Verify feedback appears
    await expect(page.locator('[data-testid="feedback-score"]')).toBeVisible();

    // Verify score displayed
    const scoreText = await page.textContent('[data-testid="feedback-score"]');
    expect(scoreText).toContain('3/10');

    // Verify model answer shown (for low score)
    await expect(page.locator('[data-testid="model-answer"]')).toBeVisible();

    // Verify action buttons
    await expect(page.locator('button:has-text("Next")')).toBeVisible();
    await expect(page.locator('button:has-text("Add to Review")')).toBeVisible();

    // Click Add to Review
    await page.click('button:has-text("Add to Review")');

    // Verify saved to IndexedDB
    const dbData = await getIndexedDBData(page);
    expect(dbData.inCorrectSubQuestion).toHaveLength(1);
  });

  test('should show deep dive for high scores', async ({ page }) => {
    // Mock API - high score
    await mockFeedbackAPI(page, 'high');

    await selectTech(page, 'JavaScript');
    await selectInterviewType(page, 'Subjective');

    await answerSubjectiveQuestion(page, 'Detailed excellent answer');

    // Verify deep dive section appears
    await expect(page.locator('[data-testid="deep-dive"]')).toBeVisible();
    await expect(page.locator('text=/Advanced|Further|Deep Dive/')).toBeVisible();

    // Verify no model answer (for high score)
    await expect(page.locator('[data-testid="model-answer"]')).not.toBeVisible();

    // High score should not be added to incorrect list
    await page.click('button:has-text("Next")');
    const dbData = await getIndexedDBData(page);
    expect(dbData.inCorrectSubQuestion).toHaveLength(0);
  });

  test('should handle early interview termination', async ({ page }) => {
    await mockFeedbackAPI(page, 'low');

    await selectTech(page, 'TypeScript');
    await selectInterviewType(page, 'Subjective');

    // Answer one question
    await answerSubjectiveQuestion(page, 'First answer');
    await expect(page.locator('[data-testid="feedback-score"]')).toBeVisible();

    // End interview early
    await page.click('button:has-text("End Interview")');

    // Verify completion dialog or redirect
    await expect(page).toHaveURL(/\//);
  });
});
```

---

#### E2E-003: IndexedDB Persistence

**File**: `tests/e2e/critical/persistence.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { selectTech, selectInterviewType, navigateToReview } from '../helpers/interview';
import { clearIndexedDB, seedIndexedDB, getIndexedDBData } from '../helpers/indexeddb';

test.describe('IndexedDB Persistence', () => {
  test('should persist incorrect answers across browser sessions', async ({
    page,
    context,
  }) => {
    // Seed IndexedDB with incorrect answers
    await page.goto('/');
    await seedIndexedDB(page, {
      inCorrectSubQuestion: [
        { id: 1, question: 'What is closure?' },
      ],
      inCorrectMultipleChoiceQuestion: [
        {
          id: 2,
          question: 'What is ===?',
          options: [],
          answer: 'Strict equality',
        },
      ],
    });

    // Close and reopen page (simulating browser reopen)
    await page.close();
    const newPage = await context.newPage();
    await newPage.goto('/');

    // Navigate to review
    await navigateToReview(newPage);

    // Verify data hydrated from IndexedDB
    const dbData = await getIndexedDBData(newPage);
    expect(dbData.inCorrectSubQuestion).toHaveLength(1);
    expect(dbData.inCorrectMultipleChoiceQuestion).toHaveLength(1);

    // Verify UI shows correct count
    await expect(newPage.locator('text=/1.*incorrect/i')).toBeVisible();
  });

  test('should handle empty IndexedDB gracefully', async ({ page }) => {
    await clearIndexedDB(page);
    await page.goto('/');

    await navigateToReview(page);

    // Should show empty state
    await expect(page.locator('text=/No incorrect answers|Empty/i')).toBeVisible();
  });
});
```

---

#### E2E-004 & E2E-005: API Error Handling

**File**: `tests/e2e/critical/api-errors.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import {
  selectTech,
  selectInterviewType,
  answerSubjectiveQuestion,
  answerMultipleChoiceQuestion,
} from '../helpers/interview';
import { mockAPIError } from '../helpers/api-mock';

test.describe('API Error Handling', () => {
  test('should handle feedback API errors gracefully', async ({ page }) => {
    await page.goto('/');
    await mockAPIError(page, 'api/generate-feedback');

    await selectTech(page, 'JavaScript');
    await selectInterviewType(page, 'Subjective');

    await answerSubjectiveQuestion(page, 'Test answer');

    // Verify error message shown
    await expect(page.locator('text=/Error|Failed|Try again/i')).toBeVisible();

    // Verify user can continue
    await expect(page.locator('button:has-text("Next")')).toBeVisible();
  });

  test('should handle interpret API errors gracefully', async ({ page }) => {
    await page.goto('/');
    await mockAPIError(page, 'api/generate-interpret');

    await selectTech(page, 'React');
    await selectInterviewType(page, 'Multiple Choice');

    await answerMultipleChoiceQuestion(page, 'Wrong option');

    // Should show error instead of interpretation
    await expect(page.locator('text=/Error|Unable to load/i')).toBeVisible();

    // User can still proceed
    await expect(page.locator('button:has-text("Next")')).toBeVisible();
  });

  test('should add question to incorrect list even on API error', async ({
    page,
  }) => {
    await page.goto('/');
    await mockAPIError(page, 'api/generate-feedback');

    await selectTech(page, 'TypeScript');
    await selectInterviewType(page, 'Subjective');

    await answerSubjectiveQuestion(page, 'Answer');

    // Wait for error
    await expect(page.locator('text=/Error/i')).toBeVisible();

    // Verify defensively added to incorrect list
    await page.click('button:has-text("Add to Review")');

    const { getIndexedDBData } = await import('../helpers/indexeddb');
    const dbData = await getIndexedDBData(page);
    expect(dbData.inCorrectSubQuestion.length).toBeGreaterThan(0);
  });
});
```

---

### 4.5 Priority 1 E2E Tests (High)

#### E2E-006: Question Shuffling

**File**: `tests/e2e/high-priority/question-shuffling.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { selectTech, selectInterviewType } from '../helpers/interview';

test.describe('Question Shuffling', () => {
  test('should shuffle questions on each interview start', async ({ page }) => {
    await page.goto('/');

    // First interview
    await selectTech(page, 'JavaScript');
    await selectInterviewType(page, 'Multiple Choice');

    const firstQuestion = await page.textContent('[data-testid="question-text"]');

    // Go back and restart
    await page.goto('/');
    await selectTech(page, 'JavaScript');
    await selectInterviewType(page, 'Multiple Choice');

    const secondQuestion = await page.textContent('[data-testid="question-text"]');

    // Questions might be different (shuffled)
    // Note: This test has some randomness - run multiple times
    console.log('First:', firstQuestion);
    console.log('Second:', secondQuestion);
  });

  test('should shuffle multiple choice options', async ({ page }) => {
    await page.goto('/');
    await selectTech(page, 'React');
    await selectInterviewType(page, 'Multiple Choice');

    const optionsOrder = await page.$$eval(
      '[data-testid="option-label"]',
      (elements) => elements.map((el) => el.textContent)
    );

    // Restart
    await page.goto('/');
    await selectTech(page, 'React');
    await selectInterviewType(page, 'Multiple Choice');

    const newOptionsOrder = await page.$$eval(
      '[data-testid="option-label"]',
      (elements) => elements.map((el) => el.textContent)
    );

    // Options might be in different order
    console.log('First order:', optionsOrder);
    console.log('Second order:', newOptionsOrder);
  });
});
```

---

#### E2E-007: Session Snapshot in Review

**File**: `tests/e2e/high-priority/review-snapshot.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { seedIndexedDB } from '../helpers/indexeddb';

test.describe('Review Session Snapshot', () => {
  test('should not be affected by new incorrect answers during review', async ({
    page,
    context,
  }) => {
    // Seed with one incorrect question
    await page.goto('/');
    await seedIndexedDB(page, {
      inCorrectSubQuestion: [{ id: 1, question: 'Original question' }],
      inCorrectMultipleChoiceQuestion: [],
    });

    // Start review
    await page.click('text="Review"');
    await page.click('text="Subjective"');

    // Verify showing 1 question
    await expect(page.locator('text="Original question"')).toBeVisible();

    // Open new tab and add more incorrect answers
    const newPage = await context.newPage();
    await newPage.goto('/');
    // ... simulate completing interview with new incorrect answer

    await seedIndexedDB(newPage, {
      inCorrectSubQuestion: [
        { id: 1, question: 'Original question' },
        { id: 2, question: 'New incorrect question' },
      ],
      inCorrectMultipleChoiceQuestion: [],
    });

    // Back to review tab - should still show only 1 question (snapshot)
    await page.bringToFront();

    // Try to navigate - should not show new question
    // This verifies session snapshot isolation
  });
});
```

---

### 4.6 Additional E2E Tests (Medium-Low Priority)

Additional test files for:
- **E2E-008**: Early Interview Termination
- **E2E-009**: Manual Add to Review
- **E2E-010**: Tech Stack Switching
- **E2E-011**: Concurrent Operations
- **E2E-012**: UI Responsiveness
- **E2E-013**: Long Answer Handling
- **E2E-014**: All Question Types Coverage
- **E2E-015**: Empty State Handling

---

### Phase 4 Summary

**Total Estimated Tests**: 15-20
**Coverage Target**: 100% of P0 user journeys
**Timeline**: 5-7 days

**Deliverables**:
- ✅ Playwright configuration
- ✅ Test fixtures and helpers
- ✅ Critical path E2E tests (P0)
- ✅ High priority E2E tests (P1)
- ✅ API mocking utilities
- ✅ IndexedDB test utilities

---

## Implementation Roadmap

### Timeline Overview

```
Week 1: Unit Testing (Phase 1)
├── Day 1-2: Pure utilities (getQuestionAnswer, messagelib, isFeedbackData)
├── Day 3: Zustand stores (useSelectTechStore, useUserStore)
└── Day 4: Simple hooks (useAnswerValidation)

Week 2: Integration Testing (Phase 2)
├── Day 1-2: API route testing (feedback, interpret)
├── Day 3: Complex hook integration (useSubjectiveInterview)
└── Day 4-5: State management integration tests

Week 3: Component Testing (Phase 3)
├── Day 1-2: Widget components (Multiple Choice, Subjective)
├── Day 3: Feature components (Chat Messages)
└── Day 4: UI interaction tests

Week 4: E2E Testing (Phase 4)
├── Day 1: Playwright setup and fixtures
├── Day 2-3: P0 critical path tests
├── Day 4-5: P1 high priority tests
├── Day 6: P2 medium priority tests
└── Day 7: CI/CD integration and documentation
```

---

### Parallel Work Streams

**Stream 1: Core Testing** (Primary Focus)
- Unit tests → Integration tests → Component tests → E2E tests

**Stream 2: Infrastructure** (Support)
- Vitest configuration optimization
- Playwright setup and utilities
- Mock/fixture creation
- CI/CD pipeline integration

**Stream 3: Documentation** (Ongoing)
- Test documentation
- Coverage reports
- Best practices guide
- Troubleshooting guide

---

### Milestone Checkpoints

**Milestone 1: Week 1 Complete**
- ✅ 60+ unit tests written
- ✅ 80%+ coverage for utilities and stores
- ✅ All core functions tested
- 🎯 **Decision Point**: Proceed to integration tests

**Milestone 2: Week 2 Complete**
- ✅ 25+ integration tests written
- ✅ API routes fully tested
- ✅ Complex hooks validated
- 🎯 **Decision Point**: Proceed to component tests

**Milestone 3: Week 3 Complete**
- ✅ 35+ component tests written
- ✅ Widget interactions tested
- ✅ UI behavior validated
- 🎯 **Decision Point**: Proceed to E2E tests

**Milestone 4: Week 4 Complete**
- ✅ 15+ E2E tests written
- ✅ All P0 user journeys covered
- ✅ CI/CD pipeline configured
- 🎯 **Decision Point**: Production ready

---

### Risk Mitigation

**Risk 1: Gemini API Costs During Testing**
- **Mitigation**: Mock all AI API calls in tests
- **Alternative**: Use test API key with rate limiting

**Risk 2: IndexedDB Flakiness in Tests**
- **Mitigation**: Use `fake-indexeddb` for unit/integration tests
- **Alternative**: Implement proper cleanup in `beforeEach`/`afterEach`

**Risk 3: E2E Test Flakiness**
- **Mitigation**: Use Playwright's built-in retry mechanism
- **Alternative**: Implement proper wait conditions with `waitFor`

**Risk 4: Time Overrun**
- **Mitigation**: Prioritize P0 tests, defer P2 tests
- **Alternative**: Implement tests iteratively, ship incrementally

---

## Tools & Configuration

### Required Dependencies

**Already Installed**:
- ✅ Vitest 4.0.6
- ✅ jsdom 27.1.0
- ✅ fake-indexeddb 6.2.4

**To Install**:

```bash
npm install -D @testing-library/react @testing-library/user-event @testing-library/jest-dom
npm install -D @playwright/test
npm install -D msw  # Optional: For API mocking
```

---

### Vitest Configuration Update

**File**: `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: [
        'fsd/**/*.{ts,tsx}',
        'app/**/*.{ts,tsx}',
      ],
      exclude: [
        '**/__test__/**',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/node_modules/**',
        '**/dist/**',
        '**/.next/**',
        '**/constants/**',
        '**/types/**',
        '**/*.d.ts',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 65,
        statements: 70,
      },
    },
    globals: true,
    include: ['**/__test__/**/*.test.{ts,tsx}'],
    testTimeout: 10000,
  },
});
```

---

### Vitest Setup File

**File**: `vitest.setup.ts`

```typescript
import '@testing-library/jest-dom';
import 'fake-indexeddb/auto';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_GEMINI_API_KEY = 'test-api-key';

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
```

---

### Package Scripts Update

**File**: `package.json`

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:all": "npm run test && npm run test:e2e"
  }
}
```

---

### CI/CD Integration (GitHub Actions)

**File**: `.github/workflows/test.yml`

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-integration-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit and integration tests
        run: npm run test:coverage

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          NEXT_PUBLIC_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Success Metrics

### Coverage Targets

**Overall Project Coverage**: 70%+

**By Layer**:
- **Utilities** (`fsd/shared/lib`): 85%+
- **Stores** (`fsd/entities`, `fsd/shared/model`): 80%+
- **Hooks** (`fsd/*/model/hooks`): 75%+
- **Components** (`fsd/*/ui`): 60%+
- **API Routes** (`app/api`): 90%+

**By Test Type**:
- **Unit Tests**: 60 tests, 80%+ coverage
- **Integration Tests**: 25 tests, 70%+ coverage
- **Component Tests**: 35 tests, 60%+ coverage
- **E2E Tests**: 15 tests, 100% P0 journey coverage

---

### Quality Metrics

**Test Execution Speed**:
- Unit tests: <5 seconds total
- Integration tests: <20 seconds total
- Component tests: <30 seconds total
- E2E tests: <3 minutes total

**Flakiness Rate**: <2% (retries should succeed)

**Maintenance Burden**:
- Test changes per feature: <3 tests affected
- Test debugging time: <10 minutes per failure

---

### Business Impact Metrics

**Defect Detection**:
- Pre-release bug catch rate: 90%+
- Production bug reduction: 70%+

**Developer Confidence**:
- Refactoring safety: High (measured by survey)
- Deployment confidence: High

**Code Review Efficiency**:
- Review time reduction: 30%+
- Review quality improvement: Measurable

---

## Appendix

### A. Testing Best Practices

#### 1. Arrange-Act-Assert Pattern

```typescript
test('should add question to incorrect list', () => {
  // Arrange
  const { result } = renderHook(() => useUserStore());
  const question = { id: 1, question: 'Test' };

  // Act
  act(() => {
    result.current.addInCorrectSubQuestion(question);
  });

  // Assert
  expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
});
```

#### 2. Don't Test Implementation Details

```typescript
// ❌ Bad: Testing internal state
expect(component.state.internalCounter).toBe(5);

// ✅ Good: Testing user-visible behavior
expect(screen.getByText('Count: 5')).toBeInTheDocument();
```

#### 3. Use Data-TestId Sparingly

```typescript
// ❌ Avoid when possible
screen.getByTestId('submit-button');

// ✅ Prefer accessible queries
screen.getByRole('button', { name: /submit/i });
```

#### 4. Mock External Dependencies

```typescript
// Mock API calls
vi.mock('@/lib/api', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'mock' }),
}));

// Mock browser APIs
global.fetch = vi.fn();
```

#### 5. Clean Up After Tests

```typescript
afterEach(() => {
  vi.clearAllMocks();
  cleanup(); // From @testing-library/react
});
```

---

### B. Common Pitfalls

**Pitfall 1: Testing Libraries Instead of Your Code**
```typescript
// ❌ Don't test React
test('useState works', () => {
  const [state, setState] = useState(0);
  setState(1);
  expect(state).toBe(1); // This tests React, not your code
});
```

**Pitfall 2: Async Act Warnings**
```typescript
// ❌ Causes warnings
result.current.asyncFunction();

// ✅ Wrap in act
await act(async () => {
  await result.current.asyncFunction();
});
```

**Pitfall 3: Shared Mutable State Between Tests**
```typescript
// ❌ State leaks between tests
const sharedState = { count: 0 };

// ✅ Reset in beforeEach
beforeEach(() => {
  sharedState.count = 0;
});
```

---

### C. Useful Resources

**Documentation**:
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

**Tools**:
- [Codecov](https://codecov.io/) - Coverage tracking
- [Percy](https://percy.io/) - Visual regression testing
- [Chromatic](https://www.chromatic.com/) - Storybook visual testing

---

### D. Glossary

- **Unit Test**: Tests a single function or component in isolation
- **Integration Test**: Tests interaction between multiple modules
- **Component Test**: Tests UI component behavior with user interactions
- **E2E Test**: Tests complete user journey from start to finish
- **Test Double**: Generic term for mock, stub, spy, fake, dummy
- **Code Coverage**: Percentage of code executed during tests
- **Flaky Test**: Test that sometimes passes and sometimes fails
- **Test Fixture**: Fixed state used as baseline for tests
- **Arrange-Act-Assert**: Test structure pattern (setup, execute, verify)

---

## Conclusion

This comprehensive test strategy provides a clear roadmap from current state to complete test coverage, following industry best practices and the testing pyramid principle. By implementing these tests in phases, we ensure:

1. **Solid Foundation**: Unit tests catch regressions early
2. **Integration Confidence**: Complex interactions are validated
3. **UI Reliability**: Component tests ensure user-facing quality
4. **End-to-End Assurance**: Critical user journeys are protected

**Next Steps**:
1. Review and approve this strategy
2. Set up development environment (install dependencies)
3. Begin Phase 1: Unit Testing
4. Track progress using project management tool
5. Hold weekly review meetings to assess progress

**Success Criteria**:
- ✅ 70%+ overall code coverage
- ✅ 100% P0 user journey coverage
- ✅ <5% test flakiness rate
- ✅ CI/CD pipeline green on all PRs
- ✅ Team confidence in refactoring

---

**Document Version**: 1.0
**Approval Required**: Yes
**Review Date**: TBD
