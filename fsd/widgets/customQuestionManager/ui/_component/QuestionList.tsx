"use client";

import { Technology } from "@/fsd/entities/customQuestion/model/type";
import { useCustomQuestionStore } from "@/fsd/entities/customQuestion/model/useCustomQuestionStore";
import { useMemo } from "react";
import QuestionCard from "./QuestionCard";

interface QuestionListProps {
  selectedTechnology: Technology;
}

export default function QuestionList({ selectedTechnology }: QuestionListProps) {
  const questions = useCustomQuestionStore((state) => state.questions);

  const filteredQuestions = useMemo(
    () => questions.filter((question) => question.technology === selectedTechnology),
    [questions, selectedTechnology]
  );

  const sortedQuestions = useMemo(
    () => [...filteredQuestions].sort((a, b) => b.createdAt - a.createdAt),
    [filteredQuestions]
  );

  if (sortedQuestions.length === 0) {
    return (
      <div className="relative min-h-[400px] flex items-center justify-center">
        {/* Terminal Empty State */}
        <div className="text-center animate-fade-in">
          <div className="mb-6 inline-block">
            <div className="relative">
              {/* Pulsing Cursor */}
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-zinc-700 rounded-lg flex items-center justify-center bg-zinc-900/50 backdrop-blur-sm">
                <div className="w-1.5 h-8 bg-cyan-400 animate-pulse"></div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 blur-2xl bg-cyan-500/20 animate-pulse-glow"></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-zinc-600 text-sm">
              <span className="text-cyan-400">{">"}</span> NO_DATA_FOUND
            </div>
            <p className="text-zinc-400 text-lg font-medium">질문이 없습니다</p>
            <p className="text-zinc-600 text-sm font-mono">
              <span className="text-lime-400">+</span> 버튼을 눌러 질문을 추가하세요
            </p>
          </div>

          {/* Decorative Grid Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
      {sortedQuestions.map((question, index) => (
        <div
          key={question.id}
          style={{
            animationDelay: `${index * 50}ms`,
          }}
        >
          <QuestionCard question={question} />
        </div>
      ))}
    </div>
  );
}
