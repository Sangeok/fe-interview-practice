"use client";

import React, { useEffect } from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Dialog({ open, onClose, children, title }: DialogProps) {
  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Cyberpunk Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pulse"></div>
      </div>

      {/* Dialog Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fade-in-up">
        {/* Terminal Box with Glow */}
        <div className="relative terminal-box p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300 group z-10"
            aria-label="Close dialog"
          >
            <svg
              className="w-4 h-4 text-zinc-400 group-hover:text-red-400 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content with Custom Scrollbar */}
          <div className="overflow-y-auto max-h-[calc(90vh-4rem)] pr-2 custom-scrollbar">
            {children}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(39, 39, 42, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(132, 204, 22, 0.3);
          border-radius: 3px;
          transition: all 0.2s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(132, 204, 22, 0.5);
        }
      `}</style>
    </div>
  );
}
