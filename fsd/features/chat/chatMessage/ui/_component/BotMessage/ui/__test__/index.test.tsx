import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeedbackData, DeepDiveFeedbackData } from '@/fsd/shared/model/type';

// Mock child components (declare before importing module under test)
vi.mock('../_component/LoadingBotMessage', () => ({
  default: ({ BotAvatar }: { BotAvatar: React.ReactNode }) => (
    <div data-testid="loading-bot-message">
      {BotAvatar}
      <span>Loading...</span>
    </div>
  ),
}));

vi.mock('../_component/FeedbackMessage/ui', () => ({
  default: ({ BotAvatar, data }: { BotAvatar: React.ReactNode; data: FeedbackData }) => (
    <div data-testid="feedback-message">
      {BotAvatar}
      <div>Score: {data.evaluation.score}</div>
      <div>{data.topic}</div>
    </div>
  ),
}));

vi.mock('../_component/DeepDiveFeedbackMessage/ui', () => ({
  default: ({ BotAvatar, data }: { BotAvatar: React.ReactNode; data: DeepDiveFeedbackData }) => (
    <div data-testid="deepdive-message">
      {BotAvatar}
      <div>Deep Dive: {data.deepDive.title}</div>
      <div>{data.topic}</div>
    </div>
  ),
}));

vi.mock('../_component/GeneralBotMessage', () => ({
  default: ({ BotAvatar, content }: { BotAvatar: React.ReactNode; content: string }) => (
    <div data-testid="general-bot-message">
      {BotAvatar}
      <div>{content}</div>
    </div>
  ),
}));

// Import after mocks so that mocked modules are used
import BotMessage from '../index';

describe('BotMessage Component', () => {
  const mockFeedbackData: FeedbackData = {
    topic: 'JavaScript Closures',
    evaluation: {
      score: 8,
      maxScore: 10,
      summary: 'Good understanding',
    },
    feedbackDetails: [
      {
        title: 'Strengths',
        description: 'Clear explanation',
        points: ['Point 1', 'Point 2'],
      },
    ],
    modelAnswer: {
      introduction: 'Intro',
      usage: 'Usage',
      scenarios: [
        { condition: 'When', explanation: 'Why' },
      ],
      example: {
        context: 'Context',
        solution: 'Solution',
      },
    },
  };

  const mockDeepDiveFeedbackData: DeepDiveFeedbackData = {
    topic: 'React Hooks',
    evaluation: {
      score: 9,
      maxScore: 10,
      summary: 'Excellent',
    },
    feedbackDetails: [
      {
        title: 'Improvements',
        description: 'Consider edge cases',
      },
    ],
    deepDive: {
      title: 'Advanced Hooks',
      description: 'Explore custom hooks',
      topics: ['useCallback', 'useMemo', 'useRef'],
    },
  };

  describe('Loading State', () => {
    it('should render LoadingBotMessage when loading with loading message', () => {
      render(<BotMessage content="AI가 답변을 생성하는 중입니다..." isLoading={true} />);
      expect(screen.getByTestId('loading-bot-message')).toBeInTheDocument();
    });

    it('should display loading text', () => {
      render(<BotMessage content="AI가 답변을 생성하는 중입니다..." isLoading={true} />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should not render loading when isLoading false', () => {
      render(<BotMessage content="AI가 답변을 생성하는 중입니다..." isLoading={false} />);
      expect(screen.queryByTestId('loading-bot-message')).not.toBeInTheDocument();
    });

    it('should not render loading when content is not loading message', () => {
      render(<BotMessage content="Different message" isLoading={true} />);
      expect(screen.queryByTestId('loading-bot-message')).not.toBeInTheDocument();
    });
  });

  describe('FeedbackData Rendering', () => {
    it('should render FeedbackMessage for FeedbackData type', () => {
      render(<BotMessage content={mockFeedbackData} />);
      expect(screen.getByTestId('feedback-message')).toBeInTheDocument();
    });

    it('should pass correct data to FeedbackMessage', () => {
      render(<BotMessage content={mockFeedbackData} />);
      expect(screen.getByText('Score: 8')).toBeInTheDocument();
      expect(screen.getByText('JavaScript Closures')).toBeInTheDocument();
    });

    it('should render BotAvatar in FeedbackMessage', () => {
      render(<BotMessage content={mockFeedbackData} />);
      const feedbackMessage = screen.getByTestId('feedback-message');
      expect(feedbackMessage).toBeInTheDocument();
    });
  });

  describe('DeepDiveFeedbackData Rendering', () => {
    it('should render DeepDiveFeedbackMessage for DeepDiveFeedbackData type', () => {
      render(<BotMessage content={mockDeepDiveFeedbackData} />);
      expect(screen.getByTestId('deepdive-message')).toBeInTheDocument();
    });

    it('should pass correct data to DeepDiveFeedbackMessage', () => {
      render(<BotMessage content={mockDeepDiveFeedbackData} />);
      expect(screen.getByText('Deep Dive: Advanced Hooks')).toBeInTheDocument();
      expect(screen.getByText('React Hooks')).toBeInTheDocument();
    });

    it('should render BotAvatar in DeepDiveFeedbackMessage', () => {
      render(<BotMessage content={mockDeepDiveFeedbackData} />);
      const deepDiveMessage = screen.getByTestId('deepdive-message');
      expect(deepDiveMessage).toBeInTheDocument();
    });
  });

  describe('String Content Rendering', () => {
    it('should render GeneralBotMessage for string content', () => {
      render(<BotMessage content="Hello, this is a bot response" />);
      expect(screen.getByTestId('general-bot-message')).toBeInTheDocument();
    });

    it('should display string content correctly', () => {
      render(<BotMessage content="Test message" />);
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('should render BotAvatar with string content', () => {
      render(<BotMessage content="Text content" />);
      const generalMessage = screen.getByTestId('general-bot-message');
      expect(generalMessage).toBeInTheDocument();
    });
  });

  describe('Type Detection Priority', () => {
    it('should prioritize loading state over feedback data', () => {
      render(<BotMessage content="AI가 답변을 생성하는 중입니다..." isLoading={true} />);
      expect(screen.getByTestId('loading-bot-message')).toBeInTheDocument();
      expect(screen.queryByTestId('feedback-message')).not.toBeInTheDocument();
    });

    it('should check FeedbackData before DeepDiveFeedbackData', () => {
      render(<BotMessage content={mockFeedbackData} />);
      expect(screen.getByTestId('feedback-message')).toBeInTheDocument();
      expect(screen.queryByTestId('deepdive-message')).not.toBeInTheDocument();
    });

    it('should check DeepDiveFeedbackData before string', () => {
      render(<BotMessage content={mockDeepDiveFeedbackData} />);
      expect(screen.getByTestId('deepdive-message')).toBeInTheDocument();
      expect(screen.queryByTestId('general-bot-message')).not.toBeInTheDocument();
    });

    it('should fallback to GeneralBotMessage for unmatched types', () => {
      render(<BotMessage content="Regular string" />);
      expect(screen.getByTestId('general-bot-message')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string content', () => {
      render(<BotMessage content="" />);
      expect(screen.getByTestId('general-bot-message')).toBeInTheDocument();
    });

    it('should handle multiline string content', () => {
      const multilineContent = 'Line 1\nLine 2\nLine 3';
      render(<BotMessage content={multilineContent} />);
      expect(screen.getByText(/Line 1\s*Line 2\s*Line 3/)).toBeInTheDocument();
    });

    it('should handle special characters in string content', () => {
      const specialContent = '<div>HTML & Special !@#$%</div>';
      render(<BotMessage content={specialContent} />);
      expect(screen.getByText(specialContent)).toBeInTheDocument();
    });

    it('should handle FeedbackData with zero score', () => {
      const zeroScoreData: FeedbackData = {
        ...mockFeedbackData,
        evaluation: { score: 0, maxScore: 10, summary: 'Needs improvement' },
      };

      render(<BotMessage content={zeroScoreData} />);
      expect(screen.getByText('Score: 0')).toBeInTheDocument();
    });

    it('should handle FeedbackData with perfect score', () => {
      const perfectScoreData: FeedbackData = {
        ...mockFeedbackData,
        evaluation: { score: 10, maxScore: 10, summary: 'Perfect!' },
      };

      render(<BotMessage content={perfectScoreData} />);
      expect(screen.getByText('Score: 10')).toBeInTheDocument();
    });
  });

  describe('Content Type Switching', () => {
    it('should switch between different content types', () => {
      const { rerender } = render(<BotMessage content="String content" />);
      expect(screen.getByTestId('general-bot-message')).toBeInTheDocument();

      rerender(<BotMessage content={mockFeedbackData} />);
      expect(screen.getByTestId('feedback-message')).toBeInTheDocument();

      rerender(<BotMessage content={mockDeepDiveFeedbackData} />);
      expect(screen.getByTestId('deepdive-message')).toBeInTheDocument();

      rerender(<BotMessage content="AI가 답변을 생성하는 중입니다..." isLoading={true} />);
      expect(screen.getByTestId('loading-bot-message')).toBeInTheDocument();
    });
  });

  describe('Loading State Transitions', () => {
    it('should transition from loading to content', () => {
      const { rerender } = render(
        <BotMessage content="AI가 답변을 생성하는 중입니다..." isLoading={true} />
      );
      expect(screen.getByTestId('loading-bot-message')).toBeInTheDocument();

      rerender(<BotMessage content="Loaded content" isLoading={false} />);
      expect(screen.queryByTestId('loading-bot-message')).not.toBeInTheDocument();
      expect(screen.getByTestId('general-bot-message')).toBeInTheDocument();
    });

    it('should transition from loading to feedback', () => {
      const { rerender } = render(
        <BotMessage content="AI가 답변을 생성하는 중입니다..." isLoading={true} />
      );
      expect(screen.getByTestId('loading-bot-message')).toBeInTheDocument();

      rerender(<BotMessage content={mockFeedbackData} isLoading={false} />);
      expect(screen.queryByTestId('loading-bot-message')).not.toBeInTheDocument();
      expect(screen.getByTestId('feedback-message')).toBeInTheDocument();
    });
  });

  describe('Props Propagation', () => {
    it('should pass BotAvatar to all message types', () => {
      const { rerender } = render(<BotMessage content="Text" />);
      expect(screen.getByTestId('general-bot-message')).toBeInTheDocument();

      rerender(<BotMessage content={mockFeedbackData} />);
      expect(screen.getByTestId('feedback-message')).toBeInTheDocument();

      rerender(<BotMessage content={mockDeepDiveFeedbackData} />);
      expect(screen.getByTestId('deepdive-message')).toBeInTheDocument();

      rerender(<BotMessage content="AI가 답변을 생성하는 중입니다..." isLoading={true} />);
      expect(screen.getByTestId('loading-bot-message')).toBeInTheDocument();
    });
  });

  describe('Complex Content', () => {
    it('should handle FeedbackData with multiple feedback details', () => {
      const complexFeedback: FeedbackData = {
        ...mockFeedbackData,
        feedbackDetails: [
          { title: 'Detail 1', description: 'Desc 1', points: ['P1', 'P2'] },
          { title: 'Detail 2', description: 'Desc 2', points: ['P3', 'P4'] },
          { title: 'Detail 3', description: 'Desc 3' },
        ],
      };

      render(<BotMessage content={complexFeedback} />);
      expect(screen.getByTestId('feedback-message')).toBeInTheDocument();
    });

    it('should handle DeepDiveFeedbackData with multiple topics', () => {
      const complexDeepDive: DeepDiveFeedbackData = {
        ...mockDeepDiveFeedbackData,
        deepDive: {
          title: 'Advanced Topics',
          description: 'Deep dive into advanced concepts',
          topics: ['Topic1', 'Topic2', 'Topic3', 'Topic4', 'Topic5'],
        },
      };

      render(<BotMessage content={complexDeepDive} />);
      expect(screen.getByTestId('deepdive-message')).toBeInTheDocument();
    });
  });
});
