
import React from "react";
import Board from './Board';


const Game = () => {
  
  
  const height = 8;
  const width = 8;
  const mines = 10;




    return (
      <div className="game">
        <Board
          height={height}
          width={width}
          mines={mines} />
      </div>
    );

}
export default Game;