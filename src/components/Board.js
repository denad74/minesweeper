import React, { useEffect, useState } from 'react';
import { plantMines, createEmptyArray, getHidden, getFlags, getMines, } from './helpers'

import Cell from './Cell';

const Board = (props) => {
  // Board data state 
  const [boardData, setBoardData] = useState(initBoardData(props.height, props.width, props.mines));// data cell status 
  const [mineCount, setMineCount] = useState(props.mines);// mine flagged
  const [gameStatus, setGemeStatus] = useState('Game in progress');// (Game in progess, won, lose)
  
  console.log(boardData);
// Gets initial board data
  
  function initBoardData (height, width, mines) {
    let data = createEmptyArray(height, width);//inicijalizira array
    data = plantMines(data, height, width, mines);// plant mines in the cell randomly
    data = getNeighbours(data, height, width);
    return data;
    
  }


  // get number of neighbouring mines for each board cell
  function getNeighbours (data, height, width) {
    let updatedData = data;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i][j].isMine !== true) {
          let mine = 0;// ako polje nema minu 
          const area = traverseBoard(data[i][j].x, data[i][j].y, data);
          area.map(value => {
            if (value.isMine) {
              mine++;
            }
          });
          if (mine === 0) {
            updatedData[i][j].isEmpty = true;
          }
          updatedData[i][j].neighbour = mine;
        }
      }
    }
// console.log(updatedData)
    return updatedData;
  };

// looks for neighbouring cells and returns them
  function traverseBoard (x, y, data){
    const el = [];

    //up
    if (x > 0) {
      el.push(data[x - 1][y]);
    }

    //down
    if (x < props.height - 1) {
      el.push(data[x + 1][y]);
    }

    //left
    if (y > 0) {
      el.push(data[x][y - 1]);
    }

    //right
    if (y < props.width - 1) {
      el.push(data[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < props.width - 1) {
      el.push(data[x - 1][y + 1]);
    }

    // bottom right
    if (x < props.height - 1 && y < props.width - 1) {
      el.push(data[x + 1][y + 1]);
    }

    // bottom left
    if (x < props.height - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }

    return el;
  }
  


 // reveals the whole board
  function revealBoard () {
    let updatedData = boardData;
    updatedData.map((datarow) => {
      datarow.map((dataitem) => {
        dataitem.isRevealed = true;
      });
    });
    setBoardData(updatedData);  
  }
 

 
  // Handle User Events
  

  
  
  const handlerPlayAgain = () => {
  setBoardData(initBoardData(props.height, props.width, props.mines));
    setMineCount(props.mines);
  setGemeStatus('Game in progress');
}
  
   const handleContextMenu = (e, x, y) =>{
    e.preventDefault();
    let updatedData = boardData;
    let mines = mineCount;

    // check if already revealed
    if (updatedData[x][y].isRevealed) return;

    if (updatedData[x][y].isFlagged) {
      updatedData[x][y].isFlagged = false;
      mines++;
    } else {
      updatedData[x][y].isFlagged = true;
      mines--;
    }

    if (mines === 0) {
      const mineArray = getMines(updatedData);
      const FlagArray = getFlags(updatedData);
      if (JSON.stringify(mineArray) === JSON.stringify(FlagArray)) {
        setMineCount(0)
        setGemeStatus("You Win.");
        revealBoard();
       
      }
    } 
  setMineCount(mines)
  setBoardData(updatedData);
   }
  
  
  /* reveal logic for empty cell */
  function revealEmpty(x, y, data) {
    
    let area = traverseBoard(x, y, data);
        area.map(value => {
          if ( !value.isFlagged && !value.isRevealed && (value.isEmpty|| value.neighbour || !value.isMine)) {
                data[value.x][value.y].isRevealed = true;
                if (value.isEmpty) {
                  revealEmpty(value.x, value.y, data); 
                }
           } 
        });
    
      return data;
  }
  

  function handleCellClick(x, y) {
  
    console.log('render4');
    let updatedData = [...boardData];
    let game = gameStatus;
    let mine = mineCount;

    // check if revealed. return if true.
    if (updatedData[x][y].isRevealed || updatedData[x][y].isFlagged) return null;
    
     
    updatedData[x][y].isFlagged = false;
    updatedData[x][y].isRevealed = true;

    if (updatedData[x][y].isEmpty || updatedData[x][y].neighbour) {
      updatedData = revealEmpty(x, y, updatedData);
      console.log(updatedData);
    }
    

    // check if mine. game over if true
    if (boardData[x][y].isMine) {
      game = 'You Won';
           revealBoard();
    }


    if (getHidden(updatedData).length === props.mines) {
      mine = 0
      game = "You Won."
      revealBoard();
           
    }
    setBoardData(updatedData);
    setGemeStatus(game);
     setMineCount(mine)
  }
 

  

//   // Handle User Events 

 
  
  
  
 return (
    <> 
      <div className="board">
       <div className="game-info">
         <h1 className="info">{gameStatus}</h1>
          <span className="info">Mines remaining: {mineCount}</span>
          
        </div>
       {boardData?.map((datarow) => {
      return datarow.map((dataitem) => {
       
        return (
          <div
            key={dataitem.x * datarow.length + dataitem.y}>
            <Cell
              onClick={() => handleCellClick(dataitem.x, dataitem.y)}
              cMenu={(e) => handleContextMenu(e, dataitem.x, dataitem.y)}

              value={dataitem}
            />
            {(datarow[datarow.length - 1] === dataitem) ? <div className="clear" /> : ""}
          </div>);
      })
    })}
      </div>
      <button
        onClick={handlerPlayAgain}
        className='btn'>Play Again</button>
      </>
    );
  
}



export default Board;