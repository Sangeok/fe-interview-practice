"use client";
import RadioInput from "@/fsd/shared/ui/atoms/input/ui/RadioInput";
import Button from "@/fsd/shared/ui/atoms/button/ui/Button";
import { useState } from "react";
import { MultipleChoiceInterpretType } from "@/fsd/shared/model/type";
import { Option } from "../../model/type";
import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";

interface QuestionCardProps {
  question: string;
  options: readonly Option[];
  answerString: string;
  setLoading: (loading: boolean) => void;
  setInterpret: (interpret: MultipleChoiceInterpretType) => void;
  setIsAnswerCorrect: (isAnswerCorrect: boolean) => void;
}

export default function QuestionCard({
  question,
  options,
  answerString,
  setLoading,
  setInterpret,
  setIsAnswerCorrect,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [checkAnswerButtonDisabled, setCheckAnswerButtonDisabled] =
    useState(false);
  const { tech } = useSelectTechStore();

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) {
      alert("Check your answer first");
      return;
    }

    if (!selectedOption.answerBoolean) {
      setIsAnswerCorrect(false);
      handleGenerateInterpret();
    } else {
      setIsAnswerCorrect(true);
      setCheckAnswerButtonDisabled(true);
    }
  };

  const handleGenerateInterpret = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-interpret", {
        method: "POST",
        body: JSON.stringify({ tech: tech, question, answer: answerString }),
      });

      const data = await response.json();
      setInterpret(data);
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-zinc-800 rounded-lg shadow-md animate-fade-up-1">
      <h3 className="text-xl font-semibold mb-4">Q. {question}</h3>
      <div className="flex flex-col gap-6 my-6">
        {options.map((option) => (
          <RadioInput
            key={option.id}
            label={option.label}
            name={question}
            value={option.label}
            checked={selectedOption?.label === option.label}
            onChange={() => handleOptionChange(option)}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleCheckAnswer}
          disabled={!selectedOption || checkAnswerButtonDisabled}
        >
          정답 확인
        </Button>
      </div>
    </div>
  );
}
