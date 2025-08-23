"use client";

import { useState } from "react";

import Dialog from "@/fsd/shared/ui/atoms/dialog/ui";
import InterviewOptions from "./_component/InterviewOptions";
import { InterviewOption } from "../model/type";
import SubjectiveInterview from "@/fsd/features/subjectiveInterview/ui";
import MultipleChoiceInterview from "@/fsd/features/multipleChoiceInterview/ui";
import { MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_JAVASCRIPT } from "@/fsd/features/multipleChoiceInterview/constants";

export default function JavascriptInterview() {
  const [selectedOptions, setSelectedOptions] = useState<InterviewOption | "">("");
  const [openDialog, setOpenDialog] = useState(true);

  return (
    <div>
      {selectedOptions === "Subjective" && !openDialog && <SubjectiveInterview />}
      {selectedOptions === "Multiple Choice" && !openDialog && (
        <MultipleChoiceInterview questionAnswer={MULTIPLE_CHOICE_INTERVIEW_QUESTIONS_JAVASCRIPT} />
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
