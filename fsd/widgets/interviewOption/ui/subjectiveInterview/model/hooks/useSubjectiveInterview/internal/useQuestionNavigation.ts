import { useState } from "react";

export const useQuestionNavigation = (totalQuestions: number) => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const isFirstQuestion = questionIndex === 0;
  const isLastQuestion = questionIndex >= totalQuestions - 1;
  const hasNextQuestion = questionIndex < totalQuestions - 1;

  const moveToNextQuestion = () => {
    if (hasNextQuestion) {
      const newIndex = questionIndex + 1;
      setQuestionIndex(newIndex);
      return { success: true, newIndex }; // 새로운 인덱스 반환
    }
    return { success: false, newIndex: questionIndex }; // 현재 인덱스 반환
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
