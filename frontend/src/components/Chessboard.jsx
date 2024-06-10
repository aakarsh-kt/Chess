import React, { useState } from "react";
import { SquareComp } from "./Square";
import {SQUARES} from "chess.js";

export default function ChessBoard(props) {

    const [coordinates,setCoordinates]=useState([]);
  // const [moves, setMoves] = useState([]);
  
  const [from,setFrom]=useState(null);
    const [to,setTo]=useState(null);

  return (
    <div className="text-white-200 mt-20 ml-10">
      {props.board.map((row, i) => (
        <div key={i} className="flex  ">
          {row.map((cell, j) => {
            // const isHighlighted = highlightedCells.includes(cell.square);

            return (
              <div
                key={j}
                className="flex"
               
                onClick={()=>{
                  if(!from)
                  {
                    setFrom(SQUARES[i*8+j]);
                    // console.log(SQUARES[i*8+j]);

                  }
                  else{
                   
                    setTo(SQUARES[i*8+j] );
                    // console.log(SQUARES[i*8+j]);
                    // console.log(JSON.stringify({type:"move",payload:{from,to:SQUARES[i*8+j]}}));
                    props.socket.send(JSON.stringify({type:"move",payload:{from,to:SQUARES[i*8+j]}}));
                    // console.log(payload);  
                    // console.log({from,to:SQUARES[i*8+j]});
                    try{

                      props.chess.move({from,to:SQUARES[i*8+j]});
                      props.setMoves(prev=>[...prev,SQUARES[i*8+j]])
                    }
                    catch(e){
                      console.log(e);
                    }
                    // props.setChess(props.chess);
                    setFrom(null);
                    setTo(null)
                    props.setBoard(props.chess.board());
                   
                  }
                }}
                // style={{
                //   backgroundColor: isHighlighted ? 'yellow' : 'white',
                // }}
              >
                <SquareComp
                  square={cell}
                  i={i}
                  j={j}
                  // moves={moves}
                  coordinates={coordinates}
                  chess={props.chess}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
   