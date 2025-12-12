"use client";

import { useEffect, useState } from "react";
import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { useCustomQuestionStore } from "@/fsd/entities/customQuestion/model/useCustomQuestionStore";
import { useSubjectiveSessionStore } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/store/useSubjectiveSessionStore";
import SubjectiveInterview from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/ui";
import { CustomSubjectiveQuestion } from "@/fsd/entities/customQuestion/model/type";

export default function CustomInterviewPage() {
  const tech = useSelectTechStore((state) => state.tech);
  const questions = useCustomQuestionStore((state) => state.questions);
  const hydrateFromDB = useCustomQuestionStore((state) => state.hydrateFromDB);
  const initSession = useSubjectiveSessionStore((state) => state.initSession);

  const [filteredQuestions, setFilteredQuestions] = useState<CustomSubjectiveQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      await hydrateFromDB();
      setIsLoading(false);
    };
    loadQuestions();
  }, [hydrateFromDB]);

  useEffect(() => {
    if (!isLoading) {
      // Map technology names
      const techMap: Record<string, "javascript" | "react" | "typescript"> = {
        JavaScript: "javascript",
        React: "react",
        TypeScript: "typescript",
      };

      const mappedTech = techMap[tech as keyof typeof techMap];
      if (mappedTech) {
        const filtered = questions.filter((question) => question.technology === mappedTech);
        setFilteredQuestions(filtered);
      } else {
        setFilteredQuestions([]);
      }
    }
  }, [tech, questions, isLoading]);

  // Initialize custom interview session
  useEffect(() => {
    if (filteredQuestions.length > 0) {
      const sessionId = `custom:${tech}`;
      // Convert CustomSubjectiveQuestion to SubjectiveQuestion format
      const rawQuestions = filteredQuestions.map((question) => ({
        id: question.id,
        question: question.question,
      }));
      initSession({ sessionId, rawQuestions });
    }
  }, [filteredQuestions, tech, initSession]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-zinc-400">질문을 불러오는 중...</p>
      </div>
    );
  }

  if (filteredQuestions.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="h-screen">
      <SubjectiveInterview questionAnswer={filteredQuestions} />
    </div>
  );
}
