"use client";
import RadioInput from "@/fsd/shared/ui/atoms/input/ui/RadioInput";
import Button from "@/fsd/shared/ui/atoms/button/ui/Button";
import { useState } from "react";
import { Option } from "../../model/type";

interface QuestionCardProps {
  question: string;
  options: readonly Option[];
  onNext: (selectedAnswer: string) => void;
}

export default function QuestionCard({ question, options, onNext }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleNextClick = () => {
    if (selectedOption) {
      onNext(selectedOption);
      setSelectedOption(null);
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
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={handleNextClick} disabled={!selectedOption}>
          다음
        </Button>
      </div>
    </div>
  );
}
