"use client";

import { useUserStore } from "@/fsd/entities/user/useUserStore";
import { AnySubjectiveQuestion } from "../type";
import { Message } from "@/fsd/features/chat/chatMessage/model/type";
import { FeedbackData, DeepDiveFeedbackData } from "@/fsd/shared/model/type";

interface UseHandleQuestionButtonProps {
  totalQuestions: number;
  questionAnswer: AnySubjectiveQuestion[];
  addEndMessage: () => void;
  setIsFinished: (isFinished: boolean) => void;
  clearMessagesAndShowQuestion: (question: string) => void;
  advance: (isCorrect: boolean) => void;
  questionIndex: number;
  isCustomInterview?: boolean;
  messages: Message[];
}

export const useHandleQuestionButton = ({
  totalQuestions,
  questionAnswer,
  addEndMessage,
  setIsFinished,
  clearMessagesAndShowQuestion,
  advance,
  questionIndex,
  isCustomInterview = false,
}: UseHandleQuestionButtonProps) => {
  const persistUserToDB = useUserStore((s) => s.persistUserToDB);
  const addInCorrectSubQuestion = useUserStore((s) => s.addInCorrectSubQuestion);
  const addInCorrectCustomQuestion = useUserStore((s) => s.addInCorrectCustomQuestion);

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
    if (isCustomInterview) {
      addInCorrectCustomQuestion(questionAnswer[questionIndex]);
    } else {
      addInCorrectSubQuestion(questionAnswer[questionIndex]);
    }
    await persistUserToDB();
    handleNextQuestion();
  };

  return {
    handleNextQuestion,
    handleEndInterview,
    handleAddReview,
  };
};
