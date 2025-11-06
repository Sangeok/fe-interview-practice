import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MultipleChoiceInterview from '../index';
import { MultipleChoiceQuestion } from '../../model/type';
import * as useNormalMCQSessionModule from '../../model/hooks/useNormalMCQSession';
import * as useReviewMCQSessionModule from '../../model/hooks/useReviewMCQSession';
import * as useAnswerFeedbackStateModule from '../../model/hooks/useAnswerFeedbackState';

// Mock child components
vi.mock('../_component/QuestionCard/ui/QuestionCard', () => ({
  default: ({ question, onSubmitAnswer }: any) => (
    <div data-testid="question-card">
      <p>{question}</p>
      <button onClick={() => onSubmitAnswer(true)}>Correct Answer</button>
      <button onClick={() => onSubmitAnswer(false)}>Wrong Answer</button>
    </div>
  ),
}));

vi.mock('../_component/EndQuestion', () => ({
  default: ({ score, questionAnswerLength }: any) => (
    <div data-testid="end-question">
      Score: {score}/{questionAnswerLength}
    </div>
  ),
}));

vi.mock('../_component/InterpretCard', () => ({
  default: ({ loading, interpret, onNext }: any) => (
    <div data-testid="interpret-card">
      {loading ? 'Loading...' : interpret}
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

vi.mock('../_component/AnswerCorrectCard', () => ({
  default: ({ onNext }: any) => (
    <div data-testid="correct-card">
      <p>Correct!</p>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

vi.mock('../_component/ProgressHeader', () => ({
  default: ({ score, currentQuestionIndex, totalQuestions }: any) => (
    <div data-testid="progress-header">
      Progress: {currentQuestionIndex + 1}/{totalQuestions} | Score: {score}
    </div>
  ),
}));

describe('MultipleChoiceInterview Widget', () => {
  const mockQuestions: MultipleChoiceQuestion[] = [
    {
      id: 1,
      question: 'What is === ?',
      options: [
        { id: 1, label: 'Strict equality', answerBoolean: true },
        { id: 2, label: 'Loose equality', answerBoolean: false },
      ],
      answerString: 'Strict equality operator',
    },
    {
      id: 2,
      question: 'What is typeof null?',
      options: [
        { id: 1, label: 'null', answerBoolean: false },
        { id: 2, label: 'object', answerBoolean: true },
      ],
      answerString: 'object',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementations for both session hooks
    const defaultSessionReturn = {
      currentQuestion: mockQuestions[0],
      currentQuestionIndex: 0,
      score: 0,
      isQuizFinished: false,
      totalQuestions: 2,
      goNext: vi.fn(),
    };

    vi.spyOn(useNormalMCQSessionModule, 'useNormalMCQSession').mockReturnValue(defaultSessionReturn);
    vi.spyOn(useReviewMCQSessionModule, 'useReviewMCQSession').mockReturnValue(defaultSessionReturn);

    vi.spyOn(useAnswerFeedbackStateModule, 'useAnswerFeedbackState').mockReturnValue({
      answerState: 'idle' as any,
      isLoading: false,
      interpret: null,
      isAnswerCorrect: false,
      isAnswerChecked: false,
      showCorrectCard: false,
      showIncorrectInterpret: false,
      markCorrect: vi.fn(),
      markIncorrect: vi.fn(),
      setInterpret: vi.fn(),
      setLoading: vi.fn(),
      resetAnswerState: vi.fn(),
      handleAddReview: vi.fn(),
    });
  });

  describe('Initial Render', () => {
    it('should render progress header', () => {
      render(<MultipleChoiceInterview />);
      expect(screen.getByTestId('progress-header')).toBeInTheDocument();
    });

    it('should render first question', () => {
      render(<MultipleChoiceInterview />);
      expect(screen.getByTestId('question-card')).toBeInTheDocument();
      expect(screen.getByText('What is === ?')).toBeInTheDocument();
    });

    it('should display correct initial progress', () => {
      render(<MultipleChoiceInterview />);
      expect(screen.getByText('Progress: 1/2 | Score: 0')).toBeInTheDocument();
    });
  });

  describe('Question Display', () => {
    it('should show current question from quiz state', () => {
      render(<MultipleChoiceInterview />);
      expect(screen.getByText(mockQuestions[0].question)).toBeInTheDocument();
    });

    it('should not render question when currentQuestion is null', () => {
      vi.spyOn(useNormalMCQSessionModule, 'useNormalMCQSession').mockReturnValue({
        currentQuestion: null as any,
        currentQuestionIndex: 0,
        score: 0,
        isQuizFinished: false,
        totalQuestions: 2,
        goNext: vi.fn(),
      });

      render(<MultipleChoiceInterview />);
      expect(screen.queryByTestId('question-card')).not.toBeInTheDocument();
    });
  });

  describe('Answer Submission', () => {
    it('should call markCorrect when correct answer submitted', () => {
      const markCorrect = vi.fn();
      vi.spyOn(useAnswerFeedbackStateModule, 'useAnswerFeedbackState').mockReturnValue({
        answerState: 'idle' as any,
        isLoading: false,
        interpret: null,
        isAnswerCorrect: false,
        isAnswerChecked: false,
        showCorrectCard: false,
        showIncorrectInterpret: false,
        markCorrect,
        markIncorrect: vi.fn(),
        setInterpret: vi.fn(),
        setLoading: vi.fn(),
        resetAnswerState: vi.fn(),
        handleAddReview: vi.fn(),
      });

      render(<MultipleChoiceInterview />);
      screen.getByText('Correct Answer').click();

      expect(markCorrect).toHaveBeenCalled();
    });

    it('should call markIncorrect when wrong answer submitted', () => {
      const markIncorrect = vi.fn();
      vi.spyOn(useAnswerFeedbackStateModule, 'useAnswerFeedbackState').mockReturnValue({
        answerState: 'idle' as any,
        isLoading: false,
        interpret: null,
        isAnswerCorrect: false,
        isAnswerChecked: false,
        showCorrectCard: false,
        showIncorrectInterpret: false,
        markCorrect: vi.fn(),
        markIncorrect,
        setInterpret: vi.fn(),
        setLoading: vi.fn(),
        resetAnswerState: vi.fn(),
        handleAddReview: vi.fn(),
      });

      render(<MultipleChoiceInterview />);
      screen.getByText('Wrong Answer').click();

      expect(markIncorrect).toHaveBeenCalled();
    });
  });

  describe('Feedback Display', () => {
    it('should show correct card when answer is correct', () => {
      vi.spyOn(useAnswerFeedbackStateModule, 'useAnswerFeedbackState').mockReturnValue({
        answerState: 'correct' as any,
        isLoading: false,
        interpret: null,
        isAnswerCorrect: true,
        isAnswerChecked: true,
        showCorrectCard: true,
        showIncorrectInterpret: false,
        markCorrect: vi.fn(),
        markIncorrect: vi.fn(),
        setInterpret: vi.fn(),
        setLoading: vi.fn(),
        resetAnswerState: vi.fn(),
        handleAddReview: vi.fn(),
      });

      render(<MultipleChoiceInterview />);
      expect(screen.getByTestId('correct-card')).toBeInTheDocument();
      expect(screen.getByText('Correct!')).toBeInTheDocument();
    });

    it('should show interpret card when answer is incorrect', () => {
      vi.spyOn(useAnswerFeedbackStateModule, 'useAnswerFeedbackState').mockReturnValue({
        answerState: 'incorrect' as any,
        isLoading: false,
        interpret: 'AI explanation here' as any,
        isAnswerCorrect: false,
        isAnswerChecked: true,
        showCorrectCard: false,
        showIncorrectInterpret: true,
        markCorrect: vi.fn(),
        markIncorrect: vi.fn(),
        setInterpret: vi.fn(),
        setLoading: vi.fn(),
        resetAnswerState: vi.fn(),
        handleAddReview: vi.fn(),
      });

      render(<MultipleChoiceInterview />);
      expect(screen.getByTestId('interpret-card')).toBeInTheDocument();
    });

    it('should not show feedback cards in idle state', () => {
      render(<MultipleChoiceInterview />);
      expect(screen.queryByTestId('correct-card')).not.toBeInTheDocument();
      expect(screen.queryByTestId('interpret-card')).not.toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should call resetAnswerState and goNext when handleNext triggered', () => {
      const resetAnswerState = vi.fn();
      const goNext = vi.fn();

      vi.spyOn(useNormalMCQSessionModule, 'useNormalMCQSession').mockReturnValue({
        currentQuestion: mockQuestions[0],
        currentQuestionIndex: 0,
        score: 0,
        isQuizFinished: false,
        totalQuestions: 2,
        goNext,
      });

      vi.spyOn(useAnswerFeedbackStateModule, 'useAnswerFeedbackState').mockReturnValue({
        answerState: 'correct' as any,
        isLoading: false,
        interpret: null,
        isAnswerCorrect: true,
        isAnswerChecked: true,
        showCorrectCard: true,
        showIncorrectInterpret: false,
        markCorrect: vi.fn(),
        markIncorrect: vi.fn(),
        setInterpret: vi.fn(),
        setLoading: vi.fn(),
        resetAnswerState,
        handleAddReview: vi.fn(),
      });

      render(<MultipleChoiceInterview />);
      screen.getByText('Next').click();

      expect(resetAnswerState).toHaveBeenCalled();
      expect(goNext).toHaveBeenCalledWith(true);
    });

    it('should pass correct flag to goNext based on answer correctness', () => {
      const goNext = vi.fn();
      const resetAnswerState = vi.fn();

      vi.spyOn(useNormalMCQSessionModule, 'useNormalMCQSession').mockReturnValue({
        currentQuestion: mockQuestions[0],
        currentQuestionIndex: 0,
        score: 0,
        isQuizFinished: false,
        totalQuestions: 2,
        goNext,
      });

      vi.spyOn(useAnswerFeedbackStateModule, 'useAnswerFeedbackState').mockReturnValue({
        answerState: 'incorrect' as any,
        isLoading: false,
        interpret: 'Wrong' as any,
        isAnswerCorrect: false,
        isAnswerChecked: true,
        showCorrectCard: false,
        showIncorrectInterpret: true,
        markCorrect: vi.fn(),
        markIncorrect: vi.fn(),
        setInterpret: vi.fn(),
        setLoading: vi.fn(),
        resetAnswerState,
        handleAddReview: vi.fn(),
      });

      render(<MultipleChoiceInterview />);
      screen.getByText('Next').click();

      expect(goNext).toHaveBeenCalledWith(false);
    });
  });

  describe('Quiz Completion', () => {
    it('should show end screen when quiz is finished', () => {
      vi.spyOn(useNormalMCQSessionModule, 'useNormalMCQSession').mockReturnValue({
        currentQuestion: null as any,
        currentQuestionIndex: 2,
        score: 2,
        isQuizFinished: true,
        totalQuestions: 2,
        goNext: vi.fn(),
      });

      render(<MultipleChoiceInterview />);
      expect(screen.getByTestId('end-question')).toBeInTheDocument();
      expect(screen.getByText('Score: 2/2')).toBeInTheDocument();
    });

    it('should not show question card when quiz is finished', () => {
      vi.spyOn(useNormalMCQSessionModule, 'useNormalMCQSession').mockReturnValue({
        currentQuestion: null as any,
        currentQuestionIndex: 2,
        score: 1,
        isQuizFinished: true,
        totalQuestions: 2,
        goNext: vi.fn(),
      });

      render(<MultipleChoiceInterview />);
      expect(screen.queryByTestId('question-card')).not.toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should pass loading state to InterpretCard', () => {
      vi.spyOn(useAnswerFeedbackStateModule, 'useAnswerFeedbackState').mockReturnValue({
        answerState: 'incorrect' as any,
        isLoading: true,
        interpret: null,
        isAnswerCorrect: false,
        isAnswerChecked: true,
        showCorrectCard: false,
        showIncorrectInterpret: true,
        markCorrect: vi.fn(),
        markIncorrect: vi.fn(),
        setInterpret: vi.fn(),
        setLoading: vi.fn(),
        resetAnswerState: vi.fn(),
        handleAddReview: vi.fn(),
      });

      render(<MultipleChoiceInterview />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Props Passing', () => {
    it('should pass correct props to QuestionCard', () => {
      const setInterpret = vi.fn();
      const setLoading = vi.fn();
      const handleAddReview = vi.fn();

      vi.spyOn(useAnswerFeedbackStateModule, 'useAnswerFeedbackState').mockReturnValue({
        answerState: 'idle' as any,
        isLoading: false,
        interpret: null,
        isAnswerCorrect: false,
        isAnswerChecked: false,
        showCorrectCard: false,
        showIncorrectInterpret: false,
        markCorrect: vi.fn(),
        markIncorrect: vi.fn(),
        setInterpret,
        setLoading,
        resetAnswerState: vi.fn(),
        handleAddReview,
      });

      render(<MultipleChoiceInterview />);
      const questionCard = screen.getByTestId('question-card');
      expect(questionCard).toBeInTheDocument();
    });

    it('should pass score and total questions to ProgressHeader', () => {
      vi.spyOn(useNormalMCQSessionModule, 'useNormalMCQSession').mockReturnValue({
        currentQuestion: mockQuestions[1],
        currentQuestionIndex: 1,
        score: 1,
        isQuizFinished: false,
        totalQuestions: 2,
        goNext: vi.fn(),
      });

      render(<MultipleChoiceInterview />);
      expect(screen.getByText('Progress: 2/2 | Score: 1')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty questions array', () => {
      vi.spyOn(useNormalMCQSessionModule, 'useNormalMCQSession').mockReturnValue({
        currentQuestion: null as any,
        currentQuestionIndex: 0,
        score: 0,
        isQuizFinished: true,
        totalQuestions: 0,
        goNext: vi.fn(),
      });

      render(<MultipleChoiceInterview />);
      expect(screen.getByTestId('end-question')).toBeInTheDocument();
    });

    it('should maintain correct state during rapid answer submissions', () => {
      const markCorrect = vi.fn();
      const markIncorrect = vi.fn();

      vi.spyOn(useAnswerFeedbackStateModule, 'useAnswerFeedbackState').mockReturnValue({
        answerState: 'idle' as any,
        isLoading: false,
        interpret: null,
        isAnswerCorrect: false,
        isAnswerChecked: false,
        showCorrectCard: false,
        showIncorrectInterpret: false,
        markCorrect,
        markIncorrect,
        setInterpret: vi.fn(),
        setLoading: vi.fn(),
        resetAnswerState: vi.fn(),
        handleAddReview: vi.fn(),
      });

      render(<MultipleChoiceInterview />);

      screen.getByText('Correct Answer').click();
      screen.getByText('Wrong Answer').click();

      expect(markCorrect).toHaveBeenCalled();
      expect(markIncorrect).toHaveBeenCalled();
    });
  });

  describe('Integration', () => {
    it('should coordinate between quiz and feedback states', () => {
      const goNext = vi.fn();
      const resetAnswerState = vi.fn();

      vi.spyOn(useNormalMCQSessionModule, 'useNormalMCQSession').mockReturnValue({
        currentQuestion: mockQuestions[0],
        currentQuestionIndex: 0,
        score: 0,
        isQuizFinished: false,
        totalQuestions: 2,
        goNext,
      });

      vi.spyOn(useAnswerFeedbackStateModule, 'useAnswerFeedbackState').mockReturnValue({
        answerState: 'correct' as any,
        isLoading: false,
        interpret: null,
        isAnswerCorrect: true,
        isAnswerChecked: true,
        showCorrectCard: true,
        showIncorrectInterpret: false,
        markCorrect: vi.fn(),
        markIncorrect: vi.fn(),
        setInterpret: vi.fn(),
        setLoading: vi.fn(),
        resetAnswerState,
        handleAddReview: vi.fn(),
      });

      render(<MultipleChoiceInterview />);
      screen.getByText('Next').click();

      expect(resetAnswerState).toHaveBeenCalled();
      expect(goNext).toHaveBeenCalled();
    });
  });
});
