"use client";

import { CustomSubjectiveQuestion } from "@/fsd/entities/customQuestion/model/type";
import Button from "@/fsd/shared/ui/atoms/button/ui/Button";
import { useState } from "react";
import UpdateQuestionDialog from "@/fsd/features/customQuestionManagement/updateQuestion/ui/UpdateQuestionDialog";
import { useCustomQuestionStore } from "@/fsd/entities/customQuestion/model/useCustomQuestionStore";

interface QuestionCardProps {
  question: CustomSubjectiveQuestion;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const removeQuestion = useCustomQuestionStore((state) => state.removeQuestion);

  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await removeQuestion(question.id);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTechColor = (tech: string) => {
    switch (tech) {
      case "JavaScript":
        return { text: "#eab308", border: "rgba(234, 179, 8, 0.4)", glow: "rgba(234, 179, 8, 0.2)" };
      case "React":
        return { text: "#06b6d4", border: "rgba(6, 182, 212, 0.4)", glow: "rgba(6, 182, 212, 0.2)" };
      case "TypeScript":
        return { text: "#3b82f6", border: "rgba(59, 130, 246, 0.4)", glow: "rgba(59, 130, 246, 0.2)" };
      default:
        return { text: "#a1a1aa", border: "rgba(161, 161, 170, 0.4)", glow: "rgba(161, 161, 170, 0.2)" };
    }
  };

  const techColor = getTechColor(question.technology);

  return (
    <>
      <div className="group relative animate-fade-in">
        {/* Neon Border & Glow Effect */}
        <div
          className="absolute inset-0 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${techColor.glow} 0%, transparent 100%)`,
            boxShadow: `0 0 20px ${techColor.glow}`,
          }}
        ></div>

        <div
          className="absolute inset-0 rounded-lg border transition-all duration-300"
          style={{
            borderColor: techColor.border,
            borderWidth: "1px",
          }}
        ></div>

        {/* Card Content */}
        <div className="relative bg-[#0a0a0a]/90 backdrop-blur-sm rounded-lg p-5 transition-all duration-300 group-hover:translate-y-[-2px]">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-800">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-lime-500/60 group-hover:animate-pulse-glow"></div>
            </div>
            <span className="text-zinc-600 font-mono text-xs ml-auto">question.json</span>
          </div>

          {/* Question Content */}
          <div className="mb-4">
            <div className="flex items-start gap-3 mb-2">
              <span className="text-zinc-600 font-mono text-xs shrink-0 mt-1">Q:</span>
              <p className="text-zinc-300 text-sm leading-relaxed flex-1 line-clamp-4 font-light">
                {question.question}
              </p>
            </div>
          </div>

          {/* Metadata Bar */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-zinc-800/50">
            <div className="flex items-center gap-3">
              {/* Tech Badge */}
              <div
                className="px-3 py-1 rounded border font-mono text-xs font-bold"
                style={{
                  borderColor: techColor.border,
                  color: techColor.text,
                  backgroundColor: `${techColor.glow}`,
                }}
              >
                {question.technology}
              </div>

              {/* Date */}
              <span className="text-zinc-600 font-mono text-xs">
                {formatDate(question.createdAt)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setUpdateDialogOpen(true)}
                className="px-3 py-1.5 border border-cyan-500/30 rounded text-cyan-400 font-mono text-xs hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-200 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 border border-red-500/30 rounded text-red-400 font-mono text-xs hover:border-red-400 hover:bg-red-500/10 transition-all duration-200 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>

      <UpdateQuestionDialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)} question={question} />
    </>
  );
}
