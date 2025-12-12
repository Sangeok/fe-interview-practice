import { UserData } from "@/fsd/entities/user/types";

class IndexedDBService {
  private dbName = "fe-interview-practice";
  private version = 2;
  private db: IDBDatabase | null = null;

  // Test-only: clear cached DB instance. Not used in production flow.
  __resetForTests(): void {
    this.db = null;
  }

  async openDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error("IndexedDB is not supported"));
        return;
      }

      // IndexedDB 열기
      const request = window.indexedDB.open(this.dbName, this.version);

      // handle error
      request.onerror = () => {
        const error = request.error || new Error("Failed to open database");
        console.error("IndexedDB open error:", error);
        reject(error);
      };

      // handle success
      request.onsuccess = () => {
        this.db = request.result;

        // Add error handler for the database
        this.db.onerror = (event) => {
          console.error("Database error:", event);
        };

        resolve(request.result);
      };

      // handle upgrade(or create for first time)
      request.onupgradeneeded = (event) => {
        try {
          const db = (event.target as IDBOpenDBRequest).result;
          const oldVersion = event.oldVersion;

          // Version 1: user store
          if (oldVersion < 1) {
            if (!db.objectStoreNames.contains("user")) {
              const userStore = db.createObjectStore("user", {
                keyPath: "id",
              });
              userStore.createIndex("name", "name", { unique: false });
              userStore.createIndex("updatedAt", "updatedAt", {
                unique: false,
              });
            }
          }

          // Version 2: customQuestions store
          if (oldVersion < 2) {
            if (!db.objectStoreNames.contains("customQuestions")) {
              const customQStore = db.createObjectStore("customQuestions", {
                keyPath: "id",
              });
              customQStore.createIndex("technology", "technology", {
                unique: false,
              });
              customQStore.createIndex("createdAt", "createdAt", {
                unique: false,
              });
            }
          }
        } catch (error) {
          console.error("Database upgrade error:", error);
          reject(error);
        }
      };

      request.onblocked = () => {
        console.warn("Database upgrade blocked. Please close other tabs with this application.");
      };
    });
  }

  async saveUserData(userData: UserData): Promise<void> {
    const db = await this.openDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["user"], "readwrite");
      // Access the object store(projects table)
      const store = transaction.objectStore("user");

      const request = store.put({
        id: "user",
        ...userData,
        updatedAt: new Date().toISOString(),
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async loadUserData(): Promise<UserData | null> {
    const db = await this.openDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["user"], "readonly");
      const store = transaction.objectStore("user");

      const request = store.get("user");

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;
        if (!result) return resolve(null);
        const {
          inCorrectSubQuestion = [],
          inCorrectMultipleChoiceQuestion = [],
          inCorrectCustomQuestion = [],
        } = result as Partial<UserData> & Record<string, unknown>;
        resolve({ inCorrectSubQuestion, inCorrectMultipleChoiceQuestion, inCorrectCustomQuestion });
      };
    });
  }
}

export const indexedDBService = new IndexedDBService();
