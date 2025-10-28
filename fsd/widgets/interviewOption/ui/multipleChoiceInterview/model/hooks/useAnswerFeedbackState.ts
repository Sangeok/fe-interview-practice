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

  // Derived
  isAnswerCorrect: boolean;
  isAnswerChecked: boolean;

  // Computed (UI flags)
  showCorrectCard: boolean;
  showIncorrectInterpret: boolean;

  // Actions
  markCorrect: () => void;
  markIncorrect: () => void;
  setInterpret: (interpret: MultipleChoiceInterpretType | null) => void;
  setLoading: (loading: boolean) => void;
  resetAnswerState: () => void;
  handleAddReview: () => void;
}

export function useAnswerFeedbackState(currentQuestion: MultipleChoiceQuestion | null): UseAnswerFeedbackStateReturn {
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [interpret, setInterpret] = useState<MultipleChoiceInterpretType | null>(null);

  const addInCorrectMultipleChoiceQuestion = useUserStore((state) => state.addInCorrectMultipleChoiceQuestion);
  const removeInCorrectMultipleChoiceQuestion = useUserStore((state) => state.removeInCorrectMultipleChoiceQuestion);

  const showCorrectCard = answerState === "correct";
  const showIncorrectInterpret = answerState === "incorrect";
  const isAnswerCorrect = answerState === "correct";
  const isAnswerChecked = answerState !== "idle";

  const persistUserToDB = useUserStore((s) => s.persistUserToDB);

  const markCorrect = useCallback(() => {
    setAnswerState("correct");
    if (currentQuestion) {
      removeInCorrectMultipleChoiceQuestion(currentQuestion.id);
    }
  }, [currentQuestion, removeInCorrectMultipleChoiceQuestion]);

  const markIncorrect = useCallback(() => {
    setAnswerState("incorrect");
    if (currentQuestion) {
      addInCorrectMultipleChoiceQuestion(currentQuestion);
    }
  }, [currentQuestion, addInCorrectMultipleChoiceQuestion]);

  const resetAnswerState = useCallback(() => {
    setAnswerState("idle");
    setInterpret(null);
  }, []);

  const handleAddReview = useCallback(async () => {
    if (currentQuestion) {
      addInCorrectMultipleChoiceQuestion(currentQuestion);
      await persistUserToDB();
      alert("복습 문제에 추가되었습니다.");
    }
  }, [currentQuestion, addInCorrectMultipleChoiceQuestion]);

  return {
    answerState,
    isLoading,
    interpret,
    isAnswerCorrect,
    isAnswerChecked,
    showCorrectCard,
    showIncorrectInterpret,
    markCorrect,
    markIncorrect,
    setInterpret,
    setLoading: setIsLoading,
    resetAnswerState,
    handleAddReview,
  };
}
