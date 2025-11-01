import { describe, it, expect } from 'vitest';
import {
  isFeedbackData,
  isDeepDiveFeedbackData,
  isFeedbackResponse,
} from '../isFeedbackData';
import { FeedbackData, DeepDiveFeedbackData } from '@/fsd/shared/model/type';

describe('Type Guard Functions', () => {
  describe('isFeedbackData', () => {
    it('should return true for valid FeedbackData', () => {
      const validFeedback: FeedbackData = {
        topic: 'Closure',
        evaluation: {
          score: 6,
          maxScore: 10,
          summary: 'Good answer',
        },
        feedbackDetails: [
          {
            title: 'Strengths',
            description: 'Clear explanation',
            points: ['Point 1'],
          },
        ],
        modelAnswer: {
          introduction: 'Intro',
          usage: 'Usage',
          scenarios: [],
          example: {
            context: 'Context',
            solution: 'Solution',
          },
        },
      };

      expect(isFeedbackData(validFeedback)).toBe(true);
    });

    it('should return true for FeedbackData with multiple feedback details', () => {
      const feedbackWithMultipleDetails: FeedbackData = {
        topic: 'Hoisting',
        evaluation: {
          score: 5,
          maxScore: 10,
          summary: 'Developing understanding',
        },
        feedbackDetails: [
          {
            title: '답변의 좋았던 점',
            description: 'Good structure',
            points: ['Clear', 'Concise'],
          },
          {
            title: '개선이 필요한 부분',
            description: 'Needs examples',
            points: ['Add code samples', 'More depth'],
          },
        ],
        modelAnswer: {
          introduction: 'Introduction text',
          usage: 'Usage explanation',
          scenarios: [
            { condition: 'When X', explanation: 'Then Y' },
          ],
          example: {
            context: 'In practice',
            solution: 'Do this',
          },
        },
      };

      expect(isFeedbackData(feedbackWithMultipleDetails)).toBe(true);
    });

    it('should return false for DeepDiveFeedbackData', () => {
      const deepDiveFeedback: DeepDiveFeedbackData = {
        topic: 'Closure',
        evaluation: {
          score: 9,
          maxScore: 10,
          summary: 'Excellent',
        },
        feedbackDetails: [
          {
            title: 'Excellence',
            description: 'Perfect',
            points: ['Point 1'],
          },
        ],
        deepDive: {
          title: 'Deep Dive',
          description: 'Advanced topics',
          topics: ['Topic 1'],
        },
      };

      expect(isFeedbackData(deepDiveFeedback)).toBe(false);
    });

    it('should return false for string content', () => {
      expect(isFeedbackData('Simple text response')).toBe(false);
    });

    it('should return false for null', () => {
      expect(isFeedbackData(null as any)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isFeedbackData(undefined as any)).toBe(false);
    });

    it('should return false for object missing required fields', () => {
      const incomplete = {
        topic: 'Test',
        evaluation: { score: 5 },
      };

      expect(isFeedbackData(incomplete as any)).toBe(false);
    });

    it('should return false for object with modelAnswer but missing other fields', () => {
      const partial = {
        modelAnswer: {
          introduction: 'Intro',
          usage: 'Usage',
          scenarios: [],
          example: { context: 'C', solution: 'S' },
        },
      };

      expect(isFeedbackData(partial as any)).toBe(false);
    });

    it('should return false when missing topic field', () => {
      const missingTopic = {
        evaluation: { score: 5, maxScore: 10, summary: 'OK' },
        feedbackDetails: [],
        modelAnswer: {
          introduction: 'I',
          usage: 'U',
          scenarios: [],
          example: { context: 'C', solution: 'S' },
        },
      };

      expect(isFeedbackData(missingTopic as any)).toBe(false);
    });

    it('should return false when missing evaluation field', () => {
      const missingEvaluation = {
        topic: 'Test',
        feedbackDetails: [],
        modelAnswer: {
          introduction: 'I',
          usage: 'U',
          scenarios: [],
          example: { context: 'C', solution: 'S' },
        },
      };

      expect(isFeedbackData(missingEvaluation as any)).toBe(false);
    });

    it('should return false when missing feedbackDetails field', () => {
      const missingFeedbackDetails = {
        topic: 'Test',
        evaluation: { score: 5, maxScore: 10, summary: 'OK' },
        modelAnswer: {
          introduction: 'I',
          usage: 'U',
          scenarios: [],
          example: { context: 'C', solution: 'S' },
        },
      };

      expect(isFeedbackData(missingFeedbackDetails as any)).toBe(false);
    });

    it('should return false when missing modelAnswer field', () => {
      const missingModelAnswer = {
        topic: 'Test',
        evaluation: { score: 5, maxScore: 10, summary: 'OK' },
        feedbackDetails: [],
      };

      expect(isFeedbackData(missingModelAnswer as any)).toBe(false);
    });

    it('should return false for object with extra deepDive field', () => {
      const withDeepDive = {
        topic: 'Test',
        evaluation: { score: 5, maxScore: 10, summary: 'OK' },
        feedbackDetails: [],
        modelAnswer: {
          introduction: 'I',
          usage: 'U',
          scenarios: [],
          example: { context: 'C', solution: 'S' },
        },
        deepDive: { title: 'T', description: 'D', topics: [] },
      };

      // Should return false because deepDive presence indicates DeepDiveFeedbackData
      expect(isFeedbackData(withDeepDive as any)).toBe(false);
    });
  });

  describe('isDeepDiveFeedbackData', () => {
    it('should return true for valid DeepDiveFeedbackData', () => {
      const validDeepDive: DeepDiveFeedbackData = {
        topic: 'Advanced Closure',
        evaluation: {
          score: 10,
          maxScore: 10,
          summary: 'Outstanding',
        },
        feedbackDetails: [
          {
            title: 'Excellence',
            description: 'Perfect understanding',
            points: ['Advanced concept 1'],
          },
        ],
        deepDive: {
          title: 'Further Learning',
          description: 'Explore these topics',
          topics: ['Lexical scoping', 'Memory management'],
        },
      };

      expect(isDeepDiveFeedbackData(validDeepDive)).toBe(true);
    });

    it('should return true for DeepDiveFeedbackData with multiple topics', () => {
      const multipleTopics: DeepDiveFeedbackData = {
        topic: 'Event Loop',
        evaluation: {
          score: 9,
          maxScore: 10,
          summary: 'Excellent explanation',
        },
        feedbackDetails: [
          {
            title: '답변의 뛰어난 점',
            description: 'Comprehensive coverage',
            points: ['Clear examples', 'Good depth', 'Well structured'],
          },
        ],
        deepDive: {
          title: 'Advanced Topics to Explore',
          description: 'Take your knowledge further',
          topics: [
            'Microtasks vs Macrotasks',
            'Task queue priorities',
            'Event loop in Node.js',
            'RequestAnimationFrame',
          ],
        },
      };

      expect(isDeepDiveFeedbackData(multipleTopics)).toBe(true);
    });

    it('should return false for regular FeedbackData', () => {
      const regularFeedback = {
        topic: 'Test',
        evaluation: { score: 5, maxScore: 10, summary: 'OK' },
        feedbackDetails: [],
        modelAnswer: {
          introduction: 'I',
          usage: 'U',
          scenarios: [],
          example: { context: 'C', solution: 'S' },
        },
      };

      expect(isDeepDiveFeedbackData(regularFeedback as any)).toBe(false);
    });

    it('should return false for string content', () => {
      expect(isDeepDiveFeedbackData('Text')).toBe(false);
    });

    it('should return false for null', () => {
      expect(isDeepDiveFeedbackData(null as any)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isDeepDiveFeedbackData(undefined as any)).toBe(false);
    });

    it('should return false for object missing deepDive field', () => {
      const missingDeepDive = {
        topic: 'Test',
        evaluation: { score: 9, maxScore: 10, summary: 'Great' },
        feedbackDetails: [],
      };

      expect(isDeepDiveFeedbackData(missingDeepDive as any)).toBe(false);
    });

    it('should return false when missing topic field', () => {
      const missingTopic = {
        evaluation: { score: 9, maxScore: 10, summary: 'Great' },
        feedbackDetails: [],
        deepDive: { title: 'T', description: 'D', topics: [] },
      };

      expect(isDeepDiveFeedbackData(missingTopic as any)).toBe(false);
    });

    it('should return false when missing evaluation field', () => {
      const missingEvaluation = {
        topic: 'Test',
        feedbackDetails: [],
        deepDive: { title: 'T', description: 'D', topics: [] },
      };

      expect(isDeepDiveFeedbackData(missingEvaluation as any)).toBe(false);
    });

    it('should return false when missing feedbackDetails field', () => {
      const missingFeedbackDetails = {
        topic: 'Test',
        evaluation: { score: 9, maxScore: 10, summary: 'Great' },
        deepDive: { title: 'T', description: 'D', topics: [] },
      };

      expect(isDeepDiveFeedbackData(missingFeedbackDetails as any)).toBe(false);
    });

    it('should return false when has modelAnswer instead of deepDive', () => {
      const withModelAnswer = {
        topic: 'Test',
        evaluation: { score: 9, maxScore: 10, summary: 'Great' },
        feedbackDetails: [],
        modelAnswer: {
          introduction: 'I',
          usage: 'U',
          scenarios: [],
          example: { context: 'C', solution: 'S' },
        },
      };

      expect(isDeepDiveFeedbackData(withModelAnswer as any)).toBe(false);
    });
  });

  describe('isFeedbackResponse', () => {
    it('should return true for FeedbackData', () => {
      const feedback: FeedbackData = {
        topic: 'T',
        evaluation: { score: 5, maxScore: 10, summary: 'S' },
        feedbackDetails: [],
        modelAnswer: {
          introduction: 'I',
          usage: 'U',
          scenarios: [],
          example: { context: 'C', solution: 'S' },
        },
      };

      expect(isFeedbackResponse(feedback)).toBe(true);
    });

    it('should return true for DeepDiveFeedbackData', () => {
      const deepDive: DeepDiveFeedbackData = {
        topic: 'T',
        evaluation: { score: 9, maxScore: 10, summary: 'S' },
        feedbackDetails: [],
        deepDive: {
          title: 'T',
          description: 'D',
          topics: [],
        },
      };

      expect(isFeedbackResponse(deepDive)).toBe(true);
    });

    it('should return false for string', () => {
      expect(isFeedbackResponse('Plain text')).toBe(false);
    });

    it('should return false for invalid object', () => {
      expect(isFeedbackResponse({ random: 'data' } as any)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isFeedbackResponse(null as any)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isFeedbackResponse(undefined as any)).toBe(false);
    });

    it('should return true for valid FeedbackData with low score', () => {
      const lowScoreFeedback: FeedbackData = {
        topic: 'JavaScript Basics',
        evaluation: { score: 3, maxScore: 10, summary: 'Needs improvement' },
        feedbackDetails: [
          {
            title: '부족한 부분',
            description: 'Missing key concepts',
            points: ['Add examples', 'Explain better'],
          },
        ],
        modelAnswer: {
          introduction: 'Complete answer',
          usage: 'When to use',
          scenarios: [],
          example: { context: 'Example', solution: 'Solution' },
        },
      };

      expect(isFeedbackResponse(lowScoreFeedback)).toBe(true);
    });

    it('should return true for valid DeepDiveFeedbackData with high score', () => {
      const highScoreFeedback: DeepDiveFeedbackData = {
        topic: 'Advanced Concepts',
        evaluation: { score: 10, maxScore: 10, summary: 'Perfect' },
        feedbackDetails: [
          {
            title: '답변의 뛰어난 점',
            description: 'Exceptional',
            points: ['Complete', 'Clear', 'Precise'],
          },
        ],
        deepDive: {
          title: 'Next Steps',
          description: 'Continue learning',
          topics: ['Topic A', 'Topic B'],
        },
      };

      expect(isFeedbackResponse(highScoreFeedback)).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle array input', () => {
      expect(isFeedbackData([] as any)).toBe(false);
      expect(isDeepDiveFeedbackData([] as any)).toBe(false);
      expect(isFeedbackResponse([] as any)).toBe(false);
    });

    it('should handle number input', () => {
      expect(isFeedbackData(123 as any)).toBe(false);
      expect(isDeepDiveFeedbackData(123 as any)).toBe(false);
      expect(isFeedbackResponse(123 as any)).toBe(false);
    });

    it('should handle boolean input', () => {
      expect(isFeedbackData(true as any)).toBe(false);
      expect(isDeepDiveFeedbackData(false as any)).toBe(false);
      expect(isFeedbackResponse(true as any)).toBe(false);
    });

    it('should handle empty object', () => {
      expect(isFeedbackData({} as any)).toBe(false);
      expect(isDeepDiveFeedbackData({} as any)).toBe(false);
      expect(isFeedbackResponse({} as any)).toBe(false);
    });

    it('should handle object with only some fields', () => {
      const partial = {
        topic: 'Test',
        evaluation: { score: 5, maxScore: 10, summary: 'OK' },
      };

      expect(isFeedbackData(partial as any)).toBe(false);
      expect(isDeepDiveFeedbackData(partial as any)).toBe(false);
      expect(isFeedbackResponse(partial as any)).toBe(false);
    });

    it('should handle function input', () => {
      const fn = () => {};
      expect(isFeedbackData(fn as any)).toBe(false);
      expect(isDeepDiveFeedbackData(fn as any)).toBe(false);
      expect(isFeedbackResponse(fn as any)).toBe(false);
    });

    it('should handle symbol input', () => {
      const sym = Symbol('test');
      expect(isFeedbackData(sym as any)).toBe(false);
      expect(isDeepDiveFeedbackData(sym as any)).toBe(false);
      expect(isFeedbackResponse(sym as any)).toBe(false);
    });

    it('should handle date object', () => {
      const date = new Date();
      expect(isFeedbackData(date as any)).toBe(false);
      expect(isDeepDiveFeedbackData(date as any)).toBe(false);
      expect(isFeedbackResponse(date as any)).toBe(false);
    });

    it('should handle regex object', () => {
      const regex = /test/;
      expect(isFeedbackData(regex as any)).toBe(false);
      expect(isDeepDiveFeedbackData(regex as any)).toBe(false);
      expect(isFeedbackResponse(regex as any)).toBe(false);
    });
  });

  describe('Type Guard Mutual Exclusivity', () => {
    it('FeedbackData should not pass DeepDiveFeedbackData check', () => {
      const feedback: FeedbackData = {
        topic: 'Test',
        evaluation: { score: 5, maxScore: 10, summary: 'OK' },
        feedbackDetails: [],
        modelAnswer: {
          introduction: 'I',
          usage: 'U',
          scenarios: [],
          example: { context: 'C', solution: 'S' },
        },
      };

      expect(isFeedbackData(feedback)).toBe(true);
      expect(isDeepDiveFeedbackData(feedback)).toBe(false);
    });

    it('DeepDiveFeedbackData should not pass FeedbackData check', () => {
      const deepDive: DeepDiveFeedbackData = {
        topic: 'Test',
        evaluation: { score: 9, maxScore: 10, summary: 'Great' },
        feedbackDetails: [],
        deepDive: {
          title: 'T',
          description: 'D',
          topics: [],
        },
      };

      expect(isDeepDiveFeedbackData(deepDive)).toBe(true);
      expect(isFeedbackData(deepDive)).toBe(false);
    });

    it('both types should pass isFeedbackResponse', () => {
      const feedback: FeedbackData = {
        topic: 'Test',
        evaluation: { score: 5, maxScore: 10, summary: 'OK' },
        feedbackDetails: [],
        modelAnswer: {
          introduction: 'I',
          usage: 'U',
          scenarios: [],
          example: { context: 'C', solution: 'S' },
        },
      };

      const deepDive: DeepDiveFeedbackData = {
        topic: 'Test',
        evaluation: { score: 9, maxScore: 10, summary: 'Great' },
        feedbackDetails: [],
        deepDive: {
          title: 'T',
          description: 'D',
          topics: [],
        },
      };

      expect(isFeedbackResponse(feedback)).toBe(true);
      expect(isFeedbackResponse(deepDive)).toBe(true);
    });
  });
});
