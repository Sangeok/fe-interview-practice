import { useState } from "react";
import { useCustomQuestionStore } from "@/fsd/entities/customQuestion/model/useCustomQuestionStore";
import { Technology } from "@/fsd/entities/customQuestion/model/type";

export const useCreateQuestion = () => {
  const [technology, setTechnology] = useState<Technology>("javascript");
  const [question, setQuestion] = useState("");
  const [modelAnswer, setModelAnswer] = useState("");
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
      modelAnswer: modelAnswer.trim() || undefined,
    });

    return true;
  };

  const reset = () => {
    setTechnology("javascript");
    setQuestion("");
    setModelAnswer("");
    setErrors([]);
  };

  return {
    technology,
    question,
    modelAnswer,
    errors,
    setTechnology,
    setQuestion,
    setModelAnswer,
    handleSubmit,
    reset,
  };
};
