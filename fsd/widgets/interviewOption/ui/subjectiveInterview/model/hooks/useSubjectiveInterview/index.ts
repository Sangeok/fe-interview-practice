import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { AnySubjectiveQuestion } from "../../type";
import { Message } from "@/fsd/features/chat/chatMessage/model/type";
import { useFeedbackAPI } from "./internal/useFeedbackAPI";
import { useMessageState } from "./internal/useMessageState";
import { useAnswerEvaluation } from "./internal/useAnswerEvaluation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/fsd/entities/user/useUserStore";
import { useSubjectiveSessionStore } from "../../store/useSubjectiveSessionStore";
import { useSendMessage } from "../useSendMessage";
import { useHandleQuestionButton } from "../useHandleQuestionButton";
import { useReviewSubjectiveSession } from "../useReviewSubjectiveSession";

interface UseSubjectiveInterviewReturn {
  messages: Message[];
  questionIndex: number;
  isLoading: boolean;
  score: number;
  totalQuestions: number;
  isFinished: boolean;
  handleSendMessage: (content: string) => void;
  handleNextQuestion: () => void;
  handleEndInterview: () => void;
  handleAddReview: () => void;
}

export const useSubjectiveInterview = (
  questionAnswer: AnySubjectiveQuestion[],
  isReviewMode = false
): UseSubjectiveInterviewReturn => {
  // 모드별 세션 관리
  const normalSession = {
    questionIndex: useSubjectiveSessionStore((s) => s.currentIndex),
    score: useSubjectiveSessionStore((s) => s.score),
    advance: useSubjectiveSessionStore((s) => s.advance),
    addScore: useSubjectiveSessionStore((s) => s.addScore),
  };
  const reviewSession = useReviewSubjectiveSession();

  const { questionIndex, score, advance, addScore } = isReviewMode ? reviewSession : normalSession;

  const {
    messages,
    addLoadingMessage,
    addQuestionMessage,
    addUserMessage,
    addFeedback_ActionButtonMessage,
    addEndMessage,
    removeLoadingMessage,
    clearMessagesAndShowQuestion,
  } = useMessageState();

  const [isFinished, setIsFinished] = useState(false);
  const totalQuestions = questionAnswer.length;

  // 첫 번째 질문을 자동으로 표시
  useEffect(() => {
    if (questionAnswer.length > 0 && messages.length === 0) {
      addQuestionMessage(questionAnswer[0].question);
    }
  }, [questionAnswer, messages.length, addQuestionMessage]);

  const { handleSendMessage, isLoading } = useSendMessage({
    questionAnswer,
    questionIndex,
    addUserMessage,
    addLoadingMessage,
    removeLoadingMessage,
    addFeedback_ActionButtonMessage,
    addScore,
  });

  const { handleNextQuestion, handleEndInterview, handleAddReview } = useHandleQuestionButton({
    totalQuestions,
    questionAnswer,
    addEndMessage,
    setIsFinished,
    clearMessagesAndShowQuestion,
    advance,
    questionIndex,
  });

  return {
    messages,
    questionIndex,
    isLoading,
    score,
    totalQuestions,
    isFinished,
    handleSendMessage,
    handleNextQuestion,
    handleEndInterview,
    handleAddReview,
  };
};
