/* 所有的winning combinations的index组合:
  [0, 1, 2], [3, 4, 5], [6, 7, 8] 行成线
  [0, 3, 6], [1, 4, 7], [2, 5, 8] 列成线
  [0, 4, 8], [2, 4, 6]     两个对角线成线
*/
export const CELLS_IN_A_LINE = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/* Determine if there's a winner for the board : 
    iterating through all possible winning combinations and checks if the cells in each combination have the same mark
 */
export const determineWinner = (board) => {
  for (let i = 0; i < CELLS_IN_A_LINE.length; i++) {
    const [a, b, c] = CELLS_IN_A_LINE[i];
    // Determine if the cells in a line have the same mark.
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  // No winner yet.
  return null;
};
