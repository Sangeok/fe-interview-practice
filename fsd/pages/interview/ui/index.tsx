"use client";

import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { InterviewOptionsValue } from "@/fsd/pages/interview/model/type";
import { useState } from "react";
import { arrayShuffle } from "@/fsd/shared/lib/array-shuffle";
import SubjectiveInterview from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/ui";
import MultipleChoiceInterview from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/ui";
import Dialog from "@/fsd/shared/ui/atoms/dialog/ui";
import InterviewOptions from "./_component/InterviewOptions";
import { getQuestionAnswer } from "../lib/getQuestionAnswer";
import { SubjectiveQuestion } from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/model/type";
import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";

export default function InterviewPage() {
  const [selectedOptions, setSelectedOptions] = useState<
    InterviewOptionsValue | ""
  >("");
  const [openDialog, setOpenDialog] = useState(true);
  const { tech } = useSelectTechStore();

  const question_answer = getQuestionAnswer(
    tech,
    selectedOptions as InterviewOptionsValue
  );
  const shuffledQuestions = arrayShuffle(question_answer || []);

  return (
    <div className="p-8 h-screen">
      <header className="text-2xl font-bold">{tech} Interview</header>

      {selectedOptions === "Subjective" && !openDialog && (
        <SubjectiveInterview
          questionAnswer={shuffledQuestions as SubjectiveQuestion[]}
        />
      )}
      {selectedOptions === "Multiple Choice" && !openDialog && (
        <MultipleChoiceInterview
          questionAnswer={shuffledQuestions as MultipleChoiceQuestion[]}
        />
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Select Options"
      >
        <InterviewOptions
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          onClose={() => setOpenDialog(false)}
        />
      </Dialog>
    </div>
  );
}
