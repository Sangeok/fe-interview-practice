import { useState } from "react";
import { MultipleChoiceInterpretType } from "@/fsd/shared/model/type";

interface InterpretAPIOptions {
  tech: string;
  question: string;
  answer: string;
}

export const useInterpretAPI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateInterpret = async ({ tech, question, answer }: InterpretAPIOptions) => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/generate-interpret", {
        method: "POST",
        body: JSON.stringify({ tech, question, answer }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("Error generating interpretation:", error);
      return { success: false, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  return { generateInterpret, isLoading };
};