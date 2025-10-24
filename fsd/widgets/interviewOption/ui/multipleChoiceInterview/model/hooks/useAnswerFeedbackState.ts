import { useState, useCallback } from "react";
import { MultipleChoiceInterpretType } from "@/fsd/shared/model/type";

type AnswerState = "idle" | "correct" | "incorrect";

interface UseAnswerFeedbackStateReturn {
  // State
  answerState: AnswerState;
  isLoading: boolean;
  interpret: MultipleChoiceInterpretType | null;

  // Computed
  showCorrectCard: boolean;
  showIncorrectInterpret: boolean;

  // Actions
  setAnswerCorrect: () => void;
  setAnswerIncorrect: () => void;
  setInterpret: (interpret: MultipleChoiceInterpretType | null) => void;
  setLoading: (loading: boolean) => void;
  resetAnswerState: () => void;
}

export function useAnswerFeedbackState(): UseAnswerFeedbackStateReturn {
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [interpret, setInterpret] =
    useState<MultipleChoiceInterpretType | null>(null);

  const showCorrectCard = answerState === "correct";
  const showIncorrectInterpret = answerState === "incorrect";

  const setAnswerCorrect = useCallback(() => {
    setAnswerState("correct");
  }, []);

  const setAnswerIncorrect = useCallback(() => {
    setAnswerState("incorrect");
  }, []);

  const resetAnswerState = useCallback(() => {
    setAnswerState("idle");
    setInterpret(null);
  }, []);

  return {
    answerState,
    isLoading,
    interpret,
    showCorrectCard,
    showIncorrectInterpret,
    setAnswerCorrect,
    setAnswerIncorrect,
    setInterpret,
    setLoading: setIsLoading,
    resetAnswerState,
  };
}
