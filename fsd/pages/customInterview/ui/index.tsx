"use client";

import { useEffect, useState } from "react";
import { useCustomQuestionStore } from "@/fsd/entities/customQuestion/model/useCustomQuestionStore";
import { useSubjectiveSessionStore } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/store/useSubjectiveSessionStore";
import SubjectiveInterview from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/ui";
import { CustomSubjectiveQuestion, Technology } from "@/fsd/entities/customQuestion/model/type";
import { useParams } from "next/navigation";

export default function CustomInterviewPage() {
  const params = useParams();
  const tech = (decodeURIComponent(params.title as string) as Technology) || "";
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
      if (tech) {
        const filtered = questions.filter((question) => question.technology === tech);
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
      <SubjectiveInterview questionAnswer={filteredQuestions} isCustomInterview={true} />
    </div>
  );
}
