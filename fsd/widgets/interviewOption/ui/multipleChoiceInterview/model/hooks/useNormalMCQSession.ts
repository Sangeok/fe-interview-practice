import { useCallback } from "react";
import { MultipleChoiceQuestion } from "../type";
import { useMCQSessionStore } from "../store/useMCQSessionStore";

interface UseNormalMCQSessionReturn {
  // State
  currentQuestion: MultipleChoiceQuestion;
  currentQuestionIndex: number;
  score: number;
  isQuizFinished: boolean;
  totalQuestions: number;

  // Actions
  goNext: (isCorrect: boolean) => void;
}

/**
 * 일반 객관식 인터뷰 세션 관리 훅
 *
 * - useMCQSessionStore(Zustand) 사용
 * - localStorage persist로 새로고침 시 복원
 * - useHeaderButton의 currentIndex와 동기화
 */
export function useNormalMCQSession(): UseNormalMCQSessionReturn {
  // Store 기반 상태
  const storeIndex = useMCQSessionStore((s) => s.currentIndex);
  const storeScore = useMCQSessionStore((s) => s.score);
  const storeQuestions = useMCQSessionStore((s) => s.shuffledQuestions);
  const advance = useMCQSessionStore((s) => s.advance);

  const isQuizFinished = storeIndex >= storeQuestions.length;
  const currentQuestion = storeQuestions[storeIndex];

  const goNext = useCallback(
    (isCorrect: boolean) => {
      // Store 업데이트 (useHeaderButton의 currentIndex와 동기화)
      advance(isCorrect);
    },
    [advance]
  );

  return {
    currentQuestion,
    currentQuestionIndex: storeIndex,
    score: storeScore,
    isQuizFinished,
    totalQuestions: storeQuestions.length,
    goNext,
  };
}
