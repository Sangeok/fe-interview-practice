# Hero Component Refactoring Analysis

**Target File**: `fsd/widgets/hero/ui/index.tsx`

**Strategy**: Option 1 - Hero 컴포넌트만 리팩토링, TechStackSelector 수정 최소화

---

## 주요 문제점

### 5. 불필요한 Computed Variable (Lines 69-70)

**현재**:

```tsx
const selectedRouteType = selectedInterview.current === "basic" ? handleRouteToInterview : handleRouteToCustomInterview;
```

**문제**:

- 함수 선택만 하는 중간 변수
- 통합된 handler 사용 시 불필요

**개선**:

- 단일 `handleRouteToInterview` 사용으로 제거

---

### 6. Magic Strings (Lines 45, 55, 32, 36)

**현재**:

```tsx
router.push(`/interviews/${selectedTitle}`);
router.push(`/custom-interviews/${selectedTitle}`);
router.push("/reviews");
router.push("/custom-questions");
```

**문제**:

- 하드코딩된 경로
- 변경 시 여러 곳 수정 필요
- 오타 가능성

**개선**:

```tsx
// fsd/shared/constants/routes.ts
export const ROUTES = {
  INTERVIEWS: "/interviews",
  CUSTOM_INTERVIEWS: "/custom-interviews",
  REVIEWS: "/reviews",
  CUSTOM_QUESTIONS: "/custom-questions",
} as const;
```

---

## 리팩토링 체크리스트

- [ ] `useRef` → `useState`로 변경 (`interviewType`)
- [ ] `validateTechSelection` 함수 추출
- [ ] `handleRouteToInterview` + `handleRouteToCustomInterview` 통합
- [ ] `handleSelectInterview` + `handleSelectCustomInterview` 통합
- [ ] `selectedRouteType` computed variable 제거
- [ ] Route 상수 추출 (`ROUTES` constant)
- [ ] Button onClick 핸들러 수정 (type 파라미터 전달)
- [ ] TechStackSelector에 통합된 handler 전달

---

## TechStackSelector 호환성

**현재 Interface** (`fsd/widgets/hero/ui/_component/TechStackSelector.tsx`):

```tsx
interface TechStackSelectorProps {
  onClose: () => void;
  selectedRouteType: (selectedTitle: TechType) => void;
}
```

**리팩토링 후 사용**:

```tsx
<TechStackSelector
  onClose={handleInterviewDialogClose}
  selectedRouteType={handleRouteToInterview} // 통합된 단일 handler
/>
```

**Note**: TechStackSelector는 수정 불필요 (Option 1)

---

## 예상 코드 감소

- **Before**: ~107 lines
- **After**: ~85 lines (약 20% 감소)
- 중복 제거로 유지보수성 향상
- 단일 책임 원칙 준수
