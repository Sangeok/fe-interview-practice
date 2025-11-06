import { describe, it, expect, vi } from "vitest";
import { arrayShuffle, shuffleMultipleChoiceQuestions } from "@/fsd/shared/lib/array-shuffle";
import type { MultipleChoiceQuestion } from "@/fsd/widgets/interviewOption/ui/multipleChoiceInterview/model/type";

describe("arrayShuffle", () => {
  it("returns [] for non-array input", () => {
    expect(arrayShuffle(null as unknown as never[])).toEqual([]);
    expect(arrayShuffle(undefined as unknown as never[])).toEqual([]);
    expect(arrayShuffle({} as unknown as never[])).toEqual([]);
  });

  it("does not mutate original array and returns new array", () => {
    const input = [1, 2, 3];
    const copy = [...input];
    const result = arrayShuffle(input);
    expect(result).not.toBe(input);
    expect(input).toEqual(copy);
    expect(result.sort()).toEqual(copy.sort());
  });

  it("shuffles deterministically with mocked Math.random", () => {
    const spy = vi.spyOn(Math, "random");
    // i=3 -> j=3 (no-op), i=2 -> j=0 (swap), i=1 -> j=1 (no-op)
    spy.mockReturnValueOnce(0.9).mockReturnValueOnce(0.2).mockReturnValueOnce(0.5);
    const result = arrayShuffle([1, 2, 3, 4]);
    expect(result).toEqual([3, 2, 1, 4]);
    spy.mockRestore();
  });
});

describe("shuffleMultipleChoiceQuestions", () => {
  it("returns [] for non-array input", () => {
    expect(shuffleMultipleChoiceQuestions(null as unknown as never[])).toEqual([]);
  });

  it("shuffles questions and options deterministically; original is not mutated", () => {
    const input: MultipleChoiceQuestion[] = [
      {
        id: 1,
        question: "Q1",
        answerString: "A",
        options: [
          { id: 1, label: "A", answerBoolean: true },
          { id: 2, label: "B", answerBoolean: false },
        ],
      },
      {
        id: 2,
        question: "Q2",
        answerString: "X",
        options: [
          { id: 3, label: "X", answerBoolean: true },
          { id: 4, label: "Y", answerBoolean: false },
        ],
      },
    ];
    const inputClone = JSON.parse(JSON.stringify(input));

    const spy = vi.spyOn(Math, "random");
    // questions (len 2): r0=0.4 -> swap -> [Q2, Q1]
    // Q2 options (len 2): r1=0.9 -> no-op
    // Q1 options (len 2): r2=0.0 -> swap -> reversed
    spy.mockReturnValueOnce(0.4).mockReturnValueOnce(0.9).mockReturnValueOnce(0.0);

    const result = shuffleMultipleChoiceQuestions(input);

    expect(result.map((q) => q.id)).toEqual([2, 1]);
    expect(result[0].options.map((o) => o.id)).toEqual([3, 4]); // unchanged
    expect(result[1].options.map((o) => o.id)).toEqual([2, 1]); // reversed
    expect(input).toEqual(inputClone); // original not mutated

    spy.mockRestore();
  });
});
