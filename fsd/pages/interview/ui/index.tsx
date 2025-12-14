"use client";

import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import type { TechType } from "@/fsd/shared/model/type";
import { InterviewOptionsValue } from "@/fsd/pages/interview/model/type";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import Dialog from "@/fsd/shared/ui/atoms/dialog/ui";
import InterviewOptions from "./_component/InterviewOptions";
import InterviewTypeRenderer from "./_component/InterviewTypeRenderer";
import { getQuestionAnswer } from "../lib/getQuestionAnswer";
import { isValidInterviewOption } from "../lib/isValidInterviewOption";
import { useHeaderButton } from "../model/hooks/useHeaderButton";
import { useMCQSession } from "../model/hooks/useMCQSession";
import { useSubjectiveSession } from "../model/hooks/useSubjectiveSession";
import HeaderButton from "./_component/HeaderButton";
import { isTechType } from "../lib/isTechType";
import { isMultipleChoiceQuestions, isSubjectiveQuestions } from "../lib/isQuestionType";

interface InterviewContentProps {
  tech: TechType;
  selectedOptions: InterviewOptionsValue;
  currentQuestions: MultipleChoiceQuestion[] | SubjectiveQuestion[];
  setOpenInterviewOptionsDialog: Dispatch<SetStateAction<boolean>>;
}

function InterviewContent({
  tech,
  selectedOptions,
  currentQuestions,
  setOpenInterviewOptionsDialog,
}: InterviewContentProps) {
  const { handleGoFirst, handleAddToReview } = useHeaderButton({
    selectedOptions,
    setOpenInterviewOptionsDialog,
    questions: currentQuestions,
  });

  return (
    <>
      <header className="text-2xl font-bold flex justify-between">
        <div>{tech} Interview</div>
        <HeaderButton handleGoFirst={handleGoFirst} handleAddToReview={handleAddToReview} />
      </header>

      <InterviewTypeRenderer selectedOptions={selectedOptions} shuffledQuestions={currentQuestions} />
    </>
  );
}

export default function InterviewPage() {
  const [selectedOptions, setSelectedOptions] = useState<InterviewOptionsValue | "">("");
  const [openInterviewOptionsDialog, setOpenInterviewOptionsDialog] = useState<boolean>(true);
  const { tech, setTech } = useSelectTechStore();
  const { title: routeTech } = useParams<{ title?: string }>();

  const isInterviewSelected = selectedOptions !== "";
  const isDialogClosed = !openInterviewOptionsDialog;
  const canShowInterview = isInterviewSelected && isDialogClosed;

  const question_answer = useMemo(() => {
    return canShowInterview && isValidInterviewOption(selectedOptions) ? getQuestionAnswer(tech, selectedOptions) : [];
  }, [tech, selectedOptions, canShowInterview]);

  // 새로고침/직접 진입 시 라우트 파라미터로 tech를 복원
  useEffect(() => {
    if (routeTech && tech !== routeTech && isTechType(routeTech)) {
      setTech(routeTech);
    }
  }, [routeTech, tech, setTech]);

  // MCQ(Multiple Choice Question) 세션 관리
  const { questions: mcqQuestions } = useMCQSession({
    tech,
    selectedOptions,
    canShowInterview,
    rawQuestions:
      canShowInterview && isMultipleChoiceQuestions(question_answer, selectedOptions) ? question_answer : [],
  });

  // Subjective 세션 관리
  const { questions: subjQuestions } = useSubjectiveSession({
    tech,
    selectedOptions,
    canShowInterview,
    rawQuestions: canShowInterview && isSubjectiveQuestions(question_answer, selectedOptions) ? question_answer : [],
  });

  const currentQuestions = selectedOptions === "Multiple Choice" ? mcqQuestions : subjQuestions;

  return (
    <div className="p-8 h-screen">
      {canShowInterview && isValidInterviewOption(selectedOptions) && (
        <InterviewContent
          tech={tech}
          selectedOptions={selectedOptions}
          currentQuestions={currentQuestions}
          setOpenInterviewOptionsDialog={setOpenInterviewOptionsDialog}
        />
      )}

      <Dialog
        open={openInterviewOptionsDialog}
        onClose={() => setOpenInterviewOptionsDialog(false)}
        title="Select Options"
      >
        <InterviewOptions
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          onClose={() => setOpenInterviewOptionsDialog(false)}
        />
      </Dialog>
    </div>
  );
}
