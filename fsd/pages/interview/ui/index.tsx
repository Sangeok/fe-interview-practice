"use client";

import { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";
import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { InterviewOptionsValue } from "@/fsd/pages/interview/model/type";
import { useState } from "react";
import {
  MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_JAVASCRIPT,
  MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_REACT,
  MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_TYPESCRIPT,
} from "../constants";
import { arrayShuffle } from "@/fsd/shared/lib/array-shuffle";
import SubjectiveInterview from "@/fsd/widgets/interviewOption/ui/subjectiveInterview/ui";
import MultipleChoiceInterview from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/ui";
import Dialog from "@/fsd/shared/ui/atoms/dialog/ui";
import InterviewOptions from "./_component/InterviewOptions";

export default function InterviewPage() {
  const [selectedOptions, setSelectedOptions] = useState<
    InterviewOptionsValue | ""
  >("");
  const [openDialog, setOpenDialog] = useState(true);
  const { tech } = useSelectTechStore();

  let question_answer: MultipleChoiceQuestion[] = [];

  switch (tech) {
    case "JavaScript":
      question_answer = MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_JAVASCRIPT;
      break;
    case "React":
      question_answer = MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_REACT;
      break;
    case "TypeScript":
      question_answer = MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_TYPESCRIPT;
      break;
    default:
      question_answer = [];
  }

  const shuffledQuestions = arrayShuffle(question_answer);

  return (
    <div className="p-8 h-screen">
      <header className="text-2xl font-bold">{tech} Interview</header>

      {selectedOptions === "Subjective" && !openDialog && (
        <SubjectiveInterview />
      )}
      {selectedOptions === "Multiple Choice" && !openDialog && (
        <MultipleChoiceInterview questionAnswer={shuffledQuestions} />
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
