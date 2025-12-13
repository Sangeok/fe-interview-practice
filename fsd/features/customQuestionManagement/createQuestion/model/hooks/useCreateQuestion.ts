import { useState } from "react";
import { useCustomQuestionStore } from "@/fsd/entities/customQuestion/model/useCustomQuestionStore";
import { Technology } from "@/fsd/entities/customQuestion/model/type";

export const useCreateQuestion = () => {
  const [technology, setTechnology] = useState<Technology>("JavaScript");
  const [question, setQuestion] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const addQuestion = useCustomQuestionStore((state) => state.addQuestion);

  const validate = (): boolean => {
    const validationErrors: string[] = [];

    if (!question.trim()) {
      validationErrors.push("질문을 입력하세요");
    }

    if (question.length > 1000) {
      validationErrors.push("질문은 1000자 이하여야 합니다");
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleSubmit = async (): Promise<boolean> => {
    if (!validate()) {
      return false;
    }

    await addQuestion({
      technology,
      question: question.trim(),
    });

    return true;
  };

  const reset = () => {
    setTechnology("JavaScript");
    setQuestion("");
    setErrors([]);
  };

  return {
    technology,
    question,
    errors,
    setTechnology,
    setQuestion,
    handleSubmit,
    reset,
  };
};
