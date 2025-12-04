import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useUserStore } from "../useUserStore";
import { indexedDBService } from "@/fsd/shared/lib/indexedDB";

// Mock IndexedDB service
vi.mock("@/fsd/shared/lib/indexedDB", () => ({
  indexedDBService: {
    saveUserData: vi.fn().mockResolvedValue(undefined),
    loadUserData: vi.fn().mockResolvedValue(null),
  },
}));

describe("useUserStore", () => {
  beforeEach(() => {
    // Reset store state
    const { result } = renderHook(() => useUserStore());
    act(() => {
      result.current.setUser({
        inCorrectSubQuestion: [],
        inCorrectMultipleChoiceQuestion: [],
      });
    });

    // Clear mock calls
    vi.clearAllMocks();
  });

  describe("Initial State", () => {
    it("should have empty arrays as initial state", () => {
      const { result } = renderHook(() => useUserStore());

      expect(result.current.user.inCorrectSubQuestion).toEqual([]);
      expect(result.current.user.inCorrectMultipleChoiceQuestion).toEqual([]);
    });

    it("should provide all required methods", () => {
      const { result } = renderHook(() => useUserStore());

      expect(typeof result.current.setUser).toBe("function");
      expect(typeof result.current.setInCorrectSubQuestion).toBe("function");
      expect(typeof result.current.setInCorrectMultipleChoiceQuestion).toBe("function");
      expect(typeof result.current.addInCorrectSubQuestion).toBe("function");
      expect(typeof result.current.removeInCorrectSubQuestion).toBe("function");
      expect(typeof result.current.addInCorrectMultipleChoiceQuestion).toBe("function");
      expect(typeof result.current.removeInCorrectMultipleChoiceQuestion).toBe("function");
      expect(typeof result.current.hydrateUserFromDB).toBe("function");
      expect(typeof result.current.persistUserToDB).toBe("function");
    });
  });

  describe("addInCorrectSubQuestion", () => {
    it("should add a subjective question", () => {
      const { result } = renderHook(() => useUserStore());

      const question = {
        id: 1,
        question: "What is closure?",
      };

      act(() => {
        result.current.addInCorrectSubQuestion(question);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
      expect(result.current.user.inCorrectSubQuestion[0]).toEqual(question);
    });

    it("should prevent duplicate questions", () => {
      const { result } = renderHook(() => useUserStore());

      const question = {
        id: 1,
        question: "What is closure?",
      };

      act(() => {
        result.current.addInCorrectSubQuestion(question);
        result.current.addInCorrectSubQuestion(question);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
    });

    it("should allow questions with different IDs", () => {
      const { result } = renderHook(() => useUserStore());

      const question1 = { id: 1, question: "Q1" };
      const question2 = { id: 2, question: "Q2" };

      act(() => {
        result.current.addInCorrectSubQuestion(question1);
        result.current.addInCorrectSubQuestion(question2);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(2);
    });

    it("should prevent duplicate based on ID even with different question text", () => {
      const { result } = renderHook(() => useUserStore());

      const question1 = { id: 1, question: "Original question" };
      const question2 = { id: 1, question: "Modified question" };

      act(() => {
        result.current.addInCorrectSubQuestion(question1);
        result.current.addInCorrectSubQuestion(question2);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
      expect(result.current.user.inCorrectSubQuestion[0].question).toBe("Original question");
    });

    it("should add multiple different questions", () => {
      const { result } = renderHook(() => useUserStore());

      const questions = [
        { id: 1, question: "Q1" },
        { id: 2, question: "Q2" },
        { id: 3, question: "Q3" },
      ];

      act(() => {
        questions.forEach((q) => result.current.addInCorrectSubQuestion(q));
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(3);
    });
  });

  describe("removeInCorrectSubQuestion", () => {
    it("should remove a question by ID", () => {
      const { result } = renderHook(() => useUserStore());

      const question1 = { id: 1, question: "Q1" };
      const question2 = { id: 2, question: "Q2" };

      act(() => {
        result.current.addInCorrectSubQuestion(question1);
        result.current.addInCorrectSubQuestion(question2);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(2);

      act(() => {
        result.current.removeInCorrectSubQuestion(1);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
      expect(result.current.user.inCorrectSubQuestion[0].id).toBe(2);
    });

    it("should do nothing when ID does not exist", () => {
      const { result } = renderHook(() => useUserStore());

      const question = { id: 1, question: "Q1" };

      act(() => {
        result.current.addInCorrectSubQuestion(question);
      });

      act(() => {
        result.current.removeInCorrectSubQuestion(999);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
    });

    it("should remove all matching IDs", () => {
      const { result } = renderHook(() => useUserStore());

      const questions = [
        { id: 1, question: "Q1" },
        { id: 2, question: "Q2" },
        { id: 3, question: "Q3" },
      ];

      act(() => {
        questions.forEach((q) => result.current.addInCorrectSubQuestion(q));
      });

      act(() => {
        result.current.removeInCorrectSubQuestion(2);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(2);
      expect(result.current.user.inCorrectSubQuestion.map((q) => q.id)).toEqual([1, 3]);
    });

    it("should handle removing from empty array", () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.removeInCorrectSubQuestion(1);
      });

      expect(result.current.user.inCorrectSubQuestion).toEqual([]);
    });
  });

  describe("addInCorrectMultipleChoiceQuestion", () => {
    it("should add a multiple choice question", () => {
      const { result } = renderHook(() => useUserStore());

      const question = {
        id: 1,
        question: "What is === ?",
        options: [],
        answerString: "Strict equality",
      };

      act(() => {
        result.current.addInCorrectMultipleChoiceQuestion(question);
      });

      expect(result.current.user.inCorrectMultipleChoiceQuestion).toHaveLength(1);
    });

    it("should prevent duplicate multiple choice questions", () => {
      const { result } = renderHook(() => useUserStore());

      const question = {
        id: 1,
        question: "What is === ?",
        options: [],
        answerString: "Strict equality",
      };

      act(() => {
        result.current.addInCorrectMultipleChoiceQuestion(question);
        result.current.addInCorrectMultipleChoiceQuestion(question);
      });

      expect(result.current.user.inCorrectMultipleChoiceQuestion).toHaveLength(1);
    });

    it("should allow multiple choice questions with different IDs", () => {
      const { result } = renderHook(() => useUserStore());

      const question1 = { id: 1, question: "Q1", options: [], answerString: "A1" };
      const question2 = { id: 2, question: "Q2", options: [], answerString: "A2" };

      act(() => {
        result.current.addInCorrectMultipleChoiceQuestion(question1);
        result.current.addInCorrectMultipleChoiceQuestion(question2);
      });

      expect(result.current.user.inCorrectMultipleChoiceQuestion).toHaveLength(2);
    });

    it("should preserve question structure with options", () => {
      const { result } = renderHook(() => useUserStore());

      const question = {
        id: 1,
        question: "Test question",
        options: [
          { id: 1, label: "Option 1", answerBoolean: true },
          { id: 2, label: "Option 2", answerBoolean: false },
        ],
        answerString: "Explanation",
      };

      act(() => {
        result.current.addInCorrectMultipleChoiceQuestion(question);
      });

      expect(result.current.user.inCorrectMultipleChoiceQuestion[0]).toEqual(question);
    });
  });

  describe("removeInCorrectMultipleChoiceQuestion", () => {
    it("should remove a multiple choice question by ID", () => {
      const { result } = renderHook(() => useUserStore());

      const question1 = { id: 1, question: "Q1", options: [], answerString: "A1" };
      const question2 = { id: 2, question: "Q2", options: [], answerString: "A2" };

      act(() => {
        result.current.addInCorrectMultipleChoiceQuestion(question1);
        result.current.addInCorrectMultipleChoiceQuestion(question2);
      });

      act(() => {
        result.current.removeInCorrectMultipleChoiceQuestion(1);
      });

      expect(result.current.user.inCorrectMultipleChoiceQuestion).toHaveLength(1);
      expect(result.current.user.inCorrectMultipleChoiceQuestion[0].id).toBe(2);
    });

    it("should do nothing when ID does not exist", () => {
      const { result } = renderHook(() => useUserStore());

      const question = { id: 1, question: "Q1", options: [], answerString: "A1" };

      act(() => {
        result.current.addInCorrectMultipleChoiceQuestion(question);
      });

      act(() => {
        result.current.removeInCorrectMultipleChoiceQuestion(999);
      });

      expect(result.current.user.inCorrectMultipleChoiceQuestion).toHaveLength(1);
    });
  });

  describe("persistUserToDB", () => {
    it("should call indexedDBService.saveUserData", async () => {
      const { result } = renderHook(() => useUserStore());

      const question = { id: 1, question: "Q1" };

      act(() => {
        result.current.addInCorrectSubQuestion(question);
      });

      await act(async () => {
        await result.current.persistUserToDB();
      });

      expect(indexedDBService.saveUserData).toHaveBeenCalledWith({
        inCorrectSubQuestion: [question],
        inCorrectMultipleChoiceQuestion: [],
      });
    });

    it("should persist current user state", async () => {
      const { result } = renderHook(() => useUserStore());

      const subQuestion = { id: 1, question: "Sub Q" };
      const mcQuestion = { id: 2, question: "MC Q", options: [], answerString: "A" };

      act(() => {
        result.current.addInCorrectSubQuestion(subQuestion);
        result.current.addInCorrectMultipleChoiceQuestion(mcQuestion);
      });

      await act(async () => {
        await result.current.persistUserToDB();
      });

      expect(indexedDBService.saveUserData).toHaveBeenCalledWith({
        inCorrectSubQuestion: [subQuestion],
        inCorrectMultipleChoiceQuestion: [mcQuestion],
      });
    });

    it("should persist empty state", async () => {
      const { result } = renderHook(() => useUserStore());

      await act(async () => {
        await result.current.persistUserToDB();
      });

      expect(indexedDBService.saveUserData).toHaveBeenCalledWith({
        inCorrectSubQuestion: [],
        inCorrectMultipleChoiceQuestion: [],
      });
    });
  });

  describe("hydrateUserFromDB", () => {
    it("should load data from IndexedDB", async () => {
      const mockData = {
        inCorrectSubQuestion: [{ id: 1, question: "Q1" }],
        inCorrectMultipleChoiceQuestion: [],
      };

      vi.mocked(indexedDBService.loadUserData).mockResolvedValueOnce(mockData);

      const { result } = renderHook(() => useUserStore());

      await act(async () => {
        await result.current.hydrateUserFromDB();
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
      expect(result.current.user.inCorrectSubQuestion[0].id).toBe(1);
    });

    it("should not update state when no data in DB", async () => {
      vi.mocked(indexedDBService.loadUserData).mockResolvedValueOnce(null);

      const { result } = renderHook(() => useUserStore());

      await act(async () => {
        await result.current.hydrateUserFromDB();
      });

      expect(result.current.user.inCorrectSubQuestion).toEqual([]);
    });

    it("should replace existing state with DB data", async () => {
      const { result } = renderHook(() => useUserStore());

      // Add some initial data
      act(() => {
        result.current.addInCorrectSubQuestion({ id: 1, question: "Initial" });
      });

      const mockData = {
        inCorrectSubQuestion: [{ id: 2, question: "From DB" }],
        inCorrectMultipleChoiceQuestion: [],
      };

      vi.mocked(indexedDBService.loadUserData).mockResolvedValueOnce(mockData);

      await act(async () => {
        await result.current.hydrateUserFromDB();
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
      expect(result.current.user.inCorrectSubQuestion[0].id).toBe(2);
    });

    it("should load both question types from DB", async () => {
      const mockData = {
        inCorrectSubQuestion: [{ id: 1, question: "Sub" }],
        inCorrectMultipleChoiceQuestion: [{ id: 2, question: "MC", options: [], answerString: "A" }],
      };

      vi.mocked(indexedDBService.loadUserData).mockResolvedValueOnce(mockData);

      const { result } = renderHook(() => useUserStore());

      await act(async () => {
        await result.current.hydrateUserFromDB();
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
      expect(result.current.user.inCorrectMultipleChoiceQuestion).toHaveLength(1);
    });
  });

  describe("setInCorrectSubQuestion", () => {
    it("should directly set subjective questions array", () => {
      const { result } = renderHook(() => useUserStore());

      const questions = [
        { id: 1, question: "Q1" },
        { id: 2, question: "Q2" },
      ];

      act(() => {
        result.current.setInCorrectSubQuestion(questions);
      });

      expect(result.current.user.inCorrectSubQuestion).toEqual(questions);
    });

    it("should replace existing array", () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.addInCorrectSubQuestion({ id: 1, question: "Old" });
      });

      const newQuestions = [
        { id: 2, question: "New1" },
        { id: 3, question: "New2" },
      ];

      act(() => {
        result.current.setInCorrectSubQuestion(newQuestions);
      });

      expect(result.current.user.inCorrectSubQuestion).toEqual(newQuestions);
      expect(result.current.user.inCorrectSubQuestion).toHaveLength(2);
    });

    it("should allow setting empty array", () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.addInCorrectSubQuestion({ id: 1, question: "Q" });
      });

      act(() => {
        result.current.setInCorrectSubQuestion([]);
      });

      expect(result.current.user.inCorrectSubQuestion).toEqual([]);
    });
  });

  describe("setInCorrectMultipleChoiceQuestion", () => {
    it("should directly set multiple choice questions array", () => {
      const { result } = renderHook(() => useUserStore());

      const questions = [{ id: 1, question: "Q1", options: [], answerString: "A1" }];

      act(() => {
        result.current.setInCorrectMultipleChoiceQuestion(questions);
      });

      expect(result.current.user.inCorrectMultipleChoiceQuestion).toEqual(questions);
    });

    it("should replace existing array", () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.addInCorrectMultipleChoiceQuestion({
          id: 1,
          question: "Old",
          options: [],
          answerString: "A",
        });
      });

      const newQuestions = [{ id: 2, question: "New", options: [], answerString: "B" }];

      act(() => {
        result.current.setInCorrectMultipleChoiceQuestion(newQuestions);
      });

      expect(result.current.user.inCorrectMultipleChoiceQuestion).toEqual(newQuestions);
    });
  });

  describe("Integration Scenarios", () => {
    it("should handle full user flow: add → persist → clear → hydrate", async () => {
      const { result } = renderHook(() => useUserStore());

      // Add incorrect questions
      const subQuestion = { id: 1, question: "Closure" };
      act(() => {
        result.current.addInCorrectSubQuestion(subQuestion);
      });

      // Persist to DB
      await act(async () => {
        await result.current.persistUserToDB();
      });

      expect(indexedDBService.saveUserData).toHaveBeenCalled();

      // Clear store
      act(() => {
        result.current.setInCorrectSubQuestion([]);
      });

      expect(result.current.user.inCorrectSubQuestion).toEqual([]);

      // Hydrate from DB
      vi.mocked(indexedDBService.loadUserData).mockResolvedValueOnce({
        inCorrectSubQuestion: [subQuestion],
        inCorrectMultipleChoiceQuestion: [],
      });

      await act(async () => {
        await result.current.hydrateUserFromDB();
      });

      expect(result.current.user.inCorrectSubQuestion).toEqual([subQuestion]);
    });

    it("should handle removing correctly answered question", () => {
      const { result } = renderHook(() => useUserStore());

      // User gets question wrong
      const question = { id: 1, question: "What is hoisting?" };
      act(() => {
        result.current.addInCorrectSubQuestion(question);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);

      // User answers it correctly in review
      act(() => {
        result.current.removeInCorrectSubQuestion(1);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(0);
    });

    it("should maintain separate lists for different question types", () => {
      const { result } = renderHook(() => useUserStore());

      const subQuestion = { id: 1, question: "Subjective Q" };
      const mcQuestion = { id: 1, question: "MC Q", options: [], answerString: "A" };

      act(() => {
        result.current.addInCorrectSubQuestion(subQuestion);
        result.current.addInCorrectMultipleChoiceQuestion(mcQuestion);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(1);
      expect(result.current.user.inCorrectMultipleChoiceQuestion).toHaveLength(1);

      act(() => {
        result.current.removeInCorrectSubQuestion(1);
      });

      expect(result.current.user.inCorrectSubQuestion).toHaveLength(0);
      expect(result.current.user.inCorrectMultipleChoiceQuestion).toHaveLength(1);
    });
  });

  describe("State Persistence Across Instances", () => {
    it("should share state between multiple hook instances", () => {
      const { result: result1 } = renderHook(() => useUserStore());
      const { result: result2 } = renderHook(() => useUserStore());

      const question = { id: 1, question: "Shared Q" };

      act(() => {
        result1.current.addInCorrectSubQuestion(question);
      });

      expect(result2.current.user.inCorrectSubQuestion).toHaveLength(1);
      expect(result2.current.user.inCorrectSubQuestion[0]).toEqual(question);
    });
  });
});
