"use client";

import { useState, useEffect, useRef } from "react";
import { Message } from "../../../../../features/chat/chatMessage/model/type";
import ChatMessage from "../../../../../features/chat/chatMessage/ui/ChatMessage";
import ChatInput from "../../../../../features/chat/chatInput/ui/ChatInput";
import ButtonMessage from "../../../../../features/chat/chatMessage/ui/_component/ButtonMessage";
import { SubjectiveQuestion } from "../model/type";

interface SubjectiveInterviewProps {
  questionAnswer: SubjectiveQuestion[];
}

export default function SubjectiveInterview({
  questionAnswer,
}: SubjectiveInterviewProps) {
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

  // 첫 번째 질문을 자동으로 표시
  useEffect(() => {
    if (questionAnswer.length > 0 && messages.length === 0) {
      const firstQuestion: Message = {
        id: Date.now(),
        role: "assistant",
        content: questionAnswer[0].question,
      };
      setMessages([firstQuestion]);
    }
  }, [questionAnswer, messages.length]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // 사용자 답변에 대한 피드백 생성
    setTimeout(() => {
      const feedbackMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: `좋은 답변입니다! "${content}"에 대한 피드백을 드리겠습니다. 이 답변은 문제의 핵심을 잘 이해하고 있음을 보여줍니다.`,
      };

      setMessages((prev) => [...prev, feedbackMessage]);
      setIsLoading(false);

      // 피드백 후 다음 액션 버튼 표시
      showActionButtons();
    }, 1500);
  };

  const showActionButtons = () => {
    setTimeout(() => {
      const buttonMessage: Message = {
        id: Date.now() + 2,
        role: "Admin",
        content: "SHOW_BUTTONS",
      };
      setMessages((prev) => [...prev, buttonMessage]);
    }, 5000);
  };

  const handleNextQuestion = () => {
    if (questionIndex < questionAnswer.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);

      const nextQuestionMessage: Message = {
        id: Date.now(),
        role: "assistant",
        content: questionAnswer[nextIndex].question,
      };

      // 버튼 메시지를 제거하고 다음 질문 추가
      setMessages((prev) => [
        ...prev.filter((msg) => msg.content !== "SHOW_BUTTONS"),
        nextQuestionMessage,
      ]);
    }
  };

  const handleEndInterview = () => {
    const endMessage: Message = {
      id: Date.now(),
      role: "assistant",
      content: "면접이 종료되었습니다. 수고하셨습니다!",
    };

    setMessages((prev) => [
      ...prev.filter((msg) => msg.content !== "SHOW_BUTTONS"),
      endMessage,
    ]);
  };

  return (
    <div className="w-full flex flex-col bg-parent h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {messages.map((message) => {
              if (message.content === "SHOW_BUTTONS") {
                return (
                  <ButtonMessage
                    key={message.id}
                    onNext={handleNextQuestion}
                    onEnd={handleEndInterview}
                    showNext={questionIndex < questionAnswer.length - 1}
                  />
                );
              }
              return <ChatMessage key={message.id} message={message} />;
            })}
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
