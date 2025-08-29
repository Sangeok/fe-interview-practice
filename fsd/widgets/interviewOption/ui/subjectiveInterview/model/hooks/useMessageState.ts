import { useState, useEffect } from "react";
import { Message } from "@/fsd/features/chat/chatMessage/model/type";
import {
  createQuestionMessage,
  createUserMessage,
  createFeedbackMessage,
  createActionButtonMessage,
  createEndMessage,
  filterButtonMessages,
} from "../../lib/messagelib";

export const useMessageState = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addQuestionMessage = (question: string) => {
    const questionMessage = createQuestionMessage(question);
    setMessages([questionMessage]);
  };

  const addUserMessage = (content: string) => {
    const userMessage = createUserMessage(content);
    setMessages(prev => [...prev, userMessage]);
  };

  const addFeedbackMessage = (feedback: string) => {
    const feedbackMessage = createFeedbackMessage(feedback);
    setMessages(prev => [...prev, feedbackMessage]);
  };

  const addActionButtonMessage = () => {
    const buttonMessage = createActionButtonMessage();
    setMessages(prev => [...prev, buttonMessage]);
  };

  const addEndMessage = () => {
    const endMessage = createEndMessage();
    setMessages(prev => [...filterButtonMessages(prev), endMessage]);
  };

  const clearMessagesAndShowQuestion = (question: string) => {
    const nextQuestionMessage = createQuestionMessage(question);
    setMessages([nextQuestionMessage]);
  };

  return {
    messages,
    addQuestionMessage,
    addUserMessage,
    addFeedbackMessage,
    addActionButtonMessage,
    addEndMessage,
    clearMessagesAndShowQuestion,
  };
};