import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/fsd/shared/constants/AiModel", () => ({
  generateScript: {
    sendMessage: vi.fn(),
  },
}));

import { POST } from "../route";
import { generateScript } from "@/fsd/shared/constants/AiModel";

describe("POST /api/generate-feedback", () => {
  const mockSend = generateScript.sendMessage as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const buildRequest = (body: any) =>
    new Request("http://localhost/api/generate-feedback", {
      method: "POST",
      body: JSON.stringify(body),
    });

  describe("Success Cases", () => {
    it("returns FeedbackData for score 0-4", async () => {
      const mockResponse = {
        topic: "Closure",
        evaluation: { score: 3, maxScore: 10, summary: "Needs improvement" },
        feedbackDetails: [{ title: "부족한 부분", description: "Lacks depth", points: ["Point 1"] }],
        modelAnswer: {
          introduction: "I",
          usage: "U",
          scenarios: [],
          example: { context: "C", solution: "S" },
        },
      };

      mockSend.mockResolvedValueOnce({
        response: { text: () => JSON.stringify(mockResponse) },
      });

      const res = await POST(buildRequest({ tech: "JavaScript", question: "Q", answer: "A" }) as any);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.evaluation.score).toBeLessThanOrEqual(4);
      expect(data.data).toHaveProperty("modelAnswer");
    });

    it("returns FeedbackData for score 5-7", async () => {
      const mockResponse = {
        topic: "Closure",
        evaluation: { score: 6, maxScore: 10, summary: "Good understanding" },
        feedbackDetails: [
          { title: "좋았던 점", description: "Clear", points: ["P1"] },
          { title: "개선 사항", description: "More examples", points: ["P2"] },
        ],
        modelAnswer: {
          introduction: "I",
          usage: "U",
          scenarios: [],
          example: { context: "C", solution: "S" },
        },
      };

      mockSend.mockResolvedValueOnce({
        response: { text: () => JSON.stringify(mockResponse) },
      });

      const res = await POST(buildRequest({ tech: "JavaScript", question: "Q", answer: "A2" }) as any);
      const data = await res.json();

      expect(data.data.evaluation.score).toBeGreaterThanOrEqual(5);
      expect(data.data.evaluation.score).toBeLessThanOrEqual(7);
    });

    it("returns DeepDiveFeedbackData for score 8-10", async () => {
      const mockResponse = {
        topic: "Closure",
        evaluation: { score: 9, maxScore: 10, summary: "Excellent" },
        feedbackDetails: [{ title: "강점", description: "Great", points: ["P1"] }],
        deepDive: { title: "Deep", description: "Desc", topics: ["T1"] },
      };

      mockSend.mockResolvedValueOnce({
        response: { text: () => JSON.stringify(mockResponse) },
      });

      const res = await POST(buildRequest({ tech: "JavaScript", question: "Q", answer: "A3" }) as any);
      const data = await res.json();

      expect(data.data).toHaveProperty("deepDive");
      expect(data.data.evaluation.score).toBeGreaterThanOrEqual(8);
    });
  });

  describe("Error Handling", () => {
    it("returns 400 for missing fields", async () => {
      const res = await POST(buildRequest({ tech: "JavaScript" }) as any);
      const data = await res.json();
      expect(res.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it("handles AI API errors", async () => {
      mockSend.mockRejectedValueOnce(new Error("API quota exceeded"));

      const res = await POST(buildRequest({ tech: "JavaScript", question: "Q", answer: "A" }) as any);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.success).toBe(false);
      expect(String(data.error)).toContain("Failed to generate feedback");
    });

    it("handles JSON parse errors", async () => {
      mockSend.mockResolvedValueOnce({
        response: { text: () => "Invalid JSON" },
      });

      const res = await POST(buildRequest({ tech: "JavaScript", question: "Q", answer: "A" }) as any);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.success).toBe(false);
    });
  });
});
