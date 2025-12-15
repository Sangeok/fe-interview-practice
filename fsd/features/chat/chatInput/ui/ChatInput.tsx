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
    <div className="relative w-full" data-testid="chat-input">
      {/* Neural Input Container */}
      <div className="relative rounded-lg overflow-hidden border border-zinc-700/50 bg-zinc-900/60 backdrop-blur-sm shadow-lg transition-all duration-300 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
        {/* Holographic Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-lg transition-all duration-300 group-focus-within:border-cyan-500/60"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-lime-500/30 rounded-br-lg transition-all duration-300 group-focus-within:border-lime-500/60"></div>

        <div className="flex items-end gap-2 p-3">
          {/* Terminal Prompt Indicator */}
          <div className="flex-shrink-0 pb-2 flex items-center gap-1">
            <span className="text-cyan-400 font-mono text-sm">{">"}</span>
            <div className={`w-1 h-1 rounded-full ${isLoading ? "bg-yellow-400 animate-pulse" : "bg-lime-400"}`}></div>
          </div>

          {/* Input Area */}
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your response..."
            className="flex-1 bg-transparent text-zinc-100 placeholder:text-zinc-500 font-mono text-sm resize-none focus:outline-none scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
            rows={1}
            style={{ maxHeight: "150px", overflowY: "auto" }}
            disabled={isLoading}
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
            className={`
              flex-shrink-0 p-2 rounded-md font-mono text-xs
              transition-all duration-300
              ${
                inputValue.trim() && !isLoading
                  ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-105"
                  : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              }
            `}
          >
            <Send size={16} className={isLoading ? "animate-pulse" : ""} />
          </button>
        </div>

        {/* Status Bar */}
        {isLoading && (
          <div className="border-t border-zinc-800/50 px-3 py-1.5 bg-zinc-950/40">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse"></div>
                <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
              <span className="text-cyan-400 font-mono text-xs">AI processing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard Hint */}
      <div className="mt-2 flex justify-end">
        <span className="text-zinc-600 font-mono text-xs">
          Press <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-400">Enter</kbd> to
          send
        </span>
      </div>
    </div>
  );
}
