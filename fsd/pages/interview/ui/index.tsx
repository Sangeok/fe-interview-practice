import { TechType } from "@/fsd/shared/model/type";
import InterviewOption from "@/fsd/widgets/interviewOption/ui";

interface InterviewPageProps {
  title: string;
}

export default function InterviewPage({ title }: InterviewPageProps) {
  if (!title) return null;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{title} Interview</h1>
      <InterviewOption tech={title as TechType} />
    </div>
  );
}
