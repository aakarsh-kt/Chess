import React, { useEffect, useState } from "react";
import { SquareComp } from "./Square";
import { SQUARES } from "chess.js";

export default function ChessBoard(props) {
  

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  function findMoves(i,j){
    const arr=props.chess.moves({ square: SQUARES[i * 8 + j],verbose:true});
    const fin=arr.map((move)=>move.to);
    console.log(fin);
    const arr2=fin?.map((move)=>{
      // console.log(((move.charCodeAt(0))-97));
      return ((move.charCodeAt(0))-97)+(56-move.charCodeAt(1))*8;
     });
     console.log(arr2);
    setLegalMoves(arr2);
  }
  function handleMove(i, j) 
  {
    if (!from) {
      setFrom(SQUARES[i * 8 + j]);
      findMoves(i,j);
      // console.log(SQUARES[i*8+j]);
    } else {
      setTo(SQUARES[i * 8 + j]);
      // console.log(SQUARES[i*8+j]);
      // console.log(JSON.stringify({type:"move",payload:{from,to:SQUARES[i*8+j]}}));
      props.socket.send(
        JSON.stringify({
          type: "move",
          payload: { from, to: SQUARES[i * 8 + j] },
        })
      );
      // console.log(payload);
      // console.log({from,to:SQUARES[i*8+j]});
      try {
        props.chess.move({ from, to: SQUARES[i * 8 + j] });
        props.setMoves((prev) => [
          ...prev,
          SQUARES[i * 8 + j],
        ]);
        setLegalMoves([]);
      } catch (e) {
        console.log(e);
        if(props.chess.get(SQUARES[i * 8 + j])!=false && props.chess.get(SQUARES[i * 8 + j]).color==props.playerColour)
        {
          setFrom(SQUARES[i * 8 + j]);
          findMoves(i,j);
          setTo(null);
        }
        else
        {
          setFrom(null);
        }
       
      }
      setTo(null);
      props.setBoard(props.chess.board());
    }
  
  }
  return (
    <div className="text-white-200 mt-10">
      {console.log(props.playerColour)}
      {
        props.playerColour === "w"
          && props.board.map((row, i) => (
              <div key={i} className="flex  ">
                {row.map((cell, j) => {
                
                  return (
                    <div
                      key={j}
                      className="flex"
                      onClick={() => handleMove(i,j)}
                      // style={{
                      //   backgroundColor: isHighlighted ? 'yellow' : 'white',
                      // }}
                    >
                      <SquareComp
                        square={cell}
                        i={i}
                        j={j}
                        legalMoves={legalMoves}
                        // moves={moves}
                      
                        chess={props.chess}
                      />
                    </div>
                  );
                })}
              </div>
            ))
          }{
            props.playerColour === "b" &&
           props.board.map((row, i) => (
              <div key={i} className="flex  ">
                {row.map((cell, j) => {
                  return (
                    <div
                      key={j}
                      className="flex"
                      onClick={() => handleMove(i,j)}
                      // style={{
                      //   backgroundColor: isHighlighted ? 'yellow' : 'white',
                      // }}
                    >
                      <SquareComp
                        square={cell}
                        i={i}
                        j={j}
                        legalMoves={legalMoves}
                        chess={props.chess}
                      />
                    </div>
                  );
                })}
              </div>
            )).reverse()
        //else
      }
    </div>
  );
}
