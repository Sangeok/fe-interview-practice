interface EndSubjectQuestionProps {
  score: number;
  totalQuestions: number;
}

export default function EndSubjectQuestion({ score, totalQuestions }: EndSubjectQuestionProps) {
  return (
    <div className="w-full h-full flex flex-col bg-parent">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">면접 완료!</h2>
            <p className="text-xl">
              총 점수: {score} / {totalQuestions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
