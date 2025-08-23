interface EndQuestionProps {
  score: number;
  questionAnswerLength: number;
}

export default function EndQuestion({ score, questionAnswerLength }: EndQuestionProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">퀴즈 완료!</h2>
      <p className="text-xl">
        총 점수: {score} / {questionAnswerLength}
      </p>
    </div>
  );
}
