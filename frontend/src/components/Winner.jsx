import React from 'react';
const DRAW = "draw";
export default function Winner(props) {
  return (
  
        <div className="overlay" onClick={props.handleWinner}>
          
            {props.whoWon==DRAW ?<h3 className="text-white font-bold font-size-6 ">Draw</h3>: props.whoWon===props.playerColour?  <h3 className="text-white font-bold font-size-6 ">You Won</h3>:  <h3 className="text-white font-bold font-size-6 ">You Lost</h3>}
          
        </div>
       

  );
}
