"use client";

import { useUserStore } from "@/fsd/entities/user/useUserStore";
import { useCustomQuestionStore } from "@/fsd/entities/customQuestion/model/useCustomQuestionStore";
import { InCorrectCustomQuestion } from "@/fsd/entities/user/types";
import { FeedbackData, DeepDiveFeedbackData } from "@/fsd/shared/model/type";
import { useState, useMemo } from "react";
import Button from "@/fsd/shared/ui/atoms/button/ui/Button";

interface CustomQuestionReviewProps {
  sessionQuestions: InCorrectCustomQuestion[];
}

export default function CustomQuestionReview({ sessionQuestions }: CustomQuestionReviewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newFeedback, setNewFeedback] = useState<FeedbackData | DeepDiveFeedbackData | null>(null);

  const questions = useCustomQuestionStore((state) => state.questions);
  const removeInCorrectCustomQuestion = useUserStore((state) => state.removeInCorrectCustomQuestion);
  const persistUserToDB = useUserStore((state) => state.persistUserToDB);

  const currentItem = sessionQuestions[currentQuestionIndex];
  const currentQuestion = useMemo(() => {
    if (!currentItem) return null;
    return questions.find((question) => question.id === currentItem.customQuestionId);
  }, [currentItem, questions]);

  const totalQuestions = sessionQuestions.length;

  if (totalQuestions === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-xl font-semibold text-gray-700">No incorrect custom questions to review</p>
        <p className="text-gray-500">Great job! Keep practicing.</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-xl font-semibold text-gray-700">Question deleted</p>
        <p className="text-gray-500">This custom question has been deleted.</p>
        {currentQuestionIndex < totalQuestions - 1 && (
          <Button onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}>Next Question</Button>
        )}
      </div>
    );
  }

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) {
      alert("Please enter an answer");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion.question,
          userAnswer: userAnswer,
        }),
      });

      const feedback = await response.json();
      setNewFeedback(feedback);
      setShowFeedback(true);
    } catch (error) {
      console.error("Failed to generate feedback:", error);
      alert("Failed to generate feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromIncorrect = async () => {
    removeInCorrectCustomQuestion(currentItem.customQuestionId);
    await persistUserToDB();

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer("");
      setShowFeedback(false);
      setNewFeedback(null);
    } else {
      // Last question - show completion message
      setCurrentQuestionIndex(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer("");
      setShowFeedback(false);
      setNewFeedback(null);
    }
  };

  const displayFeedback = newFeedback || currentItem.feedback;
  const score = displayFeedback?.evaluation?.score || 0;
  const isPassing = score >= 7;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto p-6">
      {/* Progress */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </p>
        <p className="text-sm text-gray-600">Technology: {currentQuestion.technology}</p>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>

        {/* Previous Answer & Feedback */}
        {!showFeedback && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-700">Previous Answer:</h3>
            <p className="text-gray-600 mb-4">{currentItem.userAnswer}</p>

            <h3 className="font-semibold mb-2 text-gray-700">Previous Feedback:</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Score:</span> {currentItem.feedback.evaluation.score}/
                {currentItem.feedback.evaluation.maxScore}
              </p>
              <p className="text-sm text-gray-600">{currentItem.feedback.evaluation.summary}</p>
            </div>
          </div>
        )}

        {/* Answer Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer (Retry):</label>
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={6}
            placeholder="Enter your answer here..."
            disabled={isLoading || showFeedback}
          />
        </div>

        {/* New Feedback */}
        {showFeedback && newFeedback && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-900">New Feedback:</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Score:</span> {newFeedback.evaluation.score}/
                {newFeedback.evaluation.maxScore}
              </p>
              <p className="text-sm text-gray-700">{newFeedback.evaluation.summary}</p>

              {newFeedback.feedbackDetails?.map((detail, index) => (
                <div key={index} className="mt-4">
                  <h4 className="font-medium text-sm text-gray-800">{detail.title}</h4>
                  <p className="text-sm text-gray-600">{detail.description}</p>
                  {detail.points && (
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                      {detail.points.map((point, pointIndex) => (
                        <li key={pointIndex}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!showFeedback ? (
            <Button onClick={handleSubmitAnswer} disabled={isLoading || !userAnswer.trim()}>
              {isLoading ? "Generating Feedback..." : "Submit Answer"}
            </Button>
          ) : (
            <>
              {isPassing && (
                <Button variant="dark" onClick={handleRemoveFromIncorrect}>
                  Remove from Incorrect (Passed!)
                </Button>
              )}
              {currentQuestionIndex < totalQuestions - 1 && (
                <Button variant="light" onClick={handleNextQuestion}>
                  Next Question
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
