import React from "react";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SubjectiveQuestion } from "../../model/type";
import * as useSubjectiveInterviewModule from "../../model/hooks/useSubjectiveInterview";
import * as useScrollToBottomModule from "../../model/hooks/useScrollToBottom";

// Mock child components (must be declared before importing the module under test)
vi.mock("../../../../../features/chat/chatMessage/ui/ChatMessage", () => ({
  default: ({ message, onNext, onEnd, onAddReview, showNext, isLoading }: any) => (
    <div data-testid={`chat-message-${message.id}`}>
      <div>{message.content}</div>
      <div>Role: {message.role}</div>
      {onNext && showNext && <button onClick={onNext}>Next Question</button>}
      {onEnd && <button onClick={onEnd}>End Interview</button>}
      {onAddReview && <button onClick={onAddReview}>Add Review</button>}
      {isLoading && <span>Loading...</span>}
    </div>
  ),
}));

vi.mock("../../../../../features/chat/chatInput/ui/ChatInput", () => ({
  default: ({ onSendMessage, isLoading }: any) => (
    <div data-testid="chat-input">
      <input placeholder="Type message" onChange={(e) => {}} disabled={isLoading} />
      <button onClick={() => onSendMessage("test")} disabled={isLoading}>
        Send
      </button>
    </div>
  ),
}));

// Dynamically import the module under test after mocks are registered
let SubjectiveInterview: any;
beforeAll(async () => {
  SubjectiveInterview = (await import("../index")).default;
});

describe("SubjectiveInterview Widget", () => {
  const mockQuestions: SubjectiveQuestion[] = [
    { id: 1, question: "Explain closures" },
    { id: 2, question: "What is hoisting?" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementation
    vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
      messages: [{ id: 1, role: "assistant", content: "Explain closures" }],
      questionIndex: 0,
      isLoading: false,
      handleSendMessage: vi.fn(),
      handleNextQuestion: vi.fn(),
      handleEndInterview: vi.fn(),
      handleAddReview: vi.fn(),
      score: 0,
      totalQuestions: 2,
      isFinished: false,
    });

    vi.spyOn(useScrollToBottomModule, "useScrollToBottom").mockReturnValue(undefined);
  });

  describe("Initial Render", () => {
    it("should render chat messages", () => {
      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      expect(screen.getByTestId("chat-message-1")).toBeInTheDocument();
    });

    it("should render chat input", () => {
      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      expect(screen.getByTestId("chat-input")).toBeInTheDocument();
    });

    it("should render messages with correct content", () => {
      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      expect(screen.getByText("Explain closures")).toBeInTheDocument();
    });

    it("should call useScrollToBottom hook", () => {
      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      expect(useScrollToBottomModule.useScrollToBottom).toHaveBeenCalled();
    });
  });

  describe("Message Rendering", () => {
    it("should render multiple messages", () => {
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [
          { id: 1, role: "assistant", content: "Question 1" },
          { id: 2, role: "user", content: "My answer" },
          { id: 3, role: "assistant", content: "Feedback" },
        ],
        questionIndex: 0,
        isLoading: false,
        handleSendMessage: vi.fn(),
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
        score: 0,
        totalQuestions: 2,
        isFinished: false,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      expect(screen.getByTestId("chat-message-1")).toBeInTheDocument();
      expect(screen.getByTestId("chat-message-2")).toBeInTheDocument();
      expect(screen.getByTestId("chat-message-3")).toBeInTheDocument();
    });

    it("should render messages in correct order", () => {
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [
          { id: 1, role: "assistant", content: "First" },
          { id: 2, role: "user", content: "Second" },
        ],
        questionIndex: 0,
        isLoading: false,
        handleSendMessage: vi.fn(),
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
        score: 0,
        totalQuestions: 2,
        isFinished: false,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      const messages = screen.getAllByText(/First|Second/);
      expect(messages[0]).toHaveTextContent("First");
      expect(messages[1]).toHaveTextContent("Second");
    });
  });

  describe("User Interaction", () => {
    it("should call handleSendMessage on message send", () => {
      const handleSendMessage = vi.fn();
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [{ id: 1, role: "assistant", content: "Question" }],
        questionIndex: 0,
        isLoading: false,
        handleSendMessage,
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
        score: 0,
        totalQuestions: 2,
        isFinished: false,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      fireEvent.change(screen.getByRole("textbox"), { target: { value: "test" } });
      screen.getByText("Send").click();

      expect(handleSendMessage).toHaveBeenCalledWith("test");
    });

    it("should call handleNextQuestion when next button clicked", () => {
      const handleNextQuestion = vi.fn();
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [
          { id: 1, role: "assistant", content: "Question" },
          { id: 2, role: "system", content: "" },
        ],
        questionIndex: 0,
        isLoading: false,
        handleSendMessage: vi.fn(),
        handleNextQuestion,
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
        score: 0,
        totalQuestions: 2,
        isFinished: false,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      screen.getByText("Next Question").click();

      expect(handleNextQuestion).toHaveBeenCalled();
    });

    it("should call handleEndInterview when end button clicked", () => {
      const handleEndInterview = vi.fn();
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [
          { id: 1, role: "assistant", content: "Last question" },
          { id: 2, role: "system", content: "" },
        ],
        questionIndex: 1,
        isLoading: false,
        handleSendMessage: vi.fn(),
        handleNextQuestion: vi.fn(),
        handleEndInterview,
        handleAddReview: vi.fn(),
        score: 0,
        totalQuestions: 2,
        isFinished: false,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      screen.getByText("End Interview").click();

      expect(handleEndInterview).toHaveBeenCalled();
    });

    it("should call handleAddReview when add review button clicked", () => {
      const handleAddReview = vi.fn();
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [
          { id: 1, role: "assistant", content: "Feedback" },
          { id: 2, role: "system", content: "" },
        ],
        questionIndex: 0,
        isLoading: false,
        handleSendMessage: vi.fn(),
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview,
        score: 0,
        totalQuestions: 2,
        isFinished: false,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      screen.getByText("Add Review").click();

      expect(handleAddReview).toHaveBeenCalled();
    });
  });

  describe("Loading State", () => {
    it("should pass loading state to ChatInput", () => {
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [{ id: 1, role: "assistant", content: "Question" }],
        questionIndex: 0,
        isLoading: true,
        handleSendMessage: vi.fn(),
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
        score: 0,
        totalQuestions: 2,
        isFinished: false,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      const sendButton = screen.getByRole("button", { name: /send message/i });
      expect(sendButton).toBeDisabled();
    });

    it("should pass loading state to ChatMessage", () => {
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [{ id: 1, role: "assistant", content: "Loading..." }],
        questionIndex: 0,
        isLoading: true,
        handleSendMessage: vi.fn(),
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
        score: 0,
        totalQuestions: 2,
        isFinished: false,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("should show next button when not on last question", () => {
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [
          { id: 1, role: "assistant", content: "Question" },
          { id: 2, role: "system", content: "" },
        ],
        questionIndex: 0,
        isLoading: false,
        handleSendMessage: vi.fn(),
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
        score: 0,
        totalQuestions: 2,
        isFinished: false,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      expect(screen.getByText("Next Question")).toBeInTheDocument();
    });

    it("should not show next button on last question", () => {
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [
          { id: 1, role: "assistant", content: "Last question" },
          { id: 2, role: "system", content: "" },
        ],
        questionIndex: 1,
        isLoading: false,
        handleSendMessage: vi.fn(),
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
        score: 0,
        totalQuestions: 2,
        isFinished: false,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      expect(screen.queryByText("Next Question")).not.toBeInTheDocument();
    });
  });

  describe("Completion State", () => {
    it("should show completion UI when finished", () => {
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [],
        questionIndex: 2,
        isLoading: false,
        handleSendMessage: vi.fn(),
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
        score: 8,
        totalQuestions: 2,
        isFinished: true,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      expect(screen.getByText("면접 완료!")).toBeInTheDocument();
      expect(screen.getByText("총 점수: 8 / 2")).toBeInTheDocument();
    });

    it("should not render chat input when finished", () => {
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [],
        questionIndex: 2,
        isLoading: false,
        handleSendMessage: vi.fn(),
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
        score: 10,
        totalQuestions: 2,
        isFinished: true,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      expect(screen.queryByTestId("chat-input")).not.toBeInTheDocument();
    });

    it("should display correct final score", () => {
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [],
        questionIndex: 2,
        isLoading: false,
        handleSendMessage: vi.fn(),
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
        score: 15,
        totalQuestions: 2,
        isFinished: true,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      expect(screen.getByText(/15/)).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty messages array", () => {
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [],
        questionIndex: 0,
        isLoading: false,
        handleSendMessage: vi.fn(),
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
        score: 0,
        totalQuestions: 2,
        isFinished: false,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      expect(screen.getByTestId("chat-input")).toBeInTheDocument();
    });

    it("should handle single question", () => {
      const singleQuestion = [mockQuestions[0]];
      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [{ id: 1, role: "assistant", content: "Only question" }],
        questionIndex: 0,
        isLoading: false,
        handleSendMessage: vi.fn(),
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
        score: 0,
        totalQuestions: 1,
        isFinished: false,
      });

      render(<SubjectiveInterview questionAnswer={singleQuestion} />);
      expect(screen.getByText("Only question")).toBeInTheDocument();
    });
  });

  describe("Props Propagation", () => {
    it("should pass all required props to ChatMessage", () => {
      const handlers = {
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
      };

      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [
          { id: 1, role: "assistant", content: "Test" },
          { id: 2, role: "system", content: "" },
        ],
        questionIndex: 0,
        isLoading: false,
        handleSendMessage: vi.fn(),
        ...handlers,
        score: 0,
        totalQuestions: 2,
        isFinished: false,
      });

      render(<SubjectiveInterview questionAnswer={mockQuestions} />);

      // Verify handlers are accessible in ChatMessage
      expect(screen.getByText("Next Question")).toBeInTheDocument();
      expect(screen.getByText("End Interview")).toBeInTheDocument();
      expect(screen.getByText("Add Review")).toBeInTheDocument();
    });

    it("should pass questionAnswer to useSubjectiveInterview", () => {
      render(<SubjectiveInterview questionAnswer={mockQuestions} />);
      expect(useSubjectiveInterviewModule.useSubjectiveInterview).toHaveBeenCalledWith(mockQuestions, false);
    });
  });

  describe("Scroll Behavior", () => {
    it("should call useScrollToBottom with messages and ref", () => {
      render(<SubjectiveInterview questionAnswer={mockQuestions} />);

      expect(useScrollToBottomModule.useScrollToBottom).toHaveBeenCalled();
      const callArgs = (useScrollToBottomModule.useScrollToBottom as any).mock.calls[0];
      expect(callArgs[0]).toEqual([{ id: 1, role: "assistant", content: "Explain closures" }]);
      expect(callArgs[1]).toBeDefined();
    });

    it("should update scroll when messages change", () => {
      const { rerender } = render(<SubjectiveInterview questionAnswer={mockQuestions} />);

      vi.spyOn(useSubjectiveInterviewModule, "useSubjectiveInterview").mockReturnValue({
        messages: [
          { id: 1, role: "assistant", content: "Question" },
          { id: 2, role: "user", content: "Answer" },
        ],
        questionIndex: 0,
        isLoading: false,
        handleSendMessage: vi.fn(),
        handleNextQuestion: vi.fn(),
        handleEndInterview: vi.fn(),
        handleAddReview: vi.fn(),
        score: 0,
        totalQuestions: 2,
        isFinished: false,
      });

      rerender(<SubjectiveInterview questionAnswer={mockQuestions} />);
      expect(useScrollToBottomModule.useScrollToBottom).toHaveBeenCalledTimes(2);
    });
  });
});
