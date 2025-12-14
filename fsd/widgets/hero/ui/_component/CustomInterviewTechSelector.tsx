"use client";

import { useState, useEffect } from "react";
import { TECH_STACK_OPTIONS } from "../../lib/constants";
import RadioInput from "fsd/shared/ui/atoms/input/ui/RadioInput";
import Button from "fsd/shared/ui/atoms/button/ui/Button";
import { useRouter } from "next/navigation";
import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { useCustomQuestionStore } from "@/fsd/entities/customQuestion/model/useCustomQuestionStore";
import { TechType } from "@/fsd/shared/model/type";

interface CustomInterviewTechSelectorProps {
  onClose: () => void;
}

const CustomInterviewTechSelector = ({ onClose }: CustomInterviewTechSelectorProps) => {
  const router = useRouter();
  const [selectedTitle, setSelectedTitle] = useState<TechType | "">("");
  const [error, setError] = useState<string>("");
  const { setTech } = useSelectTechStore();
  const questions = useCustomQuestionStore((state) => state.questions);
  const hydrateFromDB = useCustomQuestionStore((state) => state.hydrateFromDB);

  useEffect(() => {
    hydrateFromDB();
  }, [hydrateFromDB]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(event.target.value as TechType);
    setError("");
  };

  const handleRouteToCustomInterview = () => {
    if (!selectedTitle) {
      setError("기술 스택을 선택하세요");
      return;
    }

    const hasQuestions = questions.some((question) => question.technology === selectedTitle);

    if (!hasQuestions) {
      setError(`${selectedTitle} 질문이 없습니다. 먼저 질문을 추가하세요.`);
      return;
    }

    setTech(selectedTitle as TechType);
    router.push("/custom-interviews");
    onClose();
  };

  return (
    <div className="flex flex-col gap-4" role="radiogroup" aria-label="기술 스택 선택" data-testid="custom-tech-stack-selector">
      {TECH_STACK_OPTIONS.map((option) => (
        <RadioInput
          key={option.id}
          label={option.label}
          value={option.value}
          checked={selectedTitle === option.value}
          onChange={handleChange}
          data-testid={`custom-tech-option-${option.value}`}
        />
      ))}

      {error && (
        <div className="text-red-400 text-sm" data-testid="custom-tech-error">
          {error}
        </div>
      )}

      <div className="flex justify-between mt-4">
        <Button variant="light" size="sm" onClick={handleRouteToCustomInterview} data-testid="custom-tech-select-button">
          시작
        </Button>
        <Button variant="light" size="sm" onClick={onClose} data-testid="custom-tech-close-button">
          닫기
        </Button>
      </div>
    </div>
  );
};

export default CustomInterviewTechSelector;
