"use client";

import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { InterviewOptionsValue } from "@/fsd/pages/interview/model/type";
import { useState } from "react";
import { arrayShuffle, shuffleMultipleChoiceQuestions } from "@/fsd/shared/lib/array-shuffle";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";
import Dialog from "@/fsd/shared/ui/atoms/dialog/ui";
import InterviewOptions from "./_component/InterviewOptions";
import InterviewTypeRenderer from "./_component/InterviewTypeRenderer";
import { getQuestionAnswer } from "../lib/getQuestionAnswer";

export default function InterviewPage() {
  const [selectedOptions, setSelectedOptions] = useState<InterviewOptionsValue | "">("");
  const [openDialog, setOpenDialog] = useState(true);
  const { tech } = useSelectTechStore();

  const isInterviewSelected = selectedOptions !== "";
  const isDialogClosed = !openDialog;
  const canShowInterview = isInterviewSelected && isDialogClosed;

  const question_answer = getQuestionAnswer(tech, selectedOptions as InterviewOptionsValue);

  // Multiple Choice인 경우 options도 함께 섞기
  const shuffledQuestions =
    selectedOptions === "Multiple Choice"
      ? shuffleMultipleChoiceQuestions((question_answer as MultipleChoiceQuestion[]) || [])
      : arrayShuffle(question_answer || []);

  return (
    <div className="p-8 h-screen">
      <header className="text-2xl font-bold">{tech} Interview</header>

      {canShowInterview && (
        <InterviewTypeRenderer
          selectedOptions={selectedOptions as InterviewOptionsValue}
          shuffledQuestions={shuffledQuestions}
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
