// Fisher-Yates shuffle.
const shuffle = (array) => {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const generateMolePositions = (molesAtOnce, totalCount) => {
  // Generate an array containing values [0, totalCount].
  const indices = Array.from({ length: totalCount }).map((_, index) => index);
  // 随机打乱array
  shuffle(indices);
  // Take the first `totalCount` items from the shuffled array.
  const shuffledIndices = indices.slice(0, molesAtOnce); // console.log(indices, shuffledIndices, new Set(shuffledIndices));

  return new Set(shuffledIndices);
};
