"use client";

import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { useAnswerEvaluation } from "./useSubjectiveInterview/internal/useAnswerEvaluation";
import { useFeedbackAPI } from "./useSubjectiveInterview/internal/useFeedbackAPI";
import { AnySubjectiveQuestion } from "../type";
import { useUserStore } from "@/fsd/entities/user/useUserStore";

interface UseSendMessageProps {
  questionAnswer: AnySubjectiveQuestion[];
  questionIndex: number;
  addUserMessage: (content: string) => void;
  addLoadingMessage: () => void;
  removeLoadingMessage: () => void;
  addFeedback_ActionButtonMessage: (feedback: string) => void;
  addScore: (delta: number) => void;
  isCustomInterview?: boolean;
}

export const useSendMessage = ({
  questionAnswer,
  questionIndex,
  addUserMessage,
  addLoadingMessage,
  removeLoadingMessage,
  addFeedback_ActionButtonMessage,
  addScore,
  isCustomInterview = false,
}: UseSendMessageProps) => {
  const { generateFeedback, isLoading } = useFeedbackAPI();
  const { evaluateAnswer } = useAnswerEvaluation();

  const persistUserToDB = useUserStore((s) => s.persistUserToDB);
  const addInCorrectSubQuestion = useUserStore((s) => s.addInCorrectSubQuestion);
  const addInCorrectCustomQuestion = useUserStore((s) => s.addInCorrectCustomQuestion);
  const removeInCorrectCustomQuestion = useUserStore((s) => s.removeInCorrectCustomQuestion);
  const removeInCorrectSubQuestion = useUserStore((s) => s.removeInCorrectSubQuestion);

  const tech = useSelectTechStore((state) => state.tech);

  const handleSendMessage = async (content: string) => {
    addUserMessage(content);
    addLoadingMessage();

    const feedbackResult = await generateFeedback({
      tech,
      question: questionAnswer[questionIndex].question,
      answer: content,
    });
    console.log("feedbackResult", feedbackResult);

    // Evaluate answer using dedicated hook
    const evaluation = evaluateAnswer(feedbackResult);

    if (isCustomInterview) {
      // Handle custom interview questions
      if (evaluation.shouldAddToIncorrect) {
        addInCorrectCustomQuestion(questionAnswer[questionIndex]);
      }

      if (evaluation.shouldRemoveFromIncorrect) {
        addScore(1);
        removeInCorrectCustomQuestion(questionAnswer[questionIndex].id as string);
      }
    } else {
      // Handle standard interview questions
      if (evaluation.shouldAddToIncorrect) {
        addInCorrectSubQuestion(questionAnswer[questionIndex]);
      }

      if (evaluation.shouldRemoveFromIncorrect) {
        addScore(1);
        removeInCorrectSubQuestion(questionAnswer[questionIndex].id);
        removeInCorrectCustomQuestion(questionAnswer[questionIndex].id as string);
      }
    }

    // Persist user state regardless of answer correctness
    await persistUserToDB();
    removeLoadingMessage();

    // Convert feedback to JSON string if it's an object, otherwise use as is
    addFeedback_ActionButtonMessage(feedbackResult.data as string);
  };

  return {
    handleSendMessage,
    isLoading,
  };
};
