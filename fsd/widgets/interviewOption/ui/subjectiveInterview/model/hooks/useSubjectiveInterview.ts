import { useEffect } from "react";
import { SubjectiveQuestion } from "../type";
import { Message } from "@/fsd/features/chat/chatMessage/model/type";
import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { useFeedbackAPI } from "./useFeedbackAPI";
import { useQuestionNavigation } from "./useQuestionNavigation";
import { useMessageState } from "./useMessageState";

interface UseSubjectiveInterviewReturn {
  messages: Message[];
  questionIndex: number;
  isLoading: boolean;
  handleSendMessage: (content: string) => void;
  handleNextQuestion: () => void;
  handleEndInterview: () => void;
}

export const useSubjectiveInterview = (questionAnswer: SubjectiveQuestion[]): UseSubjectiveInterviewReturn => {
  const tech = useSelectTechStore((state) => state.tech);
  const { generateFeedback, isLoading } = useFeedbackAPI();
  const { questionIndex, hasNextQuestion, moveToNextQuestion } = useQuestionNavigation(questionAnswer.length);
  const {
    messages,
    addQuestionMessage,
    addUserMessage,
    addFeedback_ActionButtonMessage,
    addEndMessage,
    clearMessagesAndShowQuestion,
  } = useMessageState();

  // 첫 번째 질문을 자동으로 표시
  useEffect(() => {
    if (questionAnswer.length > 0 && messages.length === 0) {
      addQuestionMessage(questionAnswer[0].question);
    }
  }, [questionAnswer, messages.length, addQuestionMessage]);

  const handleSendMessage = async (content: string) => {
    addUserMessage(content);

    const feedbackResult = await generateFeedback({
      tech,
      question: questionAnswer[questionIndex].question,
      answer: content,
    });

    addFeedback_ActionButtonMessage(feedbackResult.data);
  };

  const handleNextQuestion = () => {
    const moved = moveToNextQuestion();
    if (moved) {
      const nextQuestion = questionAnswer[questionIndex + 1];
      clearMessagesAndShowQuestion(nextQuestion.question);
    }
  };

  const handleEndInterview = () => {
    addEndMessage();
  };

  return {
    messages,
    questionIndex,
    isLoading,
    handleSendMessage,
    handleNextQuestion,
    handleEndInterview,
  };
};
