"use client";

import { useState } from "react";
import { TECH_STACK_OPTIONS } from "../../lib/constants";
import RadioInput from "fsd/shared/ui/atoms/input/ui/RadioInput";
import Button from "fsd/shared/ui/atoms/button/ui/Button";
import { useRouter } from "next/navigation";
import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import { TechType } from "@/fsd/shared/model/type";

interface TechStackSelectorProps {
  onClose: () => void;
}

const TechStackSelector = ({ onClose }: TechStackSelectorProps) => {
  const router = useRouter();
  const [selectedTitle, setSelectedTitle] = useState<TechType | "">("");
  const { setTech } = useSelectTechStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(event.target.value as TechType);
  };

  const handleSelectForRoute = () => {
    setTech(selectedTitle as TechType);
    router.push(`/interviews/${selectedTitle}`);
    onClose();
  };

  return (
    <div className="flex flex-col gap-4" role="radiogroup" aria-label="기술 스택 선택">
      {TECH_STACK_OPTIONS.map((option) => (
        <RadioInput
          key={option.id}
          label={option.label}
          value={option.value}
          checked={selectedTitle === option.value}
          onChange={handleChange}
        />
      ))}

      <div className="flex justify-between mt-4">
        <Button variant="light" size="sm" onClick={handleSelectForRoute}>
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
