import { indexedDBService } from "@/fsd/shared/lib/indexedDB";
import { CustomSubjectiveQuestion, Technology } from "../model/type";

class CustomQuestionDB {
  private storeName = "customQuestions";

  async saveQuestion(question: CustomSubjectiveQuestion): Promise<void> {
    const db = await indexedDBService.openDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.put(question);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async loadQuestions(filters?: { technology?: Technology }): Promise<CustomSubjectiveQuestion[]> {
    const db = await indexedDBService.openDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);

      let request: IDBRequest<CustomSubjectiveQuestion[]>;

      if (filters?.technology) {
        const index = store.index("technology");
        request = index.getAll(filters.technology) as IDBRequest<CustomSubjectiveQuestion[]>;
      } else {
        request = store.getAll() as IDBRequest<CustomSubjectiveQuestion[]>;
      }

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async updateQuestion(id: string, updates: Partial<Pick<CustomSubjectiveQuestion, "question">>): Promise<void> {
    const db = await indexedDBService.openDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const getRequest = store.get(id);

      getRequest.onerror = () => reject(getRequest.error);
      getRequest.onsuccess = () => {
        const existing = getRequest.result as CustomSubjectiveQuestion | undefined;

        if (!existing) {
          reject(new Error(`Question with id ${id} not found`));
          return;
        }

        const updated: CustomSubjectiveQuestion = {
          ...existing,
          ...updates,
          updatedAt: Date.now(),
        };

        const putRequest = store.put(updated);
        putRequest.onerror = () => reject(putRequest.error);
        putRequest.onsuccess = () => resolve();
      };
    });
  }

  async deleteQuestion(id: string): Promise<void> {
    const db = await indexedDBService.openDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

export const customQuestionDB = new CustomQuestionDB();
