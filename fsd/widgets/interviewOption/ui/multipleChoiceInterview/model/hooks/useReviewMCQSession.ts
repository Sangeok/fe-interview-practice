import { useCallback, useState } from "react";
import { MultipleChoiceQuestion } from "../type";

interface UseReviewMCQSessionParams {
  questions: MultipleChoiceQuestion[];
}

interface UseReviewMCQSessionReturn {
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
 * 리뷰 모드 객관식 세션 관리 훅
 *
 * - 로컬 useState 사용
 * - 임시 세션, persist 없음
 * - UserStore의 오답 목록 독립 실행
 */
export function useReviewMCQSession({ questions }: UseReviewMCQSessionParams): UseReviewMCQSessionReturn {
  // 리뷰 모드 전용 로컬 상태
  const [localIndex, setLocalIndex] = useState(0);
  const [localScore, setLocalScore] = useState(0);

  const isQuizFinished = localIndex >= questions.length;
  const currentQuestion = questions[localIndex];

  const goNext = useCallback((isCorrect: boolean) => {
    // 로컬 상태 업데이트
    setLocalIndex((i) => i + 1);
    if (isCorrect) setLocalScore((s) => s + 1);
  }, []);

  return {
    currentQuestion,
    currentQuestionIndex: localIndex,
    score: localScore,
    isQuizFinished,
    totalQuestions: questions.length,
    goNext,
  };
}
