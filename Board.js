import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows = 4, ncols = 4, chanceLightStartsOn = .5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y <nrows; y++){
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map(row => [...row]);

      flipCell(y, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
 
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div> You Win!</div>
  }

  // make table board

  let tableBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
}

export default Board;
