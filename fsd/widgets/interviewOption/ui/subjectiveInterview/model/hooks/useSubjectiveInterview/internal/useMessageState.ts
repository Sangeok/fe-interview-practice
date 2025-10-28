import { useState } from "react";
import { Message } from "@/fsd/features/chat/chatMessage/model/type";
import {
  createQuestionMessage,
  createUserMessage,
  createFeedbackMessage,
  createActionButtonMessage,
  createEndMessage,
  filterButtonMessages,
  createLoadingMessage,
} from "../../../../lib/messagelib";

export const useMessageState = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addQuestionMessage = (question: string) => {
    const questionMessage = createQuestionMessage(question);
    setMessages([questionMessage]);
  };

  const addUserMessage = (content: string) => {
    const userMessage = createUserMessage(content);
    setMessages((prev) => [...prev, userMessage]);
  };

  const addLoadingMessage = () => {
    const loadingMessage = createLoadingMessage();
    setMessages((prev) => [...prev, loadingMessage]);
  };

  const removeLoadingMessage = () => {
    setMessages((prev) => prev.filter((message) => message.content !== "AI가 답변을 생성하는 중입니다..."));
  };

  const addFeedback_ActionButtonMessage = (feedback: string) => {
    const feedbackMessage = createFeedbackMessage(feedback);
    const buttonMessage = createActionButtonMessage();
    setMessages((prev) => [...prev, feedbackMessage, buttonMessage]);
  };

  const addEndMessage = () => {
    const endMessage = createEndMessage();
    setMessages((prev) => [...filterButtonMessages(prev), endMessage]);
  };

  const clearMessagesAndShowQuestion = (question: string) => {
    const nextQuestionMessage = createQuestionMessage(question);
    setMessages([nextQuestionMessage]);
  };

  return {
    messages,
    addQuestionMessage,
    addUserMessage,
    addLoadingMessage,
    removeLoadingMessage,
    addFeedback_ActionButtonMessage,
    addEndMessage,
    clearMessagesAndShowQuestion,
  };
};
