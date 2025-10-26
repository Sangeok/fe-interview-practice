"use client";

import { InterviewOptionsValue } from "@/fsd/pages/interview/model/type";
import { useEffect, useState } from "react";
import { arrayShuffle, shuffleMultipleChoiceQuestions } from "@/fsd/shared/lib/array-shuffle";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import Dialog from "@/fsd/shared/ui/atoms/dialog/ui";
import InterviewOptions from "@/fsd/pages/interview/ui/_component/InterviewOptions";
import InterviewTypeRenderer from "@/fsd/pages/interview/ui/_component/InterviewTypeRenderer";
import { useUserStore } from "@/fsd/entities/user/useUserStore";

export default function ReviewPage() {
  const [selectedOptions, setSelectedOptions] = useState<InterviewOptionsValue | "">("");
  const [openDialog, setOpenDialog] = useState(true);
  const [sessionQuestions, setSessionQuestions] = useState<(SubjectiveQuestion | MultipleChoiceQuestion)[] | null>(
    null
  );

  const inCorrectSubQuestion = useUserStore((s) => s.user.inCorrectSubQuestion);
  const inCorrectMultipleChoiceQuestion = useUserStore((s) => s.user.inCorrectMultipleChoiceQuestion);

  const isInterviewSelected = selectedOptions !== "";
  const isDialogClosed = !openDialog;
  const canShowInterview = isInterviewSelected && isDialogClosed;

  const question_answer = selectedOptions === "Subjective" ? inCorrectSubQuestion : inCorrectMultipleChoiceQuestion;

  // 세션 시작 시 1회 스냅샷 생성 (옵션 선택 완료 + 다이얼로그 닫힘)
  useEffect(() => {
    if (!openDialog && selectedOptions !== "" && sessionQuestions === null) {
      const base =
        selectedOptions === "Multiple Choice" ? inCorrectMultipleChoiceQuestion || [] : inCorrectSubQuestion || [];
      const frozen =
        selectedOptions === "Multiple Choice"
          ? shuffleMultipleChoiceQuestions(base as MultipleChoiceQuestion[])
          : arrayShuffle(base as SubjectiveQuestion[]);
      setSessionQuestions(frozen);
    }
  }, [openDialog, selectedOptions, sessionQuestions, inCorrectMultipleChoiceQuestion, inCorrectSubQuestion]);

  // 다이얼로그를 다시 열면 새 세션을 위해 초기화
  useEffect(() => {
    if (openDialog) {
      setSessionQuestions(null);
    }
  }, [openDialog]);

  return (
    <div className="p-8 h-screen">
      <header className="text-2xl font-bold">Review</header>

      {canShowInterview && sessionQuestions && (
        <InterviewTypeRenderer
          selectedOptions={selectedOptions as InterviewOptionsValue}
          shuffledQuestions={sessionQuestions}
        />
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} title="Select Options">
        <InterviewOptions
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          onClose={() => setOpenDialog(false)}
        />
      </Dialog>
    </div>
  );
}
