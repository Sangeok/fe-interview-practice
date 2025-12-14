import { describe, it, expect, beforeEach } from "vitest";
import { customQuestionDB } from "../customQuestionDB";
import { CustomSubjectiveQuestion } from "../../model/type";
import { indexedDBService } from "@/fsd/shared/lib/indexedDB";

async function clearStore() {
  const db = await indexedDBService.openDB();
  const tx = db.transaction(["customQuestions"], "readwrite");
  tx.objectStore("customQuestions").clear();
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Transaction error"));
    tx.onabort = () => reject(tx.error ?? new Error("Transaction aborted"));
  });
}

describe("customQuestionDB", () => {
  beforeEach(async () => {
    await clearStore();
  });

  it('openDB creates "customQuestions" store with indices', async () => {
    const db = await indexedDBService.openDB();
    expect(db.objectStoreNames.contains("customQuestions")).toBe(true);

    const tx = db.transaction(["customQuestions"], "readonly");
    const store = tx.objectStore("customQuestions");
    expect(store.indexNames.contains("technology")).toBe(true);
    expect(store.indexNames.contains("createdAt")).toBe(true);
  });

  it("loadQuestions returns empty array when no records exist", async () => {
    const questions = await customQuestionDB.loadQuestions();
    expect(questions).toEqual([]);
  });

  it("saveQuestion then loadQuestions returns saved question", async () => {
    const question: CustomSubjectiveQuestion = {
      id: "test-id-1",
      technology: "javascript",
      question: "What is closure?",
      modelAnswer: "A closure is...",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await customQuestionDB.saveQuestion(question);
    const loaded = await customQuestionDB.loadQuestions();

    expect(loaded).toEqual([question]);
  });

  it("loadQuestions filters by technology", async () => {
    const q1: CustomSubjectiveQuestion = {
      id: "q1",
      technology: "javascript",
      question: "JS Question",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const q2: CustomSubjectiveQuestion = {
      id: "q2",
      technology: "react",
      question: "React Question",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const q3: CustomSubjectiveQuestion = {
      id: "q3",
      technology: "javascript",
      question: "Another JS Question",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await customQuestionDB.saveQuestion(q1);
    await customQuestionDB.saveQuestion(q2);
    await customQuestionDB.saveQuestion(q3);

    const jsQuestions = await customQuestionDB.loadQuestions({
      technology: "javascript",
    });
    const reactQuestions = await customQuestionDB.loadQuestions({
      technology: "react",
    });

    expect(jsQuestions).toHaveLength(2);
    expect(jsQuestions).toEqual(expect.arrayContaining([q1, q3]));
    expect(reactQuestions).toHaveLength(1);
    expect(reactQuestions).toEqual([q2]);
  });

  it("updateQuestion modifies existing question", async () => {
    const original: CustomSubjectiveQuestion = {
      id: "update-test",
      technology: "typescript",
      question: "Original question",
      modelAnswer: "Original answer",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await customQuestionDB.saveQuestion(original);

    await customQuestionDB.updateQuestion("update-test", {
      question: "Updated question",
      modelAnswer: "Updated answer",
    });

    const loaded = await customQuestionDB.loadQuestions();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].question).toBe("Updated question");
    expect(loaded[0].modelAnswer).toBe("Updated answer");
    expect(loaded[0].updatedAt).toBeGreaterThanOrEqual(original.updatedAt);
  });

  it("updateQuestion rejects when question not found", async () => {
    await expect(
      customQuestionDB.updateQuestion("non-existent-id", {
        question: "New question",
      })
    ).rejects.toThrow("Question with id non-existent-id not found");
  });

  it("deleteQuestion removes question", async () => {
    const q1: CustomSubjectiveQuestion = {
      id: "delete-test-1",
      technology: "javascript",
      question: "Question 1",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const q2: CustomSubjectiveQuestion = {
      id: "delete-test-2",
      technology: "react",
      question: "Question 2",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await customQuestionDB.saveQuestion(q1);
    await customQuestionDB.saveQuestion(q2);

    await customQuestionDB.deleteQuestion("delete-test-1");

    const loaded = await customQuestionDB.loadQuestions();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].id).toBe("delete-test-2");
  });

  it("saveQuestion overwrites existing question with same id", async () => {
    const question: CustomSubjectiveQuestion = {
      id: "overwrite-test",
      technology: "javascript",
      question: "Original",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await customQuestionDB.saveQuestion(question);

    const updated: CustomSubjectiveQuestion = {
      ...question,
      question: "Overwritten",
      updatedAt: Date.now() + 1000,
    };

    await customQuestionDB.saveQuestion(updated);

    const loaded = await customQuestionDB.loadQuestions();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].question).toBe("Overwritten");
  });
});
