"use client";

import Dialog from "@/fsd/shared/ui/atoms/dialog/ui";
import Button from "@/fsd/shared/ui/atoms/button/ui/Button";
import { useUpdateQuestion } from "../model/hooks/useUpdateQuestion";
import { CustomSubjectiveQuestion } from "@/fsd/entities/customQuestion/model/type";

interface UpdateQuestionDialogProps {
  open: boolean;
  onClose: () => void;
  question: CustomSubjectiveQuestion;
}

const QUESTION_MAX_LENGTH = 1000;

export default function UpdateQuestionDialog({ open, onClose, question }: UpdateQuestionDialogProps) {
  const { question: questionText, errors, setQuestion, handleSubmit, reset } = useUpdateQuestion(question);

  const handleUpdate = async () => {
    const success = await handleSubmit();
    if (success) {
      onClose();
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} title="질문 수정">
      <div className="flex flex-col gap-4">
        {/* Technology Display (Read-only) */}
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm font-semibold">기술 스택</label>
          <div className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-400 text-sm">
            {question.technology}
          </div>
        </div>

        {/* Question Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="question" className="text-white text-sm font-semibold">
            질문 *
          </label>
          <textarea
            id="question"
            value={questionText}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="질문을 입력하세요"
            className="w-full min-h-32 p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={QUESTION_MAX_LENGTH}
          />
          <div className="text-zinc-500 text-xs text-right">{questionText.length} / {QUESTION_MAX_LENGTH}</div>
        </div>

        {/* Validation Errors */}
        {errors.length > 0 && (
          <div className="flex flex-col gap-1">
            {errors.map((error, index) => (
              <p key={`${error}-${index}`} className="text-red-500 text-sm">
                {error}
              </p>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end mt-2">
          <Button variant="dark" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="light" onClick={handleUpdate}>
            수정
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
