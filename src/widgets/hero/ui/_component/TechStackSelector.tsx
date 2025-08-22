"use client";

import Button from "@/src/shared/ui/atoms/button/ui/Button";
import RadioInput from "@/src/shared/ui/atoms/input/ui/RadioInput";

import { useState } from "react";
import { TECH_STACK_OPTIONS } from "../../lib/constants";
import { TechStack } from "../../model/type";

interface TechStackSelectorProps {
  name?: string;
  onClose: () => void;
}

const TechStackSelector = ({ onClose, name = "title" }: TechStackSelectorProps) => {
  const [selectedTitle, setSelectedTitle] = useState<TechStack | "">("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(event.target.value as TechStack);
  };

  return (
    <div className="flex flex-col gap-4" role="radiogroup" aria-label="기술 스택 선택">
      {TECH_STACK_OPTIONS.map((option) => (
        <RadioInput
          key={option.id}
          label={option.label}
          name={name}
          value={option.value}
          checked={selectedTitle === option.value}
          onChange={handleChange}
        />
      ))}

      <div className="flex justify-between mt-4">
        <Button variant="light" size="sm" onClick={onClose}>
          Select
        </Button>
        <Button variant="light" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default TechStackSelector;
