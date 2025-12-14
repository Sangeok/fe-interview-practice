import { useState, useEffect } from "react";
import { useCustomQuestionStore } from "@/fsd/entities/customQuestion/model/useCustomQuestionStore";
import { CustomSubjectiveQuestion } from "@/fsd/entities/customQuestion/model/type";

const QUESTION_MAX_LENGTH = 1000;

export const useUpdateQuestion = (initialQuestion: CustomSubjectiveQuestion) => {
  const [question, setQuestion] = useState(initialQuestion.question);
  const [errors, setErrors] = useState<string[]>([]);

  const updateQuestion = useCustomQuestionStore((state) => state.updateQuestion);

  useEffect(() => {
    setQuestion(initialQuestion.question);
  }, [initialQuestion]);

  const validate = (): boolean => {
    const validationErrors: string[] = [];

    if (!question.trim()) {
      validationErrors.push("질문을 입력하세요");
    }

    if (question.length > QUESTION_MAX_LENGTH) {
      validationErrors.push(`질문은 ${QUESTION_MAX_LENGTH}자 이하여야 합니다`);
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
    });

    return true;
  };

  const reset = () => {
    setQuestion(initialQuestion.question);
    setErrors([]);
  };

  return {
    question,
    errors,
    setQuestion,
    handleSubmit,
    reset,
  };
};
