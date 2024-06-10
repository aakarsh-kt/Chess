import React, { useState } from "react";
export const SquareComp = (props) => {
  const color = props.square?.color == "b" ? "black-" : "white-";
  const [val,setVal]=useState(false);
  

  
  return (
    <div>
      <div
        className={` w-16 h-16 flex square-${
          val?"highLight":((props.i + props.j) % 2 == 0 ? "light" : "dark")
        }`}
        // onClick={() => props.handleClick(props.square.square)}
    //   onClick={()=>console.log(props.chess.attackers("'"+props.square?.square+"'"))}
    // onClick={()=>console.log(props.chess.board())}
      >
        {props.square != null && (
          <img
            src={`${color}${props.square.type}.png`}
            alt="piece"
            className="w-16 h-16"
          />
        )}
      </div>
    </div>
  );
};
