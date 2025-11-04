import { useCallback, useState } from "react";
import { MultipleChoiceQuestion } from "../type";
import { useMCQSessionStore } from "../store/useMCQSessionStore";

interface UseMultipleChoiceQuizParams {
  setOpenInterviewOptionsDialog: (open: boolean) => void;
  questionsOverride?: MultipleChoiceQuestion[];
}

interface UseMultipleChoiceQuizReturn {
  // State
  currentQuestion: MultipleChoiceQuestion;
  currentQuestionIndex: number;
  score: number;
  isQuizFinished: boolean;
  totalQuestions: number;

  // Actions
  goNext: (isCorrect: boolean) => void;
  goFirst: () => void;
}

export function useMultipleChoiceQuiz({
  setOpenInterviewOptionsDialog,
  questionsOverride,
}: UseMultipleChoiceQuizParams): UseMultipleChoiceQuizReturn {
  // store 기반 상태
  const storeIndex = useMCQSessionStore((s) => s.currentIndex);
  const storeScore = useMCQSessionStore((s) => s.score);
  const storeQuestions = useMCQSessionStore((s) => s.shuffledQuestions);
  const advance = useMCQSessionStore((s) => s.advance);
  const resetSession = useMCQSessionStore((s) => s.resetSession);

  const isOverride = Array.isArray(questionsOverride);

  // override 모드용 로컬 상태
  const [localIndex, setLocalIndex] = useState(0);
  const [localScore, setLocalScore] = useState(0);

  const questions = isOverride ? (questionsOverride as MultipleChoiceQuestion[]) : storeQuestions;
  const currentQuestionIndex = isOverride ? localIndex : storeIndex;
  const score = isOverride ? localScore : storeScore;

  const isQuizFinished = currentQuestionIndex >= questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const goFirst = useCallback(() => {
    if (isOverride) {
      setLocalIndex(0);
      setLocalScore(0);
      setOpenInterviewOptionsDialog(true);
    } else {
      resetSession();
      setOpenInterviewOptionsDialog(true);
    }
  }, [isOverride, resetSession, setOpenInterviewOptionsDialog]);

  const goNext = useCallback(
    (isCorrect: boolean) => {
      if (isOverride) {
        setLocalIndex((i) => i + 1);
        if (isCorrect) setLocalScore((s) => s + 1);
      } else {
        advance(isCorrect);
      }
    },
    [isOverride, advance]
  );

  return {
    currentQuestion,
    currentQuestionIndex,
    score,
    isQuizFinished,
    totalQuestions: questions.length,
    goNext,
    goFirst,
  };
}
