import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAnswerValidation } from '../useAnswerValidation';

describe('useAnswerValidation', () => {
  describe('Initial State', () => {
    it('should have null selectedOption initially', () => {
      const { result } = renderHook(() => useAnswerValidation());
      expect(result.current.selectedOption).toBeNull();
    });

    it('should have null isAnswerCorrect initially', () => {
      const { result } = renderHook(() => useAnswerValidation());
      expect(result.current.isAnswerCorrect).toBeNull();
    });

    it('should have isSubmitted as false initially', () => {
      const { result } = renderHook(() => useAnswerValidation());
      expect(result.current.isSubmitted).toBe(false);
    });

    it('should have canSubmit as false initially', () => {
      const { result } = renderHook(() => useAnswerValidation());
      expect(result.current.canSubmit).toBe(false);
    });

    it('should expose all required methods and properties', () => {
      const { result } = renderHook(() => useAnswerValidation());

      expect(result.current).toHaveProperty('selectedOption');
      expect(result.current).toHaveProperty('isAnswerCorrect');
      expect(result.current).toHaveProperty('isSubmitted');
      expect(result.current).toHaveProperty('canSubmit');
      expect(typeof result.current.selectOption).toBe('function');
      expect(typeof result.current.validateAnswer).toBe('function');
      expect(typeof result.current.resetValidation).toBe('function');
    });
  });

  describe('selectOption', () => {
    it('should set selected option', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const option = {
        id: 1,
        label: 'Correct answer',
        answerBoolean: true,
      };

      act(() => {
        result.current.selectOption(option);
      });

      expect(result.current.selectedOption).toEqual(option);
    });

    it('should allow changing selection before submission', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const option1 = { id: 1, label: 'Option 1', answerBoolean: false };
      const option2 = { id: 2, label: 'Option 2', answerBoolean: true };

      act(() => {
        result.current.selectOption(option1);
      });
      expect(result.current.selectedOption?.id).toBe(1);

      act(() => {
        result.current.selectOption(option2);
      });
      expect(result.current.selectedOption?.id).toBe(2);
    });

    it('should not allow changing selection after submission', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const option1 = { id: 1, label: 'Option 1', answerBoolean: true };
      const option2 = { id: 2, label: 'Option 2', answerBoolean: false };

      act(() => {
        result.current.selectOption(option1);
      });

      act(() => {
        result.current.validateAnswer();
      });

      act(() => {
        result.current.selectOption(option2);
      });

      expect(result.current.selectedOption?.id).toBe(1);
    });

    it('should update canSubmit when option is selected', () => {
      const { result } = renderHook(() => useAnswerValidation());

      expect(result.current.canSubmit).toBe(false);

      act(() => {
        result.current.selectOption({ id: 1, label: 'A', answerBoolean: true });
      });

      expect(result.current.canSubmit).toBe(true);
    });

    it('should preserve option properties', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const option = {
        id: 42,
        label: 'Detailed option text',
        answerBoolean: false,
      };

      act(() => {
        result.current.selectOption(option);
      });

      expect(result.current.selectedOption).toEqual(option);
      expect(result.current.selectedOption?.id).toBe(42);
      expect(result.current.selectedOption?.label).toBe('Detailed option text');
      expect(result.current.selectedOption?.answerBoolean).toBe(false);
    });

    it('should handle rapid option changes before submission', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const options = [
        { id: 1, label: 'A', answerBoolean: false },
        { id: 2, label: 'B', answerBoolean: false },
        { id: 3, label: 'C', answerBoolean: true },
      ];

      act(() => {
        options.forEach((opt) => result.current.selectOption(opt));
      });

      expect(result.current.selectedOption?.id).toBe(3);
    });
  });

  describe('validateAnswer', () => {
    it('should return invalid when no option selected', () => {
      const { result } = renderHook(() => useAnswerValidation());

      let validationResult;
      act(() => {
        validationResult = result.current.validateAnswer();
      });

      expect(validationResult).toEqual({
        isValid: false,
        message: 'Check your answer first',
      });
    });

    it('should return valid with correct answer', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const correctOption = { id: 1, label: 'Correct', answerBoolean: true };

      act(() => {
        result.current.selectOption(correctOption);
      });

      let validationResult;
      act(() => {
        validationResult = result.current.validateAnswer();
      });

      expect(validationResult).toEqual({
        isValid: true,
        isCorrect: true,
      });
      expect(result.current.isAnswerCorrect).toBe(true);
      expect(result.current.isSubmitted).toBe(true);
    });

    it('should return valid with incorrect answer', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const incorrectOption = { id: 2, label: 'Wrong', answerBoolean: false };

      act(() => {
        result.current.selectOption(incorrectOption);
      });

      let validationResult;
      act(() => {
        validationResult = result.current.validateAnswer();
      });

      expect(validationResult).toEqual({
        isValid: true,
        isCorrect: false,
      });
      expect(result.current.isAnswerCorrect).toBe(false);
    });

    it('should set isSubmitted to true after validation', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, label: 'A', answerBoolean: true });
      });

      act(() => {
        result.current.validateAnswer();
      });

      expect(result.current.isSubmitted).toBe(true);
    });

    it('should disable canSubmit after validation', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, label: 'A', answerBoolean: true });
      });

      expect(result.current.canSubmit).toBe(true);

      act(() => {
        result.current.validateAnswer();
      });

      expect(result.current.canSubmit).toBe(false);
    });

    it('should not change isAnswerCorrect when validation fails', () => {
      const { result } = renderHook(() => useAnswerValidation());

      expect(result.current.isAnswerCorrect).toBeNull();

      act(() => {
        result.current.validateAnswer();
      });

      expect(result.current.isAnswerCorrect).toBeNull();
    });

    it('should prevent multiple validations', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const option = { id: 1, label: 'Test', answerBoolean: true };

      act(() => {
        result.current.selectOption(option);
      });

      let firstResult;
      act(() => {
        firstResult = result.current.validateAnswer();
      });

      let secondResult;
      act(() => {
        secondResult = result.current.validateAnswer();
      });

      expect(firstResult).toEqual({ isValid: true, isCorrect: true });
      expect(result.current.isSubmitted).toBe(true);
    });

    it('should correctly identify true answerBoolean as correct', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, label: 'Correct', answerBoolean: true });
      });

      act(() => {
        result.current.validateAnswer();
      });

      expect(result.current.isAnswerCorrect).toBe(true);
    });

    it('should correctly identify false answerBoolean as incorrect', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, label: 'Wrong', answerBoolean: false });
      });

      act(() => {
        result.current.validateAnswer();
      });

      expect(result.current.isAnswerCorrect).toBe(false);
    });
  });

  describe('resetValidation', () => {
    it('should reset all state to initial values', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, label: 'A', answerBoolean: true });
      });

      act(() => {
        result.current.validateAnswer();
      });

      expect(result.current.selectedOption).not.toBeNull();
      expect(result.current.isSubmitted).toBe(true);

      act(() => {
        result.current.resetValidation();
      });

      expect(result.current.selectedOption).toBeNull();
      expect(result.current.isAnswerCorrect).toBeNull();
      expect(result.current.isSubmitted).toBe(false);
      expect(result.current.canSubmit).toBe(false);
    });

    it('should allow reselection after reset', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, label: 'First', answerBoolean: true });
      });

      act(() => {
        result.current.validateAnswer();
      });

      act(() => {
        result.current.resetValidation();
      });

      const newOption = { id: 2, label: 'Second', answerBoolean: false };

      act(() => {
        result.current.selectOption(newOption);
      });

      expect(result.current.selectedOption).toEqual(newOption);
      expect(result.current.canSubmit).toBe(true);
    });

    it('should reset even when no option was selected', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.resetValidation();
      });

      expect(result.current.selectedOption).toBeNull();
      expect(result.current.isAnswerCorrect).toBeNull();
      expect(result.current.isSubmitted).toBe(false);
    });

    it('should reset canSubmit to false', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, label: 'A', answerBoolean: true });
      });

      expect(result.current.canSubmit).toBe(true);

      act(() => {
        result.current.resetValidation();
      });

      expect(result.current.canSubmit).toBe(false);
    });
  });

  describe('canSubmit Computed Property', () => {
    it('should be false when no option selected', () => {
      const { result } = renderHook(() => useAnswerValidation());
      expect(result.current.canSubmit).toBe(false);
    });

    it('should be true when option selected and not submitted', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, label: 'A', answerBoolean: true });
      });

      expect(result.current.canSubmit).toBe(true);
    });

    it('should be false when option selected and submitted', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, label: 'A', answerBoolean: true });
      });

      act(() => {
        result.current.validateAnswer();
      });

      expect(result.current.canSubmit).toBe(false);
    });

    it('should be false after reset', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, label: 'A', answerBoolean: true });
        result.current.resetValidation();
      });

      expect(result.current.canSubmit).toBe(false);
    });
  });

  describe('Integration Scenarios', () => {
    it('should handle complete quiz flow: select → validate → reset → select again', () => {
      const { result } = renderHook(() => useAnswerValidation());

      // Round 1
      act(() => {
        result.current.selectOption({ id: 1, label: 'A', answerBoolean: true });
      });

      act(() => {
        result.current.validateAnswer();
      });

      expect(result.current.isAnswerCorrect).toBe(true);

      // Reset for Round 2
      act(() => {
        result.current.resetValidation();
      });

      // Round 2
      act(() => {
        result.current.selectOption({ id: 2, label: 'B', answerBoolean: false });
      });

      act(() => {
        result.current.validateAnswer();
      });

      expect(result.current.isAnswerCorrect).toBe(false);
    });

    it('should handle user changing mind before submission', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, label: 'Wrong', answerBoolean: false });
      });

      expect(result.current.selectedOption?.id).toBe(1);

      act(() => {
        result.current.selectOption({ id: 2, label: 'Correct', answerBoolean: true });
      });

      expect(result.current.selectedOption?.id).toBe(2);

      act(() => {
        result.current.validateAnswer();
      });

      expect(result.current.isAnswerCorrect).toBe(true);
    });

    it('should prevent resubmission without reset', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, label: 'A', answerBoolean: true });
      });

      act(() => {
        result.current.validateAnswer();
      });

      expect(result.current.isSubmitted).toBe(true);
      expect(result.current.canSubmit).toBe(false);

      // Try to select different option after submission
      act(() => {
        result.current.selectOption({ id: 2, label: 'B', answerBoolean: false });
      });

      // Selection should not change
      expect(result.current.selectedOption?.id).toBe(1);
      expect(result.current.canSubmit).toBe(false);
    });

    it('should handle full interview question sequence', () => {
      const { result } = renderHook(() => useAnswerValidation());

      // Question 1
      act(() => {
        result.current.selectOption({ id: 1, label: 'Q1 Answer', answerBoolean: true });
      });
      act(() => {
        result.current.validateAnswer();
      });
      expect(result.current.isAnswerCorrect).toBe(true);

      // Move to Question 2
      act(() => {
        result.current.resetValidation();
      });

      // Question 2
      act(() => {
        result.current.selectOption({ id: 2, label: 'Q2 Answer', answerBoolean: false });
      });
      act(() => {
        result.current.validateAnswer();
      });
      expect(result.current.isAnswerCorrect).toBe(false);

      // Move to Question 3
      act(() => {
        result.current.resetValidation();
      });

      // Question 3
      act(() => {
        result.current.selectOption({ id: 3, label: 'Q3 Answer', answerBoolean: true });
      });
      act(() => {
        result.current.validateAnswer();
      });
      expect(result.current.isAnswerCorrect).toBe(true);
    });

    it('should handle validation without selection gracefully', () => {
      const { result } = renderHook(() => useAnswerValidation());

      let validationResult;
      act(() => {
        validationResult = result.current.validateAnswer();
      });

      expect(validationResult).toEqual({
        isValid: false,
        message: 'Check your answer first',
      });

      expect(result.current.isSubmitted).toBe(false);
      expect(result.current.isAnswerCorrect).toBeNull();
    });

    it('should maintain isAnswerCorrect value after submission', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, label: 'Correct', answerBoolean: true });
      });

      act(() => {
        result.current.validateAnswer();
      });

      const correctnessAfterSubmission = result.current.isAnswerCorrect;

      // Try various actions
      act(() => {
        result.current.validateAnswer(); // Try validating again
      });

      expect(result.current.isAnswerCorrect).toBe(correctnessAfterSubmission);
    });
  });

  describe('Edge Cases', () => {
    it('should handle option with edge case values', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const edgeOption = {
        id: 0,
        label: '',
        answerBoolean: false,
      };

      act(() => {
        result.current.selectOption(edgeOption);
      });

      expect(result.current.selectedOption).toEqual(edgeOption);
    });

    it('should handle very long option text', () => {
      const { result } = renderHook(() => useAnswerValidation());

      const longOption = {
        id: 1,
        label: 'A'.repeat(1000),
        answerBoolean: true,
      };

      act(() => {
        result.current.selectOption(longOption);
      });

      act(() => {
        result.current.validateAnswer();
      });

      expect(result.current.selectedOption?.label.length).toBe(1000);
      expect(result.current.isAnswerCorrect).toBe(true);
    });

    it('should handle multiple resets in sequence', () => {
      const { result } = renderHook(() => useAnswerValidation());

      act(() => {
        result.current.selectOption({ id: 1, label: 'A', answerBoolean: true });
      });

      act(() => {
        result.current.validateAnswer();
      });

      act(() => {
        result.current.resetValidation();
        result.current.resetValidation();
        result.current.resetValidation();
      });

      expect(result.current.selectedOption).toBeNull();
      expect(result.current.isSubmitted).toBe(false);
    });
  });
});
