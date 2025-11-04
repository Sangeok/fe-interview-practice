"use client";

import { InterviewOptionsValue } from "@/fsd/pages/interview/model/type";
import { useState } from "react";
import Dialog from "@/fsd/shared/ui/atoms/dialog/ui";
import InterviewOptions from "@/fsd/pages/interview/ui/_component/InterviewOptions";
import InterviewTypeRenderer from "@/fsd/pages/interview/ui/_component/InterviewTypeRenderer";
import { useUserStore } from "@/fsd/entities/user/useUserStore";
import { useReviewSession } from "@/fsd/pages/review/model/hooks/useReviewSession";

export default function ReviewPage() {
  const [selectedOptions, setSelectedOptions] = useState<InterviewOptionsValue | "">("");
  const [openInterviewOptionsDialog, setOpenInterviewOptionsDialog] = useState(true);

  const inCorrectSubQuestion = useUserStore((s) => s.user.inCorrectSubQuestion);
  const inCorrectMultipleChoiceQuestion = useUserStore((s) => s.user.inCorrectMultipleChoiceQuestion);

  const sessionQuestions = useReviewSession(
    selectedOptions,
    openInterviewOptionsDialog,
    inCorrectMultipleChoiceQuestion,
    inCorrectSubQuestion
  );

  const isInterviewSelected = selectedOptions !== "";
  const isDialogClosed = !openInterviewOptionsDialog;
  const canShowInterview = isInterviewSelected && isDialogClosed;

  return (
    <div className="p-8 h-screen">
      <header className="text-2xl font-bold">Review</header>

      {canShowInterview && sessionQuestions && (
        <InterviewTypeRenderer
          selectedOptions={selectedOptions as InterviewOptionsValue}
          shuffledQuestions={sessionQuestions}
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
