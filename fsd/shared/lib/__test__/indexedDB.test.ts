import { describe, it, expect, beforeEach, vi } from "vitest";
import { indexedDBService } from "@/fsd/shared/lib/indexedDB";
import type { UserData } from "@/fsd/entities/user/types";

async function clearStore() {
  const db = await indexedDBService.openDB();
  const tx = db.transaction(["user"], "readwrite");
  tx.objectStore("user").clear();
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Transaction error"));
    tx.onabort = () => reject(tx.error ?? new Error("Transaction aborted"));
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
      inCorrectCustomQuestion: [],
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
      tx.onerror = () => reject(tx.error ?? new Error("Transaction error"));
      tx.onabort = () => reject(tx.error ?? new Error("Transaction aborted"));
    });

    const loaded = await indexedDBService.loadUserData();
    expect(loaded).toEqual({
      inCorrectSubQuestion: [],
      inCorrectMultipleChoiceQuestion: [],
      inCorrectCustomQuestion: [],
    });
  });

  it("saveUserData overwrites previous record", async () => {
    await indexedDBService.saveUserData({
      inCorrectSubQuestion: [{ id: 1, question: "S1" }],
      inCorrectMultipleChoiceQuestion: [],
      inCorrectCustomQuestion: [],
    });

    await indexedDBService.saveUserData({
      inCorrectSubQuestion: [],
      inCorrectMultipleChoiceQuestion: [{ id: 2, question: "M2", answerString: "B", options: [] }],
      inCorrectCustomQuestion: [],
    });

    const loaded = await indexedDBService.loadUserData();
    expect(loaded).toEqual({
      inCorrectSubQuestion: [],
      inCorrectMultipleChoiceQuestion: [{ id: 2, question: "M2", answerString: "B", options: [] }],
      inCorrectCustomQuestion: [],
    });
  });

  it("openDB rejects when window.indexedDB is not supported", async () => {
    indexedDBService.__resetForTests(); // reset internal cache

    const win = window as unknown as { indexedDB?: IDBFactory };
    const original = win.indexedDB;
    win.indexedDB = undefined;

    await expect(indexedDBService.openDB()).rejects.toThrow("IndexedDB is not supported");

    win.indexedDB = original;
  });

  it("openDB propagates request.onerror", async () => {
    indexedDBService.__resetForTests();

    const win = window as unknown as { indexedDB?: IDBFactory };
    const original = win.indexedDB;
    const openMock = vi.fn().mockImplementation(() => {
      const req: Partial<IDBOpenDBRequest> = {};
      setTimeout(() => {
        if (typeof req.onerror === "function") req.onerror(new Event("error"));
      }, 0);
      return req as IDBOpenDBRequest;
    });
    win.indexedDB = { open: openMock as unknown as typeof indexedDB.open } as IDBFactory;

    await expect(indexedDBService.openDB()).rejects.toBeInstanceOf(Error);

    win.indexedDB = original;
  });
});
