"use client";

import { useState } from "react";
import TechStackSelector from "./_component/TechStackSelector";
import Button from "fsd/shared/ui/atoms/button/ui/Button";
import Dialog from "fsd/shared/ui/atoms/dialog/ui";

export default function Hero() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-white text-4xl font-bold animate-fade-up-1">Practice Frontend Interview</h1>
        <p className="text-zinc-400 text-lg animate-fade-up-2">Practice Frontend Interview with AI.</p>
      </div>

      <div className="flex items-center animate-fade-up-2">
        <Button variant="light" onClick={handleDialogOpen}>
          Try now
        </Button>
      </div>

      <Dialog open={dialogOpen} onClose={handleDialogClose} title="Select Title">
        <TechStackSelector onClose={handleDialogClose} name="title" />
      </Dialog>
    </>
  );
}
