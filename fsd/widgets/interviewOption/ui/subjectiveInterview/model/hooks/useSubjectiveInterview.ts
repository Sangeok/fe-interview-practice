import { useState, useEffect } from "react";
import { SubjectiveQuestion } from "../type";
import {
  createQuestionMessage,
  createUserMessage,
  createFeedbackMessage,
  createActionButtonMessage,
  createEndMessage,
  filterButtonMessages,
} from "../../lib/messagelib";
import { Message } from "@/fsd/features/chat/chatMessage/model/type";
import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";

interface UseSubjectiveInterviewReturn {
  messages: Message[];
  questionIndex: number;
  isLoading: boolean;
  handleSendMessage: (content: string) => void;
  handleNextQuestion: () => void;
  handleEndInterview: () => void;
}

export const useSubjectiveInterview = (
  questionAnswer: SubjectiveQuestion[]
): UseSubjectiveInterviewReturn => {
  const tech = useSelectTechStore((state) => state.tech);
  const [messages, setMessages] = useState<Message[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  // 첫 번째 질문을 자동으로 표시
  useEffect(() => {
    if (questionAnswer.length > 0 && messages.length === 0) {
      const firstQuestion = createQuestionMessage(questionAnswer[0].question);
      setMessages([firstQuestion]);
    }
  }, [questionAnswer, messages.length]);

  const handleSendMessage = async (content: string) => {
    const userMessage = createUserMessage(content);
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // 사용자 답변에 대한 피드백 생성
    // setTimeout(() => {
    //   const feedbackMessage = createFeedbackMessage(content);
    //   setMessages((prev) => [...prev, feedbackMessage]);
    //   setIsLoading(false);

    //   // 피드백 후 다음 액션 버튼 표시
    //   showActionButtons();
    // }, 1500);

    try {
      const response = await fetch("/api/generate-feedback", {
        method: "POST",
        body: JSON.stringify({
          tech: tech,
          question: questionAnswer[questionIndex].question,
          answer: content,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showActionButtons = () => {
    setTimeout(() => {
      const buttonMessage = createActionButtonMessage();
      setMessages((prev) => [...prev, buttonMessage]);
    }, 5000);
  };

  const handleNextQuestion = () => {
    if (questionIndex < questionAnswer.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);

      const nextQuestionMessage = createQuestionMessage(
        questionAnswer[nextIndex].question
      );

      // 버튼 메시지를 제거하고 다음 질문 추가
      setMessages([nextQuestionMessage]);
    }
  };

  const handleEndInterview = () => {
    const endMessage = createEndMessage();

    setMessages((prev) => [...filterButtonMessages(prev), endMessage]);
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
