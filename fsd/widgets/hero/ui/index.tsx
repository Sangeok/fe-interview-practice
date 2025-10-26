"use client";

import { useState } from "react";
import TechStackSelector from "./_component/TechStackSelector";
import Button from "fsd/shared/ui/atoms/button/ui/Button";
import Dialog from "fsd/shared/ui/atoms/dialog/ui";
import { useUserStore } from "@/fsd/entities/user/useUserStore";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [interviewDialogOpen, setInterviewDialogOpen] = useState(false);

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

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-white text-4xl font-bold animate-fade-up-1">Practice Frontend Interview</h1>
        <p className="text-zinc-400 text-lg animate-fade-up-2">Practice Frontend Interview with AI.</p>
      </div>

      <div className="flex gap-x-4 items-center animate-fade-up-2">
        <Button variant="light" onClick={handleInterviewDialogOpen}>
          Try now
        </Button>

        <Button variant="light" onClick={handleReviewDialogOpen}>
          Review
        </Button>
      </div>

      <Dialog open={interviewDialogOpen} onClose={handleInterviewDialogClose} title="Select Tech Stack">
        <TechStackSelector onClose={handleInterviewDialogClose} />
      </Dialog>
    </>
  );
}
