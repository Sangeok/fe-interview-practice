import { describe, it, expect, beforeEach, vi } from "vitest";
import { indexedDBService } from "@/fsd/shared/lib/indexedDB";
import type { UserData } from "@/fsd/entities/user/types";

async function clearStore() {
  const db = await indexedDBService.openDB();
  const tx = db.transaction(["user"], "readwrite");
  tx.objectStore("user").clear();
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error as any);
    tx.onabort = () => reject(tx.error as any);
  });
}

describe("indexedDBService", () => {
  beforeEach(async () => {
    await clearStore();
  });

  it('openDB creates "user" store with indices', async () => {
    const db = await indexedDBService.openDB();
    expect(db.objectStoreNames.contains("user")).toBe(true);

    const tx = db.transaction(["user"], "readonly");
    const store = tx.objectStore("user");
    expect(store.indexNames.contains("name")).toBe(true);
    expect(store.indexNames.contains("updatedAt")).toBe(true);
  });

  it("loadUserData returns null when no record exists", async () => {
    const data = await indexedDBService.loadUserData();
    expect(data).toBeNull();
  });

  it("saveUserData then loadUserData returns persisted arrays only", async () => {
    const sample: UserData = {
      inCorrectSubQuestion: [{ id: 1, question: "S1" }],
      inCorrectMultipleChoiceQuestion: [
        {
          id: 10,
          question: "M1",
          answerString: "A",
          options: [
            { id: 1, label: "A", answerBoolean: true },
            { id: 2, label: "B", answerBoolean: false },
          ],
        },
      ],
    };

    await indexedDBService.saveUserData(sample);
    const loaded = await indexedDBService.loadUserData();

    expect(loaded).toEqual(sample);
  });

  it("loadUserData defaults to [] when fields are missing", async () => {
    const db = await indexedDBService.openDB();
    const tx = db.transaction(["user"], "readwrite");
    tx.objectStore("user").put({ id: "user" });
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error as any);
      tx.onabort = () => reject(tx.error as any);
    });

    const loaded = await indexedDBService.loadUserData();
    expect(loaded).toEqual({
      inCorrectSubQuestion: [],
      inCorrectMultipleChoiceQuestion: [],
    });
  });

  it("saveUserData overwrites previous record", async () => {
    await indexedDBService.saveUserData({
      inCorrectSubQuestion: [{ id: 1, question: "S1" }],
      inCorrectMultipleChoiceQuestion: [],
    });

    await indexedDBService.saveUserData({
      inCorrectSubQuestion: [],
      inCorrectMultipleChoiceQuestion: [{ id: 2, question: "M2", answerString: "B", options: [] }],
    });

    const loaded = await indexedDBService.loadUserData();
    expect(loaded).toEqual({
      inCorrectSubQuestion: [],
      inCorrectMultipleChoiceQuestion: [{ id: 2, question: "M2", answerString: "B", options: [] }],
    });
  });

  it("openDB rejects when window.indexedDB is not supported", async () => {
    (indexedDBService as any).db = null; // reset internal cache

    const original = (window as any).indexedDB;
    // @ts-ignore
    (window as any).indexedDB = undefined;

    await expect(indexedDBService.openDB()).rejects.toThrow("IndexedDB is not supported");

    (window as any).indexedDB = original;
  });

  it("openDB propagates request.onerror", async () => {
    (indexedDBService as any).db = null;

    const original = (window as any).indexedDB;
    const openMock = vi.fn().mockImplementation(() => {
      const req: any = {};
      setTimeout(() => {
        if (typeof req.onerror === "function") req.onerror(new Event("error"));
      }, 0);
      return req;
    });
    (window as any).indexedDB = { open: openMock } as any;

    await expect(indexedDBService.openDB()).rejects.toBeInstanceOf(Error);

    (window as any).indexedDB = original;
  });
});
