"use client";

import { useUserStore } from "@/fsd/entities/user/useUserStore";
import { useSubjectiveSessionStore } from "../store/useSubjectiveSessionStore";
import { AnySubjectiveQuestion } from "../type";

interface UseHandleQuestionButtonProps {
  totalQuestions: number;
  questionAnswer: AnySubjectiveQuestion[];
  addEndMessage: () => void;
  setIsFinished: (isFinished: boolean) => void;
  clearMessagesAndShowQuestion: (question: string) => void;
  advance: (isCorrect: boolean) => void;
  questionIndex: number;
}

export const useHandleQuestionButton = ({
  totalQuestions,
  questionAnswer,
  addEndMessage,
  setIsFinished,
  clearMessagesAndShowQuestion,
  advance,
  questionIndex,
}: UseHandleQuestionButtonProps) => {
  const persistUserToDB = useUserStore((s) => s.persistUserToDB);
  const addInCorrectSubQuestion = useUserStore((s) => s.addInCorrectSubQuestion);

  const handleNextQuestion = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex < totalQuestions) {
      advance(false);
      const nextQuestion = questionAnswer[nextIndex];
      clearMessagesAndShowQuestion(nextQuestion.question);
    } else {
      addEndMessage();
      setIsFinished(true);
    }
  };

  const handleEndInterview = () => {
    addEndMessage();
    setIsFinished(true);
  };

  const handleAddReview = async () => {
    addInCorrectSubQuestion(questionAnswer[questionIndex]);
    await persistUserToDB();
    handleNextQuestion();
  };

  return {
    handleNextQuestion,
    handleEndInterview,
    handleAddReview,
  };
};
