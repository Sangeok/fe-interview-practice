"use client";

import { useMCQSessionStore } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/store/useMCQSessionStore";
import { InterviewOptionsValue } from "../type";
import { useSubjectiveSessionStore } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/store/useSubjectiveSessionStore";
import { useUserStore } from "@/fsd/entities/user/useUserStore";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";

interface UseHeaderButtonProps {
  selectedOptions: InterviewOptionsValue;
  setOpenInterviewOptionsDialog: (open: boolean) => void;
  questions: SubjectiveQuestion[] | MultipleChoiceQuestion[];
}

export function useHeaderButton({ selectedOptions, setOpenInterviewOptionsDialog, questions }: UseHeaderButtonProps) {
  const resetSubjSession = useSubjectiveSessionStore((s) => s.resetSession);
  const resetMCQSession = useMCQSessionStore((s) => s.resetSession);

  const currentSubjQuestionIndex = useSubjectiveSessionStore((s) => s.currentIndex);
  const currentMcqQuestionIndex = useMCQSessionStore((s) => s.currentIndex);

  const addInCorrectSubQuestion = useUserStore((s) => s.addInCorrectSubQuestion);
  const addInCorrectMultipleChoiceQuestion = useUserStore((s) => s.addInCorrectMultipleChoiceQuestion);
  const persistUserToDB = useUserStore((s) => s.persistUserToDB);

  const handleGoFirst = () => {
    setOpenInterviewOptionsDialog(true);
    if (selectedOptions === "Subjective") {
      resetSubjSession();
    } else if (selectedOptions === "Multiple Choice") {
      resetMCQSession();
    }
  };

  const handleAddToReview = async () => {
    if (selectedOptions === "Subjective") {
      addInCorrectSubQuestion(questions[currentSubjQuestionIndex] as SubjectiveQuestion);
    } else if (selectedOptions === "Multiple Choice") {
      addInCorrectMultipleChoiceQuestion(questions[currentMcqQuestionIndex] as MultipleChoiceQuestion);
    }

    alert("복습 문제에 추가되었습니다.");
    await persistUserToDB();
  };

  return { handleGoFirst, handleAddToReview };
}
