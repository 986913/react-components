/*  different is here: */

export const determineWinner = (board, i, n, m) => {
  const row = Math.floor(i / n);
  const col = i % n;

  // Get row
  const rowLine = [];
  for (let i = 0; i < n; i++) {
    rowLine.push(row * n + i);
  }

  // Get column
  const colLine = [];
  for (let i = 0; i < n; i++) {
    colLine.push(i * n + col);
  }

  const leftToRightDiagonalLine = getLeftToRightDiagonal(i, n);
  const rightToLeftDiagonalLine = getRightToLeftDiagonal(i, n);

  const lines = [
    rowLine,
    colLine,
    leftToRightDiagonalLine,
    rightToLeftDiagonalLine,
  ];

  for (const line of lines) {
    let currentWinner = null;
    let currentCountInARow = 0;
    for (const i of line) {
      if (board[i] == null) {
        currentWinner = null;
        currentCountInARow = 0;
        continue;
      }
      if (board[i] === currentWinner) {
        currentCountInARow++;
      } else {
        currentWinner = board[i];
        currentCountInARow = 1;
      }
      if (currentCountInARow >= m) {
        return currentWinner;
      }
    }
  }

  return null;
};

function getLeftToRightDiagonal(i, n) {
  const row = Math.floor(i / n);
  const col = i % n;

  const stepsToStart = Math.min(col, row);
  const startRow = row - stepsToStart;
  const startCol = col - stepsToStart;
  const line = [];

  for (let i = 0; i < n; i++) {
    const currentRow = startRow + i;
    const currentCol = startCol + i;
    if (currentRow >= n || currentCol >= n) {
      break;
    }
    line.push(currentRow * n + currentCol);
  }

  return line;
}

function getRightToLeftDiagonal(i, n) {
  const row = Math.floor(i / n);
  const col = i % n;

  const stepsToStart = Math.min(n - col - 1, row);
  const startRow = row - stepsToStart;
  const startCol = col + stepsToStart;
  const line = [];

  for (let i = 0; i < n; i++) {
    const currentRow = startRow + i;
    const currentCol = startCol - i;
    if (currentRow >= n || currentCol < 0) {
      break;
    }
    line.push(currentRow * n + currentCol);
  }

  return line;
}
