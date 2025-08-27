"use client";

import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { Send } from "lucide-react";
import Button from "@/fsd/shared/ui/atoms/button/ui/Button";

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
}

export default function ChatInput({ onSendMessage, isLoading = false }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const message = inputValue.trim();
    if (message && onSendMessage) {
      onSendMessage(message);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-lg">
      <div className="relative flex w-full">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
          className="w-full p-3 pr-12 text-gray-800 bg-parent rounded-lg resize-none focus:outline-none"
          rows={1}
          style={{ maxHeight: "150px", overflowY: "auto" }}
          disabled={isLoading}
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!inputValue.trim() || isLoading}
          size="sm"
          aria-label="Send message"
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
}
