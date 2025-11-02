import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/fsd/shared/constants/AiModel", () => ({
  generateScript: {
    sendMessage: vi.fn(),
  },
}));

import { POST } from "../route";
import { generateScript } from "@/fsd/shared/constants/AiModel";

describe("POST /api/generate-interpret", () => {
  const mockSend = generateScript.sendMessage as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const buildRequest = (body: any) =>
    new Request("http://localhost/api/generate-interpret", {
      method: "POST",
      body: JSON.stringify(body),
    });

  it("returns interpretation data on success", async () => {
    const mockResponse = {
      Question: "What is ===?",
      summary: "Strict equality checks type and value",
      details: {
        theory: { title: "T", description: "D", rules: [] },
        analogy: { title: "A", scenarios: [] },
      },
    };

    mockSend.mockResolvedValueOnce({
      response: { text: () => JSON.stringify(mockResponse) },
    });

    const res = await POST(buildRequest({ tech: "JavaScript", question: "===", answer: "Answer" }) as any);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty("summary");
  });

  it("returns 400 for missing fields", async () => {
    const res = await POST(buildRequest({ tech: "React" }) as any);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it("handles AI API errors", async () => {
    mockSend.mockRejectedValueOnce(new Error("API error"));

    const res = await POST(buildRequest({ tech: "TypeScript", question: "Generics", answer: "A" }) as any);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.success).toBe(false);
    expect(String(data.error)).toContain("Failed to generate interpretation");
  });

  it("handles JSON parse errors", async () => {
    mockSend.mockResolvedValueOnce({ response: { text: () => "not-json" } });

    const res = await POST(buildRequest({ tech: "JavaScript", question: "Q", answer: "A" }) as any);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.success).toBe(false);
  });
});
