"use client";

import Dialog from "@/fsd/shared/ui/atoms/dialog/ui";
import RadioInput from "@/fsd/shared/ui/atoms/input/ui/RadioInput";
import Button from "@/fsd/shared/ui/atoms/button/ui/Button";
import { useCreateQuestion } from "../model/hooks/useCreateQuestion";
import { Technology } from "@/fsd/entities/customQuestion/model/type";

interface CreateQuestionDialogProps {
  open: boolean;
  onClose: () => void;
}

const TECHNOLOGIES: readonly Technology[] = ["JavaScript", "React", "TypeScript"];
const QUESTION_MAX_LENGTH = 1000;

export default function CreateQuestionDialog({ open, onClose }: CreateQuestionDialogProps) {
  const { technology, question, errors, setTechnology, setQuestion, handleSubmit, reset } = useCreateQuestion();

  const handleCreate = async () => {
    const success = await handleSubmit();
    if (success) {
      reset();
      onClose();
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} title="새 질문 추가">
      <div className="flex flex-col gap-4">
        {/* Technology Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm font-semibold">기술 스택</label>
          <div className="flex gap-4">
            {TECHNOLOGIES.map((tech) => (
              <RadioInput
                key={tech}
                name="technology"
                value={tech.toLowerCase()}
                label={tech}
                checked={technology === tech}
                onChange={() => setTechnology(tech)}
              />
            ))}
          </div>
        </div>

        {/* Question Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="question" className="text-white text-sm font-semibold">
            질문 *
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="질문을 입력하세요"
            className="w-full min-h-32 p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={QUESTION_MAX_LENGTH}
          />
          <div className="text-zinc-500 text-xs text-right">{question.length} / {QUESTION_MAX_LENGTH}</div>
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
          <Button variant="light" onClick={handleCreate}>
            생성
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
