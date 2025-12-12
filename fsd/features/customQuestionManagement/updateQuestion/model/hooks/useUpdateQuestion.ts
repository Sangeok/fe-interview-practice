import { useState, useEffect } from "react";
import { useCustomQuestionStore } from "@/fsd/entities/customQuestion/model/useCustomQuestionStore";
import { CustomSubjectiveQuestion } from "@/fsd/entities/customQuestion/model/type";

export const useUpdateQuestion = (initialQuestion: CustomSubjectiveQuestion) => {
  const [question, setQuestion] = useState(initialQuestion.question);
  const [modelAnswer, setModelAnswer] = useState(initialQuestion.modelAnswer || "");
  const [errors, setErrors] = useState<string[]>([]);

  const updateQuestion = useCustomQuestionStore((state) => state.updateQuestion);

  useEffect(() => {
    setQuestion(initialQuestion.question);
    setModelAnswer(initialQuestion.modelAnswer || "");
  }, [initialQuestion]);

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

    await updateQuestion(initialQuestion.id, {
      question: question.trim(),
      modelAnswer: modelAnswer.trim() || undefined,
    });

    return true;
  };

  const reset = () => {
    setQuestion(initialQuestion.question);
    setModelAnswer(initialQuestion.modelAnswer || "");
    setErrors([]);
  };

  return {
    question,
    modelAnswer,
    errors,
    setQuestion,
    setModelAnswer,
    handleSubmit,
    reset,
  };
};
