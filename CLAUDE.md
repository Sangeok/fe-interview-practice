# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle with Turbopack  
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Environment Setup
Requires `NEXT_PUBLIC_GEMINI_API_KEY` environment variable for Gemini AI integration.

## Architecture Overview

### Feature-Sliced Design (FSD)
This project follows FSD architecture with layers organized in `fsd/` directory:

- **pages/**: Route-level components (`main`, `interview`)
- **widgets/**: Independent UI components (`hero`, `interviewOption`) 
- **features/**: Business logic features (`chat`, `multipleChoiceInterview`)
- **shared/**: Reusable utilities (`ui/atoms`, `constants`, `lib`, `model`)

### Core Application Flow

**Main Flow**: User selects technology → chooses interview type → takes interview → receives AI feedback

**Key Components**:
- `useSelectTechStore` (Zustand): Global tech stack selection state
- Interview types: Multiple choice (with AI explanations) and subjective (with AI feedback)
- AI integration via Google Gemini API for generating feedback and explanations

### Next.js App Router Structure
- `app/page.tsx` - Main landing page (renders `MainPage` from FSD)
- `app/(main)/interviews/[title]/page.tsx` - Dynamic interview route
- `app/api/generate-feedback/route.ts` - AI feedback generation endpoint
- `app/api/generate-interpret/route.ts` - AI explanation generation endpoint

### State Management
- **Zustand store**: `useSelectTechStore` for technology selection
- **Local state**: Component-level state for interview flow management
- **Custom hooks**: Domain-specific hooks in `model/hooks/` directories

### TypeScript Configuration
- Path aliases: `@/*` for root, `fsd/*` for FSD directory
- Strict mode enabled
- Next.js plugin integration

### Interview System

**Question Banks**: Located in `fsd/pages/interview/constants/`
- Multiple choice: `*QA_Multiple.ts` files for JavaScript, React, TypeScript
- Subjective: `*QA_Subjective.ts` files for open-ended questions
- Array shuffling via `arrayShuffle` utility for randomized question order

**AI Integration**:
- Feedback generation: Detailed scoring (0-10) with structured feedback in Korean
- Explanation generation: Easy-to-understand interpretations with analogies
- Consistent JSON response format for both endpoints

### UI Components
- Custom Button component with variants using `class-variance-authority`
- Dialog system for modal interactions
- Chat-like interface with typewriter effects for AI responses
- Responsive design with Tailwind CSS

### Key Patterns
- Consistent hook naming: `use[Feature][Purpose]` (e.g., `useAnswerValidation`)
- Component co-location: UI components grouped with their business logic
- Type safety: Comprehensive TypeScript interfaces for API responses and component props
- Error boundaries and loading states handled at component level