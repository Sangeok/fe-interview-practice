"use client";

import { useState } from "react";
import TechStackSelector from "./_component/TechStackSelector";
import Button from "fsd/shared/ui/atoms/button/ui/Button";
import Dialog from "fsd/shared/ui/atoms/dialog/ui";
import { useUserStore } from "@/fsd/entities/user/useUserStore";
import { useRouter } from "next/navigation";
import { TechType } from "@/fsd/shared/model/type";
import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";

export default function Hero() {
  const router = useRouter();
  const [interviewDialogOpen, setInterviewDialogOpen] = useState(false);
  const [interviewType, setInterviewType] = useState<"basic" | "custom">("basic");

  const { setTech } = useSelectTechStore();

  const hydrateUserFromDB = useUserStore((s) => s.hydrateUserFromDB);

  const handleInterviewDialogOpen = async () => {
    await hydrateUserFromDB();
    setInterviewDialogOpen(true);
  };

  const handleInterviewDialogClose = () => {
    setInterviewDialogOpen(false);
  };

  const handleReviewDialogOpen = async () => {
    await hydrateUserFromDB();
    router.push("/reviews");
  };

  const handleCustomQuestionsOpen = () => {
    router.push("/custom-questions");
  };

  const validateTechSelection = (selectedTitle: TechType | ""): selectedTitle is TechType => {
    if (!selectedTitle) {
      alert("기술 스택을 선택하세요.");
      return false;
    }
    return true;
  };

  const handleRouteToInterview = (selectedTitle: TechType | "") => {
    if (!validateTechSelection(selectedTitle)) return;

    setTech(selectedTitle);
    const basePath = interviewType === "basic" ? "interviews" : "custom-interviews";
    router.push(`/${basePath}/${selectedTitle}`);
    handleInterviewDialogClose();
  };

  const handleSelectInterview = (type: "basic" | "custom") => {
    setInterviewType(type);
    handleInterviewDialogOpen();
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-white text-4xl font-bold animate-fade-up-1">Practice Frontend Interview</h1>
        <p className="text-zinc-400 text-lg animate-fade-up-2">Practice Frontend Interview with AI.</p>
      </div>

      <div className="flex gap-x-4 items-center animate-fade-up-2">
        <Button variant="light" onClick={() => handleSelectInterview("basic")} data-testid="try-now-button">
          Try now
        </Button>

        <Button variant="light" onClick={handleReviewDialogOpen} data-testid="review-button">
          Review
        </Button>

        <Button variant="light" onClick={() => handleSelectInterview("custom")} data-testid="custom-interview-button">
          커스텀 면접
        </Button>

        <Button variant="light" onClick={handleCustomQuestionsOpen} data-testid="custom-questions-button">
          질문 관리
        </Button>
      </div>

      <Dialog
        open={interviewDialogOpen}
        onClose={handleInterviewDialogClose}
        title="Select Tech Stack"
        data-testid="tech-selector-dialog"
      >
        <TechStackSelector onClose={handleInterviewDialogClose} selectedRouteType={handleRouteToInterview} />
      </Dialog>
    </>
  );
}
