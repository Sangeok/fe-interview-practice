"use client";

import Button from "@/fsd/shared/ui/atoms/button/ui/Button";
import CreateQuestionDialog from "@/fsd/features/customQuestionManagement/createQuestion/ui/CreateQuestionDialog";
import QuestionList from "./_component/QuestionList";
import { useQuestionManager } from "../model/hooks/useQuestionManager";
import { Technology } from "@/fsd/entities/customQuestion/model/type";

export default function CustomQuestionManager() {
  const {
    selectedTechnology,
    setSelectedTechnology,
    createDialogOpen,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
  } = useQuestionManager();

  const technologies: { value: Technology; label: string }[] = [
    { value: "javascript", label: "JavaScript" },
    { value: "react", label: "React" },
    { value: "typescript", label: "TypeScript" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">커스텀 질문 관리</h1>
        <Button variant="light" onClick={handleOpenCreateDialog}>
          + 질문 추가
        </Button>
      </div>

      {/* Technology Tabs */}
      <div className="flex gap-2 border-b border-zinc-700">
        {technologies.map((tech) => (
          <button
            key={tech.value}
            onClick={() => setSelectedTechnology(tech.value)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedTechnology === tech.value
                ? "text-white border-b-2 border-blue-500"
                : "text-zinc-400 hover:text-zinc-300"
            }`}
          >
            {tech.label}
          </button>
        ))}
      </div>

      {/* Question List */}
      <QuestionList selectedTechnology={selectedTechnology} />

      {/* Create Dialog */}
      <CreateQuestionDialog open={createDialogOpen} onClose={handleCloseCreateDialog} />
    </div>
  );
}
