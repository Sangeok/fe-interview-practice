"use client";

import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { InterviewOptionsValue } from "@/fsd/pages/interview/model/type";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import Dialog from "@/fsd/shared/ui/atoms/dialog/ui";
import InterviewOptions from "./_component/InterviewOptions";
import InterviewTypeRenderer from "./_component/InterviewTypeRenderer";
import { getQuestionAnswer } from "../lib/getQuestionAnswer";
import { useHeaderButton } from "../model/hooks/useHeaderButton";
import { useMCQSession } from "../model/hooks/useMCQSession";
import { useSubjectiveSession } from "../model/hooks/useSubjectiveSession";
import HeaderButton from "./_component/HeaderButton";

export default function InterviewPage() {
  const [selectedOptions, setSelectedOptions] = useState<InterviewOptionsValue | "">("");
  const [openInterviewOptionsDialog, setOpenInterviewOptionsDialog] = useState<boolean>(true);
  const { tech, setTech } = useSelectTechStore();
  const { title: routeTech } = useParams<{ title?: string }>();

  const isInterviewSelected = selectedOptions !== "";
  const isDialogClosed = !openInterviewOptionsDialog;
  const canShowInterview = isInterviewSelected && isDialogClosed;

  const question_answer = getQuestionAnswer(tech, selectedOptions as InterviewOptionsValue);

  // 새로고침/직접 진입 시 라우트 파라미터로 tech를 복원
  useEffect(() => {
    if (routeTech && tech !== routeTech) {
      setTech(routeTech as any);
    }
  }, [routeTech, tech, setTech]);

  // MCQ(Multiple Choice Question) 세션 관리
  const { questions: mcqQuestions } = useMCQSession({
    tech,
    selectedOptions,
    canShowInterview,
    rawQuestions: selectedOptions === "Multiple Choice" ? (question_answer as MultipleChoiceQuestion[]) : [],
  });

  // Subjective 세션 관리
  const { questions: subjQuestions } = useSubjectiveSession({
    tech,
    selectedOptions,
    canShowInterview,
    rawQuestions: selectedOptions === "Subjective" ? (question_answer as SubjectiveQuestion[]) : [],
  });

  const currentQuestions = selectedOptions === "Multiple Choice" ? mcqQuestions : subjQuestions;

  const { handleGoFirst, handleAddToReview } = useHeaderButton({
    selectedOptions: selectedOptions as InterviewOptionsValue,
    setOpenInterviewOptionsDialog,
    questions: currentQuestions,
  });

  return (
    <div className="p-8 h-screen">
      <header className="text-2xl font-bold flex justify-between">
        <div>{tech} Interview</div>
        {canShowInterview && <HeaderButton handleGoFirst={handleGoFirst} handleAddToReview={handleAddToReview} />}
      </header>

      {canShowInterview && (
        <InterviewTypeRenderer
          selectedOptions={selectedOptions as InterviewOptionsValue}
          shuffledQuestions={currentQuestions}
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
