//import { useState } from "react";

export default function GameBoard({ onSelectSquare, board }) {
  //const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   function handleSelectSquare(rowIndex, colIndex) {
  //     setGameBoard((prevGameBoard) => {
  //       const updatedBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //         //  بعمل نسخة جديدة من البورد القديم عشان ما اعدل على البورد القديم
  //       ];
  //       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       //    بحدث المربع اللي اتضغط عليه برمز اللاعب الحالي
  //       return updatedBoard;
  //     });
  //     onSelectSquare();
  //     //  بستدعي ال فانشكن اللي بال App عشان يغير اللاعب الاكتف
  //   }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          {/* بعطي key لكل صف عشان ال React يقدر يميزهم */}
          <ol>
            {row.map((playerSymbol, colIndex) => (
              //    بعطي key لكل مربع عشان ال React يقدر يميزهم
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                  {/* بعرض رمز اللاعب في المربع */}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
