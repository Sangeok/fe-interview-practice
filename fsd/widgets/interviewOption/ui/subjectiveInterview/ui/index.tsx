"use client";

import { useState, useEffect, useRef } from "react";
import { Message } from "../../../../../features/chat/chatMessage/model/type";
import ChatMessage from "../../../../../features/chat/chatMessage/ui/ChatMessage";
import ChatInput from "../../../../../features/chat/chatInput/ui/ChatInput";
import StartConversation from "./_component/StartConversation";

const initialMessages: Message[] = [
  {
    id: 1,
    role: "Admin",
    content: "안녕하세요! 면접 시뮬레이션을 시작합니다.",
  },
];

export default function SubjectiveInterview() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: `"${content}"에 대한 답변을 생성 중입니다... (시뮬레이션)`,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      handleContinueMessage();
      setIsLoading(false);
    }, 1500);
  };

  const handleContinueMessage = () => {
    setTimeout(() => {
      const adminMessage: Message = {
        id: Date.now() + 2,
        role: "Admin",
        content: "안녕하세요! 면접 시뮬레이션을 시작합니다.",
      };
      setMessages((prev) => [...prev, adminMessage]);
    }, 5000);
  };

  return (
    <div className="w-full flex flex-col bg-parent h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <footer className="p-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </footer>
    </div>
  );
}
