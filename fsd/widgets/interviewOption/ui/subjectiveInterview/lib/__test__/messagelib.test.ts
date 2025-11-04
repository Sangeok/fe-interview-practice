import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  createQuestionMessage,
  createUserMessage,
  createFeedbackMessage,
  createLoadingMessage,
  createActionButtonMessage,
  createEndMessage,
  filterButtonMessages,
} from '../messagelib';

describe('Message Creation Functions', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('createQuestionMessage', () => {
    it('should create assistant role message with question content', () => {
      const question = 'What is closure?';
      const message = createQuestionMessage(question);

      expect(message).toEqual({
        id: expect.any(Number),
        role: 'assistant',
        content: question,
      });
    });

    it('should generate unique IDs based on timestamp', () => {
      const now = Date.now();
      vi.setSystemTime(now);

      const msg1 = createQuestionMessage('Q1');
      expect(msg1.id).toBe(now);

      vi.advanceTimersByTime(1);
      const msg2 = createQuestionMessage('Q2');
      expect(msg2.id).toBe(now + 1);
      expect(msg1.id).not.toEqual(msg2.id);
    });

    it('should preserve question content exactly as provided', () => {
      const question = 'Explain the concept of hoisting in JavaScript';
      const message = createQuestionMessage(question);

      expect(message.content).toBe(question);
    });

    it('should handle empty string question', () => {
      const message = createQuestionMessage('');
      expect(message.content).toBe('');
      expect(message.role).toBe('assistant');
    });

    it('should handle long question text', () => {
      const longQuestion = 'A'.repeat(1000);
      const message = createQuestionMessage(longQuestion);
      expect(message.content).toBe(longQuestion);
      expect(message.content.length).toBe(1000);
    });
  });

  describe('createUserMessage', () => {
    it('should create user role message', () => {
      const content = 'My answer here';
      const message = createUserMessage(content);

      expect(message.role).toBe('user');
      expect(message.content).toBe(content);
      expect(message.id).toBeDefined();
    });

    it('should generate timestamp-based ID', () => {
      const now = Date.now();
      vi.setSystemTime(now);

      const message = createUserMessage('Test');
      expect(message.id).toBe(now);
    });

    it('should handle empty content', () => {
      const message = createUserMessage('');
      expect(message.content).toBe('');
      expect(message.role).toBe('user');
    });

    it('should handle multiline content', () => {
      const content = 'Line 1\nLine 2\nLine 3';
      const message = createUserMessage(content);
      expect(message.content).toBe(content);
    });
  });

  describe('createFeedbackMessage', () => {
    it('should create assistant feedback message with offset ID', () => {
      const now = Date.now();
      vi.setSystemTime(now);

      const feedback = 'Great answer!';
      const message = createFeedbackMessage(feedback);

      expect(message).toEqual({
        id: now + 1,
        role: 'assistant',
        content: feedback,
      });
    });

    it('should have ID offset by 1 from current timestamp', () => {
      const now = Date.now();
      vi.setSystemTime(now);

      const message = createFeedbackMessage('Feedback');
      expect(message.id).toBe(now + 1);
    });

    it('should handle JSON string content', () => {
      const jsonFeedback = JSON.stringify({ score: 8, message: 'Good' });
      const message = createFeedbackMessage(jsonFeedback);
      expect(message.content).toBe(jsonFeedback);
    });

    it('should create assistant role', () => {
      const message = createFeedbackMessage('Test feedback');
      expect(message.role).toBe('assistant');
    });
  });

  describe('createLoadingMessage', () => {
    it('should create loading message with Korean text', () => {
      const message = createLoadingMessage();

      expect(message.role).toBe('assistant');
      expect(message.content).toBe('AI가 답변을 생성하는 중입니다...');
      expect(message.id).toBeDefined();
    });

    it('should have ID offset by 3 from current timestamp', () => {
      const now = Date.now();
      vi.setSystemTime(now);

      const message = createLoadingMessage();
      expect(message.id).toBe(now + 3);
    });

    it('should always have same content', () => {
      const msg1 = createLoadingMessage();
      const msg2 = createLoadingMessage();

      expect(msg1.content).toBe(msg2.content);
      expect(msg1.content).toBe('AI가 답변을 생성하는 중입니다...');
    });
  });

  describe('createActionButtonMessage', () => {
    it('should create system role message with SHOW_BUTTONS content', () => {
      const message = createActionButtonMessage();

      expect(message.role).toBe('system');
      expect(message.content).toBe('SHOW_BUTTONS');
    });

    it('should have ID offset by 2 from current timestamp', () => {
      const now = Date.now();
      vi.setSystemTime(now);

      const message = createActionButtonMessage();
      expect(message.id).toBe(now + 2);
    });

    it('should always create system role', () => {
      const message = createActionButtonMessage();
      expect(message.role).toBe('system');
    });

    it('should have consistent SHOW_BUTTONS content', () => {
      const msg1 = createActionButtonMessage();
      const msg2 = createActionButtonMessage();

      expect(msg1.content).toBe('SHOW_BUTTONS');
      expect(msg2.content).toBe('SHOW_BUTTONS');
    });
  });

  describe('createEndMessage', () => {
    it('should create interview end message', () => {
      const message = createEndMessage();

      expect(message.role).toBe('assistant');
      expect(message.content).toContain('면접이 종료되었습니다');
      expect(message.content).toContain('수고하셨습니다');
    });

    it('should generate timestamp-based ID', () => {
      const now = Date.now();
      vi.setSystemTime(now);

      const message = createEndMessage();
      expect(message.id).toBe(now);
    });

    it('should have full Korean completion message', () => {
      const message = createEndMessage();
      expect(message.content).toBe('면접이 종료되었습니다. 수고하셨습니다!');
    });
  });

  describe('filterButtonMessages', () => {
    it('should remove SHOW_BUTTONS messages', () => {
      const messages = [
        { id: 1, role: 'user' as const, content: 'Hello' },
        { id: 2, role: 'system' as const, content: 'SHOW_BUTTONS' },
        { id: 3, role: 'assistant' as const, content: 'Response' },
        { id: 4, role: 'system' as const, content: 'SHOW_BUTTONS' },
      ];

      const filtered = filterButtonMessages(messages);

      expect(filtered).toHaveLength(2);
      expect(filtered).toEqual([
        { id: 1, role: 'user', content: 'Hello' },
        { id: 3, role: 'assistant', content: 'Response' },
      ]);
    });

    it('should return empty array when all messages are buttons', () => {
      const messages = [
        { id: 1, role: 'system' as const, content: 'SHOW_BUTTONS' },
        { id: 2, role: 'system' as const, content: 'SHOW_BUTTONS' },
      ];

      const filtered = filterButtonMessages(messages);
      expect(filtered).toEqual([]);
    });

    it('should return same array when no button messages', () => {
      const messages = [
        { id: 1, role: 'user' as const, content: 'Hello' },
        { id: 2, role: 'assistant' as const, content: 'Hi' },
      ];

      const filtered = filterButtonMessages(messages);
      expect(filtered).toEqual(messages);
    });

    it('should handle empty array', () => {
      const filtered = filterButtonMessages([]);
      expect(filtered).toEqual([]);
    });

    it('should preserve message order', () => {
      const messages = [
        { id: 1, role: 'user' as const, content: 'First' },
        { id: 2, role: 'system' as const, content: 'SHOW_BUTTONS' },
        { id: 3, role: 'assistant' as const, content: 'Second' },
        { id: 4, role: 'user' as const, content: 'Third' },
      ];

      const filtered = filterButtonMessages(messages);

      expect(filtered[0].content).toBe('First');
      expect(filtered[1].content).toBe('Second');
      expect(filtered[2].content).toBe('Third');
    });

    it('should not modify original array', () => {
      const messages = [
        { id: 1, role: 'user' as const, content: 'Test' },
        { id: 2, role: 'system' as const, content: 'SHOW_BUTTONS' },
      ];

      const original = [...messages];
      filterButtonMessages(messages);

      expect(messages).toEqual(original);
    });

    it('should filter only exact SHOW_BUTTONS match', () => {
      const messages = [
        { id: 1, role: 'system' as const, content: 'SHOW_BUTTONS' },
        { id: 2, role: 'system' as const, content: 'SHOW_BUTTONS_2' },
        { id: 3, role: 'system' as const, content: 'show_buttons' },
      ];

      const filtered = filterButtonMessages(messages);

      expect(filtered).toHaveLength(2);
      expect(filtered[0].content).toBe('SHOW_BUTTONS_2');
      expect(filtered[1].content).toBe('show_buttons');
    });
  });

  describe('ID Generation Consistency', () => {
    it('should generate different IDs for messages created at same time with offsets', () => {
      const now = Date.now();
      vi.setSystemTime(now);

      const questionMsg = createQuestionMessage('Q'); // offset 0
      const feedbackMsg = createFeedbackMessage('F'); // offset +1
      const buttonMsg = createActionButtonMessage(); // offset +2
      const loadingMsg = createLoadingMessage(); // offset +3

      expect(questionMsg.id).toBe(now);
      expect(feedbackMsg.id).toBe(now + 1);
      expect(buttonMsg.id).toBe(now + 2);
      expect(loadingMsg.id).toBe(now + 3);
    });
  });

  describe('Message Type Safety', () => {
    it('should create messages with correct role types', () => {
      const userMsg = createUserMessage('Test');
      const assistantMsg = createQuestionMessage('Test');
      const systemMsg = createActionButtonMessage();

      expect(['user', 'assistant', 'system']).toContain(userMsg.role);
      expect(['user', 'assistant', 'system']).toContain(assistantMsg.role);
      expect(['user', 'assistant', 'system']).toContain(systemMsg.role);
    });
  });
});
