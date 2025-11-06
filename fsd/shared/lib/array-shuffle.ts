export const arrayShuffle = <T>(array: T[]): T[] => {
  // 배열이 아니거나 null/undefined인 경우 빈 배열 반환
  if (!Array.isArray(array)) {
    return [];
  }

  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * 객관식 문제 배열을 섞는 함수
 * 질문 배열과 각 질문의 options 배열을 모두 섞어서 반환합니다.
 * @param questions options 속성을 가진 객체들의 배열
 * @returns 질문과 선택지가 모두 섞인 새로운 배열
 */
export const shuffleMultipleChoiceQuestions = <T extends { options: unknown[] }>(questions: T[]): T[] => {
  if (!Array.isArray(questions)) {
    return [];
  }

  // 먼저 질문 배열을 섞음
  const shuffledQuestions = arrayShuffle(questions);

  // 각 질문의 options도 섞음
  return shuffledQuestions.map((question) => ({
    ...question,
    options: arrayShuffle(question.options),
  }));
};
