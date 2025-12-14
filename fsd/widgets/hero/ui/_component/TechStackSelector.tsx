"use client";

import { useState } from "react";
import { TECH_STACK_OPTIONS } from "../../lib/constants";
import RadioInput from "fsd/shared/ui/atoms/input/ui/RadioInput";
import Button from "fsd/shared/ui/atoms/button/ui/Button";
import { TechType } from "@/fsd/shared/model/type";

interface TechStackSelectorProps {
  onClose: () => void;
  selectedRouteType: (selectedTitle: TechType) => void;
}

const TechStackSelector = ({ onClose, selectedRouteType }: TechStackSelectorProps) => {
  const [selectedTitle, setSelectedTitle] = useState<TechType | "">("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(event.target.value as TechType);
  };

  return (
    <div
      className="flex flex-col gap-4"
      role="radiogroup"
      aria-label="기술 스택 선택"
      data-testid="tech-stack-selector"
    >
      {TECH_STACK_OPTIONS.map((option) => (
        <RadioInput
          key={option.id}
          label={option.label}
          value={option.value}
          checked={selectedTitle === option.value}
          onChange={handleChange}
          data-testid={`tech-option-${option.value}`}
        />
      ))}

      <div className="flex justify-between mt-4">
        <Button
          variant="light"
          size="sm"
          onClick={() => selectedRouteType(selectedTitle)}
          data-testid="tech-select-button"
        >
          Select
        </Button>
        <Button variant="light" size="sm" onClick={onClose} data-testid="tech-close-button">
          Close
        </Button>
      </div>
    </div>
  );
};

export default TechStackSelector;
