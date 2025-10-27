import { useState, useCallback } from "react";
import { MultipleChoiceQuestion } from "../type";

interface UseMultipleChoiceQuizParams {
  questions: MultipleChoiceQuestion[];
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
}

export function useMultipleChoiceQuiz({ questions }: UseMultipleChoiceQuizParams): UseMultipleChoiceQuizReturn {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const isQuizFinished = currentQuestionIndex >= questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const goNext = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  }, []);

  return {
    currentQuestion,
    currentQuestionIndex,
    score,
    isQuizFinished,
    totalQuestions: questions.length,
    goNext,
  };
}
