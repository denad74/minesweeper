 // get mines
   export function  getMines(data) {
    let mineArray = [];

    data.map(datarow => {
      datarow.map((dataitem) => {
        if (dataitem.isMine) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  }

  // get Flags
export function getFlags(data) {
    let mineArray = [];

    data.map(datarow => {
      datarow.map((dataitem) => {
        if (dataitem.isFlagged) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  }


  // get Hidden cells
  export function getHidden(data) {
    let mineArray = [];

    data.map(datarow => {
      datarow.map((dataitem) => {
        if (!dataitem.isRevealed) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  }



  // get random number given a dimension
 export function getRandomNumber(dimension) {
    // return Math.floor(Math.random() * dimension);
    return Math.floor((Math.random() * 1000) + 1) % dimension;
  }

   export function createEmptyArray (height, width){
//Pravimo arr sa objektom svakog polja
    let data = [];

    for (let i = 0; i < height; i++) {
      data.push([]);
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbour: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    // console.log(data);
    return data;
   }
    

      // plant mines on the board and fill init data
 export function plantMines(data, height, width, mines) {
    let randomx;
    let randomy;
    let minesPlanted = 0;

    while (minesPlanted < mines) {
      randomx = getRandomNumber(width);
      randomy = getRandomNumber(height);
      if (!(data[randomx][randomy].isMine)) {
        data[randomx][randomy].isMine = true;
        minesPlanted++;
      }
    }
    // console.log("plants data", data);
    return (data);
    
 }
  
  