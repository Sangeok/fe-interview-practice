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
      <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
        <p className="text-lg">질문이 없습니다</p>
        <p className="text-sm">+ 버튼을 눌러 질문을 추가하세요</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sortedQuestions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}
