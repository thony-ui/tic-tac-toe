import React, { useState } from "react";
import { useSelector } from "react-redux";

function Grid() {
  // main logic
  const darkMode = useSelector((state) => state.darkMode.value);
  const [shape, setShape] = useState("O");
  const [draw, setDraw] = useState("");
  const [cells, setCells] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const [moves, setMoves] = useState([]);

  const handleClick = (index) => {
    if (draw) {
      alert("Game drawn, Press Reset to play again");
    } else if (winner) {
      alert(winner + " Press Reset to play again");
      return;
    }
    if (!cells[index]) {
      // create new instance of cells
      const newCell = cells.slice();

      //update the new instance
      newCell[index] = shape;

      // SetCells to that new instance
      setCells(newCell);
      const msg = checkWinner(newCell);
      if (msg) {
        return;
      }
      if (checkDraw(newCell) && !winner) {
        setDraw("Game Drawn");
        return;
      }
      setMoves([...moves, index]);
      const nextShape = shape == "O" ? "X" : "O";
      setShape(nextShape);
    }
  };

  const checkDraw = (cells) => {
    // logic is to loop through all the cells and
    // if there is a cell with a null value
    // the game is not drawn and we return null
    let check = true;
    for (let i = 0; i < 9; i++) {
      if (!cells[i]) {
        check = false;
        break;
      }
    }
    return check;
  };

  const checkWinner = (cells) => {
    // we have all the winning conditions so if
    // it fulfils any of thw winning conditions
    // we set winner to be true
    const winningConditions = [
      [0, 1, 4],
      [0, 2, 6],
      [0, 3, 8],
      [1, 2, 3],
      [4, 5, 6],
      [5, 6, 7],
      [6, 7, 8],
    ];

    for (let conditions of winningConditions) {
      const [a, b, c] = conditions;
      if (cells[a] && cells[a] == cells[b] && cells[a] == cells[c]) {
        setWinner("Player With " + shape + " Won");
        return "Player with " + shape + " Won";
      }
    }
    return null;
  };

  const resetCells = () => {
    setShape("O")
    setWinner(null);
    setCells([]);
    setDraw("");
  };

  const renderCellContent = (index) => {
    return cells[index];
  };

  const undo = () => {
    if (draw) {
      alert("Game drawn, Press Reset to play again");
      return
    } else if (winner) {
      alert(winner + " Press Reset to play again");
      return;
    }
    if (moves.length == 0) {
      return
    }
    const curMoves = moves.slice();
    const curCells = cells.slice();
    let index = curMoves.pop();
    let poppedShape = curCells[index];
    curCells[index] = null;
    setCells(curCells);
    setShape(poppedShape);
    setMoves(curMoves)
  };

  return (
    <div className="flex flex-col items-center mt-[120px]">
      {winner && (
        <p
          className={`mb-[20px] ${
            darkMode ? "text-purple-100" : "text-purple-700"
          }`}
        >
          {winner}
        </p>
      )}
      {draw && (
        <p
          className={`mb-[20px] ${
            darkMode ? "text-purple-100" : "text-purple-700"
          }`}
        >
          {draw}
        </p>
      )}
      {/* first row */}
      <div
        className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] border border-purple-400 cursor-pointer"
        role="cell"
        onClick={() => handleClick(0)}
      >
        <p className="h-[inherit] flex flex-col items-center justify-center">
          {renderCellContent(0)}
        </p>
      </div>
      {/* second row */}
      <div className="flex">
        {["1", "2", "3"].map((val, ind) => {
          return (
            <div
              key={ind}
              role="cell"
              className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] border border-purple-400 cursor-pointer"
              onClick={() => handleClick(ind + 1)}
            >
              <p className="h-[inherit] flex flex-col items-center justify-center">
                {renderCellContent(ind + 1)}
              </p>
            </div>
          );
        })}
      </div>
      {/* third row */}
      <div className="flex">
        {["1", "2", "3", "4", "5"].map((val, ind) => {
          return (
            <div
              key={ind}
              role="cell"
              className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] border border-purple-400 cursor-pointer"
              onClick={() => handleClick(ind + 4)}
            >
              <p className="h-[inherit] flex flex-col items-center justify-center">
                {renderCellContent(ind + 4)}
              </p>
            </div>
          );
        })}
      </div>
      <button
        className="p-3 bg-purple-400 text-white rounded-md mt-[20px] w-[300px]"
        onClick={resetCells}
      >
        Reset
      </button>

      <button
        className="p-3 bg-purple-400 text-white rounded-md mt-[20px] w-[300px]"
        onClick={() => undo()}
      >
        Undo
      </button>
    </div>
  );
}

export default Grid;
