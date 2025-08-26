"use client";

import { useState } from "react";

import Dialog from "@/fsd/shared/ui/atoms/dialog/ui";
import InterviewOptions from "./_component/InterviewOptions";
import { InterviewOptionsValue } from "../model/type";
import SubjectiveInterview from "@/fsd/features/subjectiveInterview/ui";
import MultipleChoiceInterview from "@/fsd/features/multipleChoiceInterview/ui";
import { MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_JAVASCRIPT } from "@/fsd/widgets/interviewOption/constants";
import { arrayShuffle } from "@/fsd/shared/lib/array-shuffle";
import { TechType } from "@/fsd/shared/model/type";
import { MultipleChoiceQuestion } from "@/fsd/features/multipleChoiceInterview/model/type";
import { MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_REACT } from "../constants/ReactQA";
import { MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_TYPESCRIPT } from "../constants/TypescriptQA";

interface InterviewOptionProps {
  tech: TechType;
}

export default function InterviewOption({ tech }: InterviewOptionProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    InterviewOptionsValue | ""
  >("");
  const [openDialog, setOpenDialog] = useState(true);

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
    <div>
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
