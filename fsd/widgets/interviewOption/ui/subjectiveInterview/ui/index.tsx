"use client";

import { useRef } from "react";
import ChatMessage from "../../../../../features/chat/chatMessage/ui/ChatMessage";
import ChatInput from "../../../../../features/chat/chatInput/ui/ChatInput";
import { SubjectiveQuestion } from "../model/type";
import { useScrollToBottom } from "../model/hooks/useScrollToBottom";
import { useSubjectiveInterview } from "../model/hooks/useSubjectiveInterview";

interface SubjectiveInterviewProps {
  questionAnswer: SubjectiveQuestion[];
}

export default function SubjectiveInterview({ questionAnswer }: SubjectiveInterviewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    questionIndex,
    isLoading,
    handleSendMessage,
    handleNextQuestion,
    handleEndInterview,
    score,
    totalQuestions,
    isFinished,
  } = useSubjectiveInterview(questionAnswer);

  useScrollToBottom(messages, messagesEndRef);

  // 종료 상태면 점수 요약 UI 렌더링
  if (isFinished) {
    return (
      <div className="w-full h-full flex flex-col bg-parent">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">면접 완료!</h2>
              <p className="text-xl">
                총 점수: {score} / {totalQuestions}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-parent">
      {/* 전체 스크롤 영역 - 화면 전체 폭 사용 */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* 콘텐츠 폭 제한 및 중앙정렬 - 큰 화면에서만 적용 */}
        <div className="max-w-4xl mx-auto">
          {/* 메시지 간격 조정 - 순수 콘텐츠 스타일링 */}
          <div className="space-y-6">
            {messages.map((message) => {
              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onNext={handleNextQuestion}
                  onEnd={handleEndInterview}
                  showNext={questionIndex < questionAnswer.length - 1}
                  isLoading={isLoading}
                />
              );
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
