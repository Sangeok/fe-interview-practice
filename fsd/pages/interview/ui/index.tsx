import JavascriptInterview from "@/fsd/widgets/javascriptInterview/ui";

interface InterviewPageProps {
  title: string;
}

export default function InterviewPage({ title }: InterviewPageProps) {
  console.log("title", title);

  if (!title) return null;

  const renderInterview = () => {
    switch (title) {
      case "NextJs":
        return <div>NextJs Interview Page (구현 예정)</div>;
      case "JavaScript":
        return <JavascriptInterview tech={title} />;
      default:
        return <div>알 수 없는 인터뷰 유형: {title}</div>;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{title} Interview</h1>
      {renderInterview()}
    </div>
  );
}
