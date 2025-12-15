"use client";

import { useRef } from "react";
import ChatMessage from "../../../../../features/chat/chatMessage/ui/ChatMessage";
import ChatInput from "../../../../../features/chat/chatInput/ui/ChatInput";
import { AnySubjectiveQuestion } from "../model/type";
import { useScrollToBottom } from "../model/hooks/useScrollToBottom";
import { useSubjectiveInterview } from "../model/hooks/useSubjectiveInterview";
import EndSubjectQuestion from "./_component/EndSubjectQuestion";

interface SubjectiveInterviewProps {
  questionAnswer: AnySubjectiveQuestion[];
  isReviewMode?: boolean;
  isCustomInterview?: boolean;
}

export default function SubjectiveInterview({
  questionAnswer,
  isCustomInterview = false,
  isReviewMode = false,
}: SubjectiveInterviewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    questionIndex,
    isLoading,
    handleSendMessage,
    handleNextQuestion,
    handleEndInterview,
    handleAddReview,
    score,
    totalQuestions,
    isFinished,
  } = useSubjectiveInterview(questionAnswer, isCustomInterview, isReviewMode);

  useScrollToBottom(messages, messagesEndRef);

  // 종료 상태면 점수 요약 UI 렌더링
  if (isFinished) {
    return <EndSubjectQuestion score={score} totalQuestions={totalQuestions} />;
  }

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Atmospheric Background Layer */}
      <div className="fixed inset-0 bg-[#0a0a0a] -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-grain-texture opacity-30"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-float-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-lime-500/10 rounded-full blur-[120px] animate-float-slower"></div>
      </div>

      {/* Floating Code Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5 opacity-40">
        <div className="absolute top-[10%] left-[5%] animate-float-badge-1 text-cyan-400/30 font-mono text-xs">
          {"{ }"}
        </div>
        <div className="absolute top-[20%] right-[8%] animate-float-badge-2 text-lime-400/30 font-mono text-xs">
          {"=>"}
        </div>
        <div className="absolute bottom-[30%] left-[12%] animate-float-badge-3 text-cyan-400/30 font-mono text-xs">
          {"()"}
        </div>
        <div className="absolute top-[60%] right-[15%] animate-float-badge-1 text-lime-400/30 font-mono text-xs">
          {"</>"}
        </div>
      </div>

      {/* Neural Interface Header */}
      <header className="relative border-b border-zinc-800/50 bg-zinc-900/40 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse-glow"></div>
                <span className="text-lime-400 font-mono text-xs tracking-wider">CONNECTED</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-zinc-700"></div>
              <span className="hidden sm:inline-block text-zinc-500 font-mono text-xs">
                Neural Interview Interface
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-xs sm:text-sm">
                Q {questionIndex + 1}/{totalQuestions}
              </span>
              <div className="hidden sm:flex h-1.5 w-24 bg-zinc-800/50 rounded-full overflow-hidden border border-zinc-700/50">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-lime-500 transition-all duration-500 ease-out"
                  style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {messages.map((message, index) => {
              return (
                <div
                  key={message.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ChatMessage
                    message={message}
                    onNext={handleNextQuestion}
                    onEnd={handleEndInterview}
                    onAddReview={handleAddReview}
                    showNext={questionIndex < questionAnswer.length - 1}
                    isLoading={isLoading}
                  />
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Neural Input Footer */}
      <footer className="relative border-t border-zinc-800/50 bg-zinc-900/40 backdrop-blur-md px-4 py-4 sm:px-6 sm:py-5">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </footer>
    </div>
  );
}
