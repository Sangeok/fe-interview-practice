import { describe, it, expect } from 'vitest';
import { getQuestionAnswer } from '../getQuestionAnswer';
import { JAVASCRIPT_SUBJECTIVE_QUESTIONS } from '../../constants/JavascriptQA_Subjective';
import { REACT_SUBJECTIVE_QUESTIONS } from '../../constants/ReactQA_Subjective';
import { TYPESCRIPT_SUBJECTIVE_QUESTIONS } from '../../constants/TypeScriptQA_Subjective';
import {
  JAVASCRIPT_MULTIPLE_CHOICE_QUESTIONS,
  REACT_MULTIPLE_CHOICE_QUESTIONS,
  TYPESCRIPT_MULTIPLE_CHOICE_QUESTIONS,
} from '../../constants';

describe('getQuestionAnswer', () => {
  describe('Subjective Questions', () => {
    it('should return JavaScript subjective questions', () => {
      const result = getQuestionAnswer('JavaScript', 'Subjective');
      expect(result).toEqual(JAVASCRIPT_SUBJECTIVE_QUESTIONS);
    });

    it('should return React subjective questions', () => {
      const result = getQuestionAnswer('React', 'Subjective');
      expect(result).toEqual(REACT_SUBJECTIVE_QUESTIONS);
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return TypeScript subjective questions', () => {
      const result = getQuestionAnswer('TypeScript', 'Subjective');
      expect(result).toEqual(TYPESCRIPT_SUBJECTIVE_QUESTIONS);
      expect(result).toBeDefined();
    });
  });

  describe('Multiple Choice Questions', () => {
    it('should return JavaScript multiple choice questions', () => {
      const result = getQuestionAnswer('JavaScript', 'Multiple Choice');
      expect(result).toEqual(JAVASCRIPT_MULTIPLE_CHOICE_QUESTIONS);
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return React multiple choice questions', () => {
      const result = getQuestionAnswer('React', 'Multiple Choice');
      expect(result).toEqual(REACT_MULTIPLE_CHOICE_QUESTIONS);
    });

    it('should return TypeScript multiple choice questions', () => {
      const result = getQuestionAnswer('TypeScript', 'Multiple Choice');
      expect(result).toEqual(TYPESCRIPT_MULTIPLE_CHOICE_QUESTIONS);
      expect(result).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should return empty array for invalid tech', () => {
      // @ts-expect-error Testing invalid input
      const result = getQuestionAnswer('InvalidTech', 'Subjective');
      expect(result).toEqual([]);
    });

    it('should return empty array for invalid interview type', () => {
      // @ts-expect-error Testing invalid input
      const result = getQuestionAnswer('JavaScript', 'InvalidType');
      expect(result).toEqual([]);
    });

    it('should return empty array when tech is empty string', () => {
      const result = getQuestionAnswer('', 'Subjective');
      expect(result).toEqual([]);
    });

    it('should return empty array when both parameters are invalid', () => {
      // @ts-expect-error Testing invalid input
      const result = getQuestionAnswer('Invalid', 'Invalid');
      expect(result).toEqual([]);
    });
  });

  describe('Data Structure Validation', () => {
    it('should return array of subjective questions with required fields', () => {
      const result = getQuestionAnswer('JavaScript', 'Subjective');
      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('question');
        expect(typeof result[0].id).toBe('number');
        expect(typeof result[0].question).toBe('string');
      }
    });

    it('should return multiple choice questions with options', () => {
      const result = getQuestionAnswer('JavaScript', 'Multiple Choice');
      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('options');
        expect(Array.isArray((result[0] as any).options)).toBe(true);
        expect(result[0]).toHaveProperty('question');
        expect(result[0]).toHaveProperty('answerString');
      }
    });

    it('should return multiple choice questions with valid option structure', () => {
      const result = getQuestionAnswer('React', 'Multiple Choice');
      if (result.length > 0) {
        const firstQuestion = result[0] as any;
        expect(firstQuestion.options.length).toBeGreaterThan(0);
        const firstOption = firstQuestion.options[0];
        expect(firstOption).toHaveProperty('id');
        expect(firstOption).toHaveProperty('label');
        expect(firstOption).toHaveProperty('answerBoolean');
      }
    });

    it('should return non-empty arrays for all valid tech and type combinations', () => {
      const techs: Array<'JavaScript' | 'React' | 'TypeScript'> = ['JavaScript', 'React', 'TypeScript'];
      const types: Array<'Subjective' | 'Multiple Choice'> = ['Subjective', 'Multiple Choice'];

      techs.forEach((tech) => {
        types.forEach((type) => {
          const result = getQuestionAnswer(tech, type);
          expect(result.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Consistency Tests', () => {
    it('should return the same reference for multiple calls with same parameters', () => {
      const result1 = getQuestionAnswer('JavaScript', 'Subjective');
      const result2 = getQuestionAnswer('JavaScript', 'Subjective');
      expect(result1).toBe(result2);
    });

    it('should return different arrays for different tech stacks', () => {
      const jsQuestions = getQuestionAnswer('JavaScript', 'Subjective');
      const reactQuestions = getQuestionAnswer('React', 'Subjective');
      expect(jsQuestions).not.toBe(reactQuestions);
    });

    it('should return different arrays for different interview types', () => {
      const subjectiveQuestions = getQuestionAnswer('JavaScript', 'Subjective');
      const multipleChoiceQuestions = getQuestionAnswer('JavaScript', 'Multiple Choice');
      expect(subjectiveQuestions).not.toBe(multipleChoiceQuestions);
    });
  });
});
