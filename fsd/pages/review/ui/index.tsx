"use client";

import { InterviewOptionsValue } from "@/fsd/pages/interview/model/type";
import { useState, useEffect } from "react";
import Dialog from "@/fsd/shared/ui/atoms/dialog/ui";
import InterviewOptions from "@/fsd/pages/interview/ui/_component/InterviewOptions";
import InterviewTypeRenderer from "@/fsd/pages/interview/ui/_component/InterviewTypeRenderer";
import { useUserStore } from "@/fsd/entities/user/useUserStore";
import { useReviewSession } from "@/fsd/pages/review/model/hooks/useReviewSession";
import CustomQuestionReview from "@/fsd/widgets/customQuestionReview/ui";
import { InCorrectCustomQuestion } from "@/fsd/entities/user/types";

export default function ReviewPage() {
  const [selectedOptions, setSelectedOptions] = useState<InterviewOptionsValue | "">("");
  const [openInterviewOptionsDialog, setOpenInterviewOptionsDialog] = useState(true);
  const [customSessionQuestions, setCustomSessionQuestions] = useState<InCorrectCustomQuestion[] | null>(null);

  const inCorrectSubQuestion = useUserStore((s) => s.user.inCorrectSubQuestion);
  const inCorrectMultipleChoiceQuestion = useUserStore((s) => s.user.inCorrectMultipleChoiceQuestion);
  const inCorrectCustomQuestion = useUserStore((s) => s.user.inCorrectCustomQuestion);

  const sessionQuestions = useReviewSession(
    selectedOptions,
    openInterviewOptionsDialog,
    inCorrectMultipleChoiceQuestion,
    inCorrectSubQuestion
  );

  // Custom questions session snapshot
  useEffect(() => {
    if (!openInterviewOptionsDialog && selectedOptions === "Custom Questions" && customSessionQuestions === null) {
      setCustomSessionQuestions([...(inCorrectCustomQuestion || [])]);
    }
  }, [openInterviewOptionsDialog, selectedOptions, customSessionQuestions, inCorrectCustomQuestion]);

  const isInterviewSelected = selectedOptions !== "";
  const isDialogClosed = !openInterviewOptionsDialog;
  const canShowInterview = isInterviewSelected && isDialogClosed;

  return (
    <div className="p-8 h-screen">
      <header className="text-2xl font-bold">Review</header>

      {canShowInterview && selectedOptions === "Custom Questions" && customSessionQuestions && (
        <CustomQuestionReview sessionQuestions={customSessionQuestions} />
      )}

      {canShowInterview && selectedOptions !== "Custom Questions" && sessionQuestions && (
        <InterviewTypeRenderer
          selectedOptions={selectedOptions as InterviewOptionsValue}
          shuffledQuestions={sessionQuestions}
          isReviewMode={true}
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
