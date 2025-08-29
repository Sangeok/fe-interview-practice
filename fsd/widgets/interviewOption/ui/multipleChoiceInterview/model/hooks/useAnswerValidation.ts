import { useState } from "react";
import { Option } from "../type";

export const useAnswerValidation = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isOptionSelected = selectedOption !== null;
  const canSubmit = isOptionSelected && !isSubmitted;

  const selectOption = (option: Option) => {
    if (!isSubmitted) {
      setSelectedOption(option);
    }
  };

  const validateAnswer = () => {
    if (!isOptionSelected) {
      return { isValid: false, message: "Check your answer first" };
    }

    setIsSubmitted(true);
    const isCorrect = selectedOption!.answerBoolean;
    setIsAnswerCorrect(isCorrect);
    
    return { isValid: true, isCorrect };
  };

  const resetValidation = () => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setIsSubmitted(false);
  };

  return {
    selectedOption,
    isAnswerCorrect,
    isSubmitted,
    canSubmit,
    selectOption,
    validateAnswer,
    resetValidation,
  };
};