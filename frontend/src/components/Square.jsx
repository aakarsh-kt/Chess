import React, { useEffect, useState } from "react";
export const SquareComp = (props) => {
  const color = props.square?.color == "b" ? "black-" : "white-";
  const [val,setVal]=useState(false);
  
  // const [legalMoves, setLegalMoves] = useState(props.legalMoves);
  // console.log(legalMoves);
  return (
    <div>
      <div
        className={` w-16 h-16 flex square-${
          props.legalMoves?.indexOf(props.i*8+props.j)!=-1 && props.legalMoves?.indexOf(props.i*8+props.j)!=null?"highLight":((props.i + props.j) % 2 == 0 ? "light" : "dark")
        }`}

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
