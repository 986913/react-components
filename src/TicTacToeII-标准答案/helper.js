/**
  以n=5, m=4为例, 其index array 为下, 其实还是1维的 只不过为了便于观察 写成了矩阵样子：
      0  1  2  3  4
      5  6  7  8  9
      10 11 12 13 14
      15 16 17 18 19
      20 21 22 23 24
 */

//注意：board还是为一维数组
export const determineWinner = (board, i, n, m) => {
  /* based on index i to calculate postion: row, col 
      以index为12, n=5, m=4为例,计算得出： row=2, col=2 
  */
  const row = Math.floor(i / n);
  const col = i % n;

  /* Get row: 
    以index为12, n=5, m=4为例, 计算得出： rowLine=[10,11,12,13,14] 
  */
  const rowLine = [];
  for (let i = 0; i < n; i++) {
    rowLine.push(row * n + i);
  }

  /* Get column: 
    以index为12, n=5, m=4为例, 计算得出： colLine=[2,7,12,17,22] 
  */
  const colLine = [];
  for (let i = 0; i < n; i++) {
    colLine.push(i * n + col);
  }

  /* Get 2 diagonals: 
    以index为12, n=5, m=4为例, 计算得出： leftToRightDiagonalLine=[0,6,12,18,24]; rightToLeftDiagonalLine=[4,8,12,16,20]
  */
  const leftToRightDiagonalLine = getLeftToRightDiagonal(i, n);
  const rightToLeftDiagonalLine = getRightToLeftDiagonal(i, n);

  const lines = [
    rowLine,
    colLine,
    leftToRightDiagonalLine,
    rightToLeftDiagonalLine,
  ];

  for (const line of lines) {
    let winner = null;
    let currentCounts = 0;

    for (const index of line) {
      if (board[index] == null) {
        winner = null;
        currentCounts = 0;
        continue;
      }
      if (board[index] === winner) {
        currentCounts++;
      } else {
        winner = board[index];
        currentCounts = 1;
      }

      if (currentCounts >= m) return winner;
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
    if (currentRow >= n || currentCol >= n) break;
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
    if (currentRow >= n || currentCol < 0) break;
    line.push(currentRow * n + currentCol);
  }

  return line;
}
