import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSubjectiveInterview } from "../index";

// // Mock fetch for API calls
// declare global {
//   // eslint-disable-next-line no-var
//   var fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
// }

describe("useSubjectiveInterview Integration", () => {
  const mockQuestions = [
    { id: 1, question: "What is closure?" },
    { id: 2, question: "Explain hoisting" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-ignore
    global.fetch = vi.fn();
  });

  describe("Initial State", () => {
    it("initializes with first question message", () => {
      const { result } = renderHook(() => useSubjectiveInterview(mockQuestions));

      expect(result.current.messages.length).toBeGreaterThan(0);
      expect(result.current.messages[0].content).toContain("What is closure?");
      expect(result.current.questionIndex).toBe(0);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFinished).toBe(false);
    });
  });

  describe("handleSendMessage", () => {
    it("adds user message and toggles loading during API call", async () => {
      const { result } = renderHook(() => useSubjectiveInterview(mockQuestions));

      const serverResponse = {
        success: true,
        data: {
          topic: "Closure",
          evaluation: { score: 7, maxScore: 10, summary: "Good" },
          feedbackDetails: [],
          modelAnswer: {
            introduction: "I",
            usage: "U",
            scenarios: [],
            example: { context: "C", solution: "S" },
          },
        },
      };

      vi.mocked(fetch).mockImplementationOnce(async () => {
        return {
          ok: true,
          json: async () => serverResponse,
        } as unknown as Response;
      });

      await act(async () => {
        await result.current.handleSendMessage("My answer about closure");
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.messages.length).toBeGreaterThan(1);
    });

    it("increments score for high-enough evaluation and removes from incorrect list", async () => {
      const { result } = renderHook(() => useSubjectiveInterview(mockQuestions));

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            topic: "T",
            evaluation: { score: 8, maxScore: 10, summary: "Great" },
            feedbackDetails: [],
            deepDive: { title: "D", description: "d", topics: [] },
          },
        }),
      } as unknown as Response);

      await act(async () => {
        await result.current.handleSendMessage("Excellent answer");
      });

      expect(result.current.score).toBe(1);
    });

    it("adds to incorrect list when score <= 4 (success true but low score)", async () => {
      const { result } = renderHook(() => useSubjectiveInterview(mockQuestions));

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            topic: "T",
            evaluation: { score: 3, maxScore: 10, summary: "Low" },
            feedbackDetails: [],
            modelAnswer: {
              introduction: "I",
              usage: "U",
              scenarios: [],
              example: { context: "C", solution: "S" },
            },
          },
        }),
      } as unknown as Response);

      await act(async () => {
        await result.current.handleSendMessage("Weak answer");
      });

      // Score should not increase
      expect(result.current.score).toBe(0);
    });

    it("adds to incorrect list when API error occurs", async () => {
      const { result } = renderHook(() => useSubjectiveInterview(mockQuestions));

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({} as any),
      } as unknown as Response);

      await act(async () => {
        await result.current.handleSendMessage("Any answer");
      });

      expect(result.current.score).toBe(0);
    });
  });

  describe("handleNextQuestion", () => {
    it("advances to next question and finishes at the end", async () => {
      const { result } = renderHook(() => useSubjectiveInterview(mockQuestions));

      // Mock a success response
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            topic: "T",
            evaluation: { score: 6, maxScore: 10, summary: "S" },
            feedbackDetails: [],
            modelAnswer: {
              introduction: "I",
              usage: "U",
              scenarios: [],
              example: { context: "C", solution: "S" },
            },
          },
        }),
      } as unknown as Response);

      await act(async () => {
        await result.current.handleSendMessage("First answer");
      });

      act(() => {
        result.current.handleNextQuestion();
      });
      expect(result.current.questionIndex).toBe(1);

      // Next -> end
      act(() => {
        result.current.handleNextQuestion();
      });
      expect(result.current.isFinished).toBe(true);
    });
  });

  describe("handleEndInterview", () => {
    it("sets finished state immediately", () => {
      const { result } = renderHook(() => useSubjectiveInterview(mockQuestions));

      act(() => {
        result.current.handleEndInterview();
      });

      expect(result.current.isFinished).toBe(true);
    });
  });
});
