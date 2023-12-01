const emojis = [
  '🐵',
  '🐶',
  '🦊',
  '🐱',
  '🦁',
  '🐯',
  '🐴',
  '🦄',
  '🦓',
  '🦌',
  '🐮',
  '🐷',
  '🐭',
  '🐹',
  '🐻',
  '🐨',
  '🐼',
  '🐽',
  '🐸',
  '🐰',
  '🐙',
];

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Generate cards configuration with the required groups of emojis.
export function generateCards(totalCount, matchCount) {
  const numGroups = totalCount / matchCount;
  if (numGroups > emojis.length) {
    throw new Error('Not enough emojis');
  }

  const emojisList = emojis.slice(0, numGroups);
  const cards = Array.from({ length: numGroups }, () => null)
    .map((_, idx) => idx)
    .map((idx) => Array.from({ length: matchCount }, () => emojisList[idx]))
    .flat();

  shuffle(cards);
  return cards;
}
