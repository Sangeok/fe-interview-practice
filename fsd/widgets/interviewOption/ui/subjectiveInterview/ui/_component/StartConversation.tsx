"use client";

import Button from "@/fsd/shared/ui/atoms/button/ui/Button";

interface StartConversationProps {
  onStart: () => void;
}

const StartConversation = ({ onStart }: StartConversationProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800">
        <p className="text-lg font-semibold">
          Are you ready to start the interview?
        </p>
        <Button onClick={onStart} size="md">
          Yes
        </Button>
      </div>
    </div>
  );
};

export default StartConversation;
