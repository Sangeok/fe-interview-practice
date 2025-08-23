"use client";
import { useState } from "react";
import { MultipleChoiceQuestion } from "../model/type";
import QuestionCard from "./_component/QuestionCard";
import EndQuestion from "./_component/EndQuestion";

interface MultipleChoiceInterviewProps {
  questionAnswer: MultipleChoiceQuestion[];
}

export default function MultipleChoiceInterview({ questionAnswer }: MultipleChoiceInterviewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const isQuizFinished = currentQuestionIndex >= questionAnswer.length;

  const handleNextQuestion = (selectedAnswer: string) => {
    const isCorrect = selectedAnswer === questionAnswer[currentQuestionIndex].answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {isQuizFinished && <EndQuestion score={score} questionAnswerLength={questionAnswer.length} />}
      {!isQuizFinished && (
        <QuestionCard
          key={questionAnswer[currentQuestionIndex].id}
          question={questionAnswer[currentQuestionIndex].question}
          options={questionAnswer[currentQuestionIndex].options}
          onNext={handleNextQuestion}
        />
      )}
    </div>
  );
}
