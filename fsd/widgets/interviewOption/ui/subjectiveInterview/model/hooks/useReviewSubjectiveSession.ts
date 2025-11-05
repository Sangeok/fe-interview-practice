import { useState } from "react";

interface UseReviewSubjectiveSessionReturn {
  // State
  questionIndex: number;
  score: number;

  // Actions
  advance: () => void;
  addScore: (delta: number) => void;
}

/**
 * 리뷰 모드 주관식 세션 관리 훅
 *
 * - 로컬 useState 사용
 * - 임시 세션, persist 없음
 * - UserStore의 오답 목록 독립 실행
 */
export function useReviewSubjectiveSession(): UseReviewSubjectiveSessionReturn {
  // 리뷰 모드 전용 로컬 상태
  const [localIndex, setLocalIndex] = useState(0);
  const [localScore, setLocalScore] = useState(0);

  const advance = () => {
    // 로컬 상태 업데이트
    setLocalIndex((i) => i + 1);
  };

  const addScore = (delta: number) => {
    setLocalScore((s) => s + delta);
  };

  return {
    questionIndex: localIndex,
    score: localScore,
    advance,
    addScore,
  };
}
