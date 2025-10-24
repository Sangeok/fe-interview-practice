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
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

export function useMultipleChoiceQuiz({ questions }: UseMultipleChoiceQuizParams): UseMultipleChoiceQuizReturn {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const isQuizFinished = currentQuestionIndex >= questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const onCorrectAnswer = useCallback(() => {
    setScore((prev) => prev + 1);
    setCurrentQuestionIndex((prev) => prev + 1);
  }, []);

  const onIncorrectAnswer = useCallback(() => {
    // 점수는 증가하지 않고 다음 문제로만 이동
    setCurrentQuestionIndex((prev) => prev + 1);
  }, []);

  return {
    currentQuestion,
    currentQuestionIndex,
    score,
    isQuizFinished,
    totalQuestions: questions.length,
    onCorrectAnswer,
    onIncorrectAnswer,
  };
}
