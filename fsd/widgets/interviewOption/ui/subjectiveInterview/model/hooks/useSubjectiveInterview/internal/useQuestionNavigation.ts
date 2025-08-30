import { useState } from "react";

export const useQuestionNavigation = (totalQuestions: number) => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const isFirstQuestion = questionIndex === 0;
  const isLastQuestion = questionIndex >= totalQuestions - 1;
  const hasNextQuestion = questionIndex < totalQuestions - 1;

  const moveToNextQuestion = () => {
    if (hasNextQuestion) {
      setQuestionIndex(prev => prev + 1);
      return true;
    }
    return false;
  };

  const resetToFirst = () => {
    setQuestionIndex(0);
  };

  return {
    questionIndex,
    isFirstQuestion,
    isLastQuestion,
    hasNextQuestion,
    moveToNextQuestion,
    resetToFirst,
  };
};