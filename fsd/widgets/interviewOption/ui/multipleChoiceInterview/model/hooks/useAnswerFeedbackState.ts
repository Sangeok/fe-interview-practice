"use client";

import { useState, useCallback } from "react";
import { MultipleChoiceInterpretType } from "@/fsd/shared/model/type";
import { useUserStore } from "@/fsd/entities/user/useUserStore";
import { MultipleChoiceQuestion } from "../type";

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

export function useAnswerFeedbackState(currentQuestion: MultipleChoiceQuestion | null): UseAnswerFeedbackStateReturn {
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [interpret, setInterpret] = useState<MultipleChoiceInterpretType | null>(null);

  const addInCorrectMultipleChoiceQuestion = useUserStore((state) => state.addInCorrectMultipleChoiceQuestion);
  const removeInCorrectMultipleChoiceQuestion = useUserStore((state) => state.removeInCorrectMultipleChoiceQuestion);

  const showCorrectCard = answerState === "correct";
  const showIncorrectInterpret = answerState === "incorrect";

  const setAnswerCorrect = useCallback(() => {
    setAnswerState("correct");
    if (currentQuestion) {
      removeInCorrectMultipleChoiceQuestion(currentQuestion.id);
    }
  }, [currentQuestion, removeInCorrectMultipleChoiceQuestion]);

  const setAnswerIncorrect = useCallback(() => {
    setAnswerState("incorrect");
    if (currentQuestion) {
      addInCorrectMultipleChoiceQuestion(currentQuestion);
    }
  }, [currentQuestion, addInCorrectMultipleChoiceQuestion]);

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
