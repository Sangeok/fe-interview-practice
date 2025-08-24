"use client";

import { TechType } from "@/fsd/shared/model/type";
import { useSelectTechStore } from "@/fsd/shared/model/useSelectTechStore";
import InterviewOption from "@/fsd/widgets/interviewOption/ui";

export default function InterviewPage() {
  const { tech } = useSelectTechStore();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{tech} Interview</h1>
      <InterviewOption tech={tech as TechType} />
    </div>
  );
}
