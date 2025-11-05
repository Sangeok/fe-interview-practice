import { PASS_THRESHOLD } from "../../../../constatns";
import { FeedbackAPIResult } from "./useFeedbackAPI";

export interface AnswerEvaluationResult {
  /**
   * Whether the answer is considered correct (passing)
   */
  isCorrect: boolean;
  /**
   * Whether the question should be added to incorrect list
   */
  shouldAddToIncorrect: boolean;
  /**
   * Whether the question should be removed from incorrect list
   */
  shouldRemoveFromIncorrect: boolean;
}

/**
 * Hook for evaluating subjective interview answers
 *
 * Evaluation rules:
 * - API error (success: false) → incorrect
 * - Success but score <= PASS_THRESHOLD → incorrect
 * - Otherwise → correct
 */
export const useAnswerEvaluation = () => {
  const evaluateAnswer = (feedbackResult: FeedbackAPIResult): AnswerEvaluationResult => {
    // API error case
    if (!feedbackResult.success) {
      return {
        isCorrect: false,
        shouldAddToIncorrect: true,
        shouldRemoveFromIncorrect: false,
      };
    }

    // Score-based evaluation
    const score = feedbackResult.data.evaluation.score;
    const isCorrect = score > PASS_THRESHOLD;

    return {
      isCorrect,
      shouldAddToIncorrect: !isCorrect,
      shouldRemoveFromIncorrect: isCorrect,
    };
  };

  return { evaluateAnswer };
};
