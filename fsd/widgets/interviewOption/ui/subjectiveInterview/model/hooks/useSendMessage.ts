"use client";

import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { useAnswerEvaluation } from "./useSubjectiveInterview/internal/useAnswerEvaluation";
import { useFeedbackAPI } from "./useSubjectiveInterview/internal/useFeedbackAPI";
import { SubjectiveQuestion } from "../type";
import { useUserStore } from "@/fsd/entities/user/useUserStore";

interface UseSendMessageProps {
  questionAnswer: SubjectiveQuestion[];
  questionIndex: number;
  addUserMessage: (content: string) => void;
  addLoadingMessage: () => void;
  removeLoadingMessage: () => void;
  addFeedback_ActionButtonMessage: (feedback: string) => void;
  addScore: (delta: number) => void;
}

export const useSendMessage = ({
  questionAnswer,
  questionIndex,
  addUserMessage,
  addLoadingMessage,
  removeLoadingMessage,
  addFeedback_ActionButtonMessage,
  addScore,
}: UseSendMessageProps) => {
  const { generateFeedback, isLoading } = useFeedbackAPI();
  const { evaluateAnswer } = useAnswerEvaluation();

  const removeInCorrectSubQuestion = useUserStore((s) => s.removeInCorrectSubQuestion);
  const persistUserToDB = useUserStore((s) => s.persistUserToDB);
  const addInCorrectSubQuestion = useUserStore((s) => s.addInCorrectSubQuestion);

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

    // Handle incorrect answers
    if (evaluation.shouldAddToIncorrect) {
      addInCorrectSubQuestion(questionAnswer[questionIndex]);
    }

    // Handle correct answers
    if (evaluation.shouldRemoveFromIncorrect) {
      addScore(1);
      removeInCorrectSubQuestion(questionAnswer[questionIndex].id);
    }

    // Persist user state regardless of answer correctness
    await persistUserToDB();
    removeLoadingMessage();

    // Note: feedbackResult.data can be either FeedbackResponse or string (error message)
    // The type system doesn't capture this, but the runtime handles both cases correctly
    addFeedback_ActionButtonMessage(feedbackResult.data as string);
  };

  return {
    handleSendMessage,
    isLoading,
  };
};
