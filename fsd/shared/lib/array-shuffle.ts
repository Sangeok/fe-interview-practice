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
