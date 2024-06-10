import React, { useEffect, useState } from "react";
import ChessBoard from "../components/Chessboard";
import { Chess } from "chess.js";
import { useSocket } from "../hooks/useSocket";
import { Button } from "@mui/material";
import { Record } from "../components/Record";
import { gameCollectionRef,db } from "../firebase";

const GAME_OVER = "game_over";
const MOVE = "move";
const INIT_GAME = "init_game";

export default function () {
  const [moves, setMoves] = useState([]);
  const socket = useSocket();
  const [dispButton, setDispButton] = useState(false);
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  function addGameToFirebase(){
    console.log(socket);
  }
  useEffect(() => {
    setBoard(chess.board());
  }, [chess]);
  useEffect(() => {
    if (!socket) return;
    if (socket) {
      socket.onmessage = (event) => {
        
        const message = JSON.parse(event.data);
        switch (message.type) {
          case INIT_GAME:
            setChess(new Chess());
            setBoard(chess.board());
            setDispButton(true);
            console.log("Player Connected");
            addGameToFirebase();
            break;
          case MOVE:
            chess.move(message.payload);

            setBoard(chess.board());
            setMoves(chess.history());
            // console.log("Move");
            break;
          case GAME_OVER:
            console.log("Game Over");
            break;
          default:
            console.log("Unknown message");
        }
      };
    }
  }, [socket, chess]);

  // console.log(chess.);
//   console.log(board);    
  return (
    <div className="flex flex-row items-center justify-around">
      <div>
        <ChessBoard
          board={board}
          setBoard={setBoard}
          chess={chess}
          setChess={setChess}
          socket={socket}
          moves={moves}
          setMoves={setMoves}
        />
      </div>
      <div>
        {!dispButton && (
          <Button
            type="primary"
            onClick={() => socket?.send(JSON.stringify({ type: INIT_GAME }))}
          >
            Play!
          </Button>
        )}
        {dispButton && <Record moves={moves} />}
      </div>
    </div>
  );
}
