import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatMessage from '../ChatMessage';
import { Message } from '../../model/type';

// Mock child components
vi.mock('../_component/UserMessage', () => ({
  default: ({ content }: { content: string }) => <div data-testid="user-message">{content}</div>,
}));

vi.mock('../_component/ButtonMessage', () => ({
  default: ({ onNext, onEnd, onAddReview, showNext }: { onNext?: () => void; onEnd?: () => void; onAddReview?: () => void; showNext?: boolean }) => (
    <div data-testid="button-message">
      {showNext && onNext && <button onClick={onNext}>Next</button>}
      {onEnd && <button onClick={onEnd}>End</button>}
      {onAddReview && <button onClick={onAddReview}>Add Review</button>}
    </div>
  ),
}));

vi.mock('../_component/BotMessage/ui', () => ({
  default: ({ content, isLoading }: { content: string; isLoading?: boolean }) => (
    <div data-testid="bot-message">
      {isLoading ? 'Loading...' : content}
    </div>
  ),
}));

describe('ChatMessage Component', () => {
  const mockHandlers = {
    onNext: vi.fn(),
    onEnd: vi.fn(),
    onAddReview: vi.fn(),
  };

  describe('User Message Rendering', () => {
    it('should render UserMessage for user role', () => {
      const message: Message = {
        id: 1,
        role: 'user',
        content: 'Hello, this is my answer',
      };

      render(<ChatMessage message={message} {...mockHandlers} />);
      expect(screen.getByTestId('user-message')).toBeInTheDocument();
      expect(screen.getByText('Hello, this is my answer')).toBeInTheDocument();
    });

    it('should pass correct content to UserMessage', () => {
      const message: Message = {
        id: 2,
        role: 'user',
        content: 'Test content',
      };

      render(<ChatMessage message={message} {...mockHandlers} />);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });
  });

  describe('System Message Rendering', () => {
    it('should render ButtonMessage for system role', () => {
      const message: Message = {
        id: 3,
        role: 'system',
        content: '',
      };

      render(<ChatMessage message={message} {...mockHandlers} showNext={true} />);
      expect(screen.getByTestId('button-message')).toBeInTheDocument();
    });

    it('should pass onNext handler to ButtonMessage', () => {
      const message: Message = {
        id: 4,
        role: 'system',
        content: '',
      };

      render(<ChatMessage message={message} {...mockHandlers} showNext={true} />);
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('should pass onEnd handler to ButtonMessage', () => {
      const message: Message = {
        id: 5,
        role: 'system',
        content: '',
      };

      render(<ChatMessage message={message} {...mockHandlers} />);
      expect(screen.getByText('End')).toBeInTheDocument();
    });

    it('should pass onAddReview handler to ButtonMessage', () => {
      const message: Message = {
        id: 6,
        role: 'system',
        content: '',
      };

      render(<ChatMessage message={message} {...mockHandlers} />);
      expect(screen.getByText('Add Review')).toBeInTheDocument();
    });

    it('should respect showNext prop', () => {
      const message: Message = {
        id: 7,
        role: 'system',
        content: '',
      };

      const { rerender } = render(<ChatMessage message={message} {...mockHandlers} showNext={false} />);
      expect(screen.queryByText('Next')).not.toBeInTheDocument();

      rerender(<ChatMessage message={message} {...mockHandlers} showNext={true} />);
      expect(screen.getByText('Next')).toBeInTheDocument();
    });
  });

  describe('Assistant Message Rendering', () => {
    it('should render BotMessage for assistant role', () => {
      const message: Message = {
        id: 8,
        role: 'assistant',
        content: 'AI response here',
      };

      render(<ChatMessage message={message} {...mockHandlers} />);
      expect(screen.getByTestId('bot-message')).toBeInTheDocument();
      expect(screen.getByText('AI response here')).toBeInTheDocument();
    });

    it('should pass content to BotMessage', () => {
      const message: Message = {
        id: 9,
        role: 'assistant',
        content: 'Detailed feedback',
      };

      render(<ChatMessage message={message} {...mockHandlers} />);
      expect(screen.getByText('Detailed feedback')).toBeInTheDocument();
    });

    it('should pass loading state to BotMessage', () => {
      const message: Message = {
        id: 10,
        role: 'assistant',
        content: 'Loading...',
      };

      render(<ChatMessage message={message} {...mockHandlers} isLoading={true} />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Message Type Switching', () => {
    it('should render different components based on role', () => {
      const userMsg: Message = { id: 11, role: 'user', content: 'User' };
      const assistantMsg: Message = { id: 12, role: 'assistant', content: 'Bot' };
      const systemMsg: Message = { id: 13, role: 'system', content: '' };

      const { rerender } = render(<ChatMessage message={userMsg} {...mockHandlers} />);
      expect(screen.getByTestId('user-message')).toBeInTheDocument();

      rerender(<ChatMessage message={assistantMsg} {...mockHandlers} />);
      expect(screen.getByTestId('bot-message')).toBeInTheDocument();

      rerender(<ChatMessage message={systemMsg} {...mockHandlers} />);
      expect(screen.getByTestId('button-message')).toBeInTheDocument();
    });
  });

  describe('Props Propagation', () => {
    it('should propagate all handlers to system messages', () => {
      const handlers = {
        onNext: vi.fn(),
        onEnd: vi.fn(),
        onAddReview: vi.fn(),
      };

      const message: Message = {
        id: 14,
        role: 'system',
        content: '',
      };

      render(<ChatMessage message={message} {...handlers} showNext={true} />);

      screen.getByText('Next').click();
      screen.getByText('End').click();
      screen.getByText('Add Review').click();

      expect(handlers.onNext).toHaveBeenCalled();
      expect(handlers.onEnd).toHaveBeenCalled();
      expect(handlers.onAddReview).toHaveBeenCalled();
    });

    it('should not pass handlers to user messages', () => {
      const message: Message = {
        id: 15,
        role: 'user',
        content: 'Test',
      };

      render(<ChatMessage message={message} {...mockHandlers} showNext={true} />);
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
      expect(screen.queryByText('End')).not.toBeInTheDocument();
    });

    it('should not pass handlers to assistant messages', () => {
      const message: Message = {
        id: 16,
        role: 'assistant',
        content: 'AI response',
      };

      render(<ChatMessage message={message} {...mockHandlers} showNext={true} />);
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
      expect(screen.queryByText('End')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content for user message', () => {
      const message: Message = {
        id: 17,
        role: 'user',
        content: '',
      };

      render(<ChatMessage message={message} {...mockHandlers} />);
      expect(screen.getByTestId('user-message')).toBeInTheDocument();
    });

    it('should handle empty content for assistant message', () => {
      const message: Message = {
        id: 18,
        role: 'assistant',
        content: '',
      };

      render(<ChatMessage message={message} {...mockHandlers} />);
      expect(screen.getByTestId('bot-message')).toBeInTheDocument();
    });

    it('should handle missing optional props', () => {
      const message: Message = {
        id: 19,
        role: 'user',
        content: 'Test',
      };

      expect(() => {
        render(<ChatMessage message={message} />);
      }).not.toThrow();
    });

    it('should handle all handlers undefined for system message', () => {
      const message: Message = {
        id: 20,
        role: 'system',
        content: '',
      };

      render(<ChatMessage message={message} />);
      expect(screen.getByTestId('button-message')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should only affect assistant messages', () => {
      const assistantMsg: Message = {
        id: 21,
        role: 'assistant',
        content: 'Response',
      };

      const { rerender } = render(<ChatMessage message={assistantMsg} isLoading={true} />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();

      const userMsg: Message = {
        id: 22,
        role: 'user',
        content: 'Input',
      };

      rerender(<ChatMessage message={userMsg} isLoading={true} />);
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });
});
