# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests with Vitest (run mode)
- `npm run test:watch` - Run tests in watch mode

### Environment Setup
Requires `NEXT_PUBLIC_GEMINI_API_KEY` environment variable for Gemini AI integration.

## Architecture Overview

### Feature-Sliced Design (FSD)
This project follows FSD architecture with layers organized in `fsd/` directory:

- **pages/**: Route-level components (`main`, `interview`, `review`)
- **widgets/**: Independent UI components (`hero`, `interviewOption`)
- **features/**: Business logic features (`chat` with message components and input handling)
- **entities/**: Business entities (`user` with Zustand store and IndexedDB integration)
- **shared/**: Reusable utilities (`ui/atoms`, `constants`, `lib`, `model`)

### Core Application Flow

**Main Flow**: User selects technology → chooses interview type → takes interview → receives AI feedback → reviews incorrect answers

**Key Components**:
- `useSelectTechStore` (Zustand): Global tech stack selection state
- `useUserStore` (Zustand): User data management with IndexedDB persistence
- Interview types: Multiple choice (with AI explanations) and subjective (with AI feedback)
- Review system: Practice incorrect answers with IndexedDB storage
- AI integration via Google Gemini API for generating feedback and explanations

### Next.js App Router Structure
- `app/page.tsx` - Main landing page (renders `MainPage` from FSD)
- `app/(main)/interviews/[title]/page.tsx` - Dynamic interview route
- `app/(main)/reviews/page.tsx` - Review incorrect answers page
- `app/api/generate-feedback/route.ts` - AI feedback generation endpoint
- `app/api/generate-interpret/route.ts` - AI explanation generation endpoint

### State Management

**Zustand Stores**:
- `useSelectTechStore` (fsd/shared/model/useSelectTechStore.ts)
  - Global technology selection state
  - Manages selected tech stack for interview sessions

- `useUserStore` (fsd/entities/user/useUserStore.ts)
  - User data and incorrect answers tracking
  - Methods: `addInCorrectSubQuestion`, `addInCorrectMultipleChoiceQuestion`, `removeInCorrectSubQuestion`, `removeInCorrectMultipleChoiceQuestion`
  - IndexedDB integration: `hydrateUserFromDB`, `persistUserToDB`

**IndexedDB Persistence**:
- Service: `indexedDBService` (fsd/shared/lib/indexedDB.ts)
- Database: `fe-interview-practice`
- Store: `user` with indices on `name` and `updatedAt`
- Operations: `saveUserData`, `loadUserData`
- Used to persist incorrect answers across sessions

**Local State**:
- Component-level state for interview flow management
- Custom hooks in `model/hooks/` directories organized by feature

### TypeScript Configuration
- Path aliases: `@/*` for root, `fsd/*` for FSD directory
- Strict mode enabled
- Next.js plugin integration

### Interview System

**Question Banks**: Located in `fsd/pages/interview/constants/`
- Multiple choice: `JavascriptQA_Multiple.ts`, `ReactQA_Multiple.ts`, `TypescriptQA_Multiple.ts`
- Subjective: `JavascriptQA_Subjective.ts`, `ReactQA_Subjective.ts`, `TypeScriptQA_Subjective.ts`
- Array shuffling via `arrayShuffle` and `shuffleMultipleChoiceQuestions` utilities for randomized question order

**AI Integration**:
- Feedback generation: Detailed scoring (0-10) with structured feedback in Korean
- Two feedback types:
  - `FeedbackData`: Standard feedback with score, summary, strengths, improvements, and model answer
  - `DeepDiveFeedbackData`: Enhanced feedback with additional deep dive topics for further learning
- Explanation generation: Easy-to-understand interpretations with analogies
- Consistent JSON response format for both endpoints

**Review System**:
- Page: `fsd/pages/review/ui/index.tsx`
- Allows users to practice questions they answered incorrectly
- Pulls data from `useUserStore` (`inCorrectSubQuestion`, `inCorrectMultipleChoiceQuestion`)
- Supports both multiple choice and subjective review modes
- Creates session snapshots to prevent data changes during review

### UI Components

**Atoms** (fsd/shared/ui/atoms/):
- Button component with variants using `class-variance-authority`
- Dialog system for modal interactions
- RadioInput for multiple choice questions

**Features** (fsd/features/chat/):
- ChatInput: User message input component
- ChatMessage: Message display with type-based rendering
- UserMessage: User's chat messages
- BotMessage: AI responses with typewriter effects
  - GeneralBotMessage: Standard text responses
  - FeedbackMessage: Structured feedback display with score, sections
  - DeepDiveFeedbackMessage: Enhanced feedback with deep dive topics
  - LoadingBotMessage: Loading state indicator
- ButtonMessage: Action button messages

**Widgets** (fsd/widgets/):
- Hero: Landing page hero section with tech stack selector
- InterviewOption: Multiple choice and subjective interview widgets
  - Multiple choice: Progress tracking, answer validation, AI explanations
  - Subjective: Chat interface, AI feedback generation, question navigation

**Design System**:
- Responsive design with Tailwind CSS v4
- Consistent spacing and typography
- Color scheme: Primary focus on user experience and readability

### Testing

**Framework**: Vitest with jsdom environment
- Configuration: `vitest.config.ts`
- Setup: `vitest.setup.ts` (imports `fake-indexeddb/auto` for IndexedDB mocking)
- Test files: Located in `__test__/` directories alongside source files
- Coverage: Configured with text, HTML, and lcov reporters

**Existing Tests**:
- `fsd/shared/lib/__test__/array-shuffle.test.ts`: Tests for array shuffling utilities
- `fsd/shared/lib/__test__/indexedDB.test.ts`: Tests for IndexedDB service operations

**Test Patterns**:
- Unit tests for utility functions
- IndexedDB operations tested with fake-indexeddb
- Deterministic shuffle testing with mocked `Math.random`

### Key Patterns

**Hook Naming**: `use[Feature][Purpose]` (e.g., `useAnswerValidation`, `useInterpretAPI`, `useSubjectiveInterview`)

**Component Organization**:
- Co-location: UI components grouped with their business logic in same feature directory
- Structure: `ui/`, `model/`, `lib/` subdirectories within each feature
- Internal hooks: Complex hooks split into `internal/` subdirectories (e.g., `useSubjectiveInterview/internal/`)

**Type Safety**:
- Comprehensive TypeScript interfaces for API responses and component props
- Shared types in `fsd/shared/model/type.ts` and entity-specific types in their directories
- Strict null checks and type checking enabled

**Error Handling**:
- Error boundaries and loading states handled at component level
- IndexedDB error handling with fallbacks
- API error handling with user-friendly messages

**Code Organization**:
- Features organized by domain responsibility
- Shared utilities extracted to `fsd/shared/lib/`
- Constants centralized in appropriate `constants/` directories
- Type definitions co-located with related code

### Dependencies

**Core**:
- Next.js 15.5.0 (with Turbopack)
- React 19.1.0
- TypeScript 5.x

**State Management**:
- Zustand 5.0.8

**UI**:
- Tailwind CSS 4.x with PostCSS plugin
- class-variance-authority 0.7.1
- lucide-react 0.541.0 (icon library)

**AI Integration**:
- @google/generative-ai 0.24.1 (Gemini API)

**Testing**:
- Vitest 4.0.6
- jsdom 27.1.0
- fake-indexeddb 6.2.4
- vite-tsconfig-paths 5.1.4

**Development**:
- ESLint 9.x with Next.js config
- @eslint/eslintrc 3.x

### File Structure Examples

**Feature Structure** (Chat Feature):
```
fsd/features/chat/
├── chatInput/
│   └── ui/
│       └── ChatInput.tsx
└── chatMessage/
    ├── model/
    │   └── type.ts
    └── ui/
        ├── ChatMessage.tsx
        └── _component/
            ├── UserMessage.tsx
            ├── ButtonMessage.tsx
            └── BotMessage/
                ├── ui/
                │   ├── index.tsx
                │   └── _component/
                │       ├── GeneralBotMessage.tsx
                │       ├── LoadingBotMessage.tsx
                │       ├── FeedbackMessage/
                │       └── DeepDiveFeedbackMessage/
                ├── model/
                │   └── hooks/
                │       └── useTypewriter.ts
                └── lib/
                    └── isFeedbackData.ts
```

**Widget Structure** (Subjective Interview):
```
fsd/widgets/interviewOption/ui/subjectiveInterview/
├── ui/
│   └── index.tsx
├── model/
│   ├── type.ts
│   └── hooks/
│       ├── useScrollToBottom.ts
│       └── useSubjectiveInterview/
│           ├── index.ts
│           └── internal/
│               ├── useMessageState.ts
│               ├── useQuestionNavigation.ts
│               └── useFeedbackAPI.ts
└── lib/
    └── messagelib.ts
```

### Development Guidelines

**When Adding Features**:
1. Follow FSD layer structure (pages → widgets → features → entities → shared)
2. Co-locate related code (UI, model, lib) within feature directories
3. Create custom hooks for reusable logic in `model/hooks/`
4. Add tests in `__test__/` directories alongside source files
5. Update types in appropriate `type.ts` files

**When Working with State**:
1. Use `useUserStore` for user data and incorrect answers
2. Persist important data to IndexedDB via `persistUserToDB()`
3. Hydrate data on app initialization via `hydrateUserFromDB()`
4. Use `useSelectTechStore` for global tech stack selection

**When Working with AI**:
1. Use `/api/generate-feedback` for subjective answer evaluation
2. Use `/api/generate-interpret` for multiple choice explanations
3. Handle loading states with LoadingBotMessage component
4. Parse response based on feedback type (FeedbackData vs DeepDiveFeedbackData)

**When Adding Tests**:
1. Create test files in `__test__/` directories
2. Use Vitest globals (describe, it, expect, vi)
3. Mock browser APIs with fake-indexeddb when needed
4. Test utility functions with deterministic inputs
5. Aim for meaningful test coverage, not just percentage
