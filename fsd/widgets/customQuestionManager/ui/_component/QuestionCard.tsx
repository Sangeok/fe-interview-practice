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

  return (
    <>
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex flex-col gap-3">
        {/* Header */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <p className="text-white text-sm font-medium line-clamp-3">{question.question}</p>
          </div>
          <span className="px-2 py-1 bg-zinc-700 text-zinc-300 text-xs rounded shrink-0">
            {question.technology}
          </span>
        </div>

        {/* Model Answer Preview */}
        {question.modelAnswer && (
          <div className="text-zinc-400 text-xs">
            <span className="font-semibold">모범답안:</span>{" "}
            <span className="line-clamp-2">{question.modelAnswer}</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-2 border-t border-zinc-700">
          <span className="text-zinc-500 text-xs">{formatDate(question.createdAt)}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="dark" onClick={() => setUpdateDialogOpen(true)}>
              수정
            </Button>
            <Button size="sm" variant="dark" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        </div>
      </div>

      <UpdateQuestionDialog
        open={updateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
        question={question}
      />
    </>
  );
}
