import React from 'react';


const Cell = ({value,onClick, cMenu}) => {
 
  let  className =
      `cell
      ${value.isRevealed  ? '' : " hidden" }
      ${(value.isMine ? " is-mine" : " ")};
      ${value.isFlagged ? " is-flag" : " "}`
  
  const getValue = () => {
    
    if (!value.isRevealed) {
      return value.isFlagged ? "🚩"  : null;
    }

    if (value.isFlagged) {
      return "🚩"
    }

    if (value.isMine) {
      return "💣";

    }

    if (value.neighbour === 0) {
      return null;
    }
    return value.neighbour;
  }
  

 

    return (
      <div 
        onClick={onClick}
        className={className}
        onContextMenu={cMenu}
      >
        {getValue()}
      </div>
    );

}

export default Cell;