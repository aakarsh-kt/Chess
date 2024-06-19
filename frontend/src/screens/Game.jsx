import React, { useContext, useEffect, useState } from "react";
import ChessBoard from "../components/Chessboard";
import { BLACK, Chess, WHITE } from "chess.js";
import { useSocket } from "../hooks/useSocket";
import { Button } from "@mui/material";
import { Record } from "../components/Record";
import Navbar from "../components/Navbar";
import TimeOptions from "../components/TimeOptions";
import CircularIndeterminate from "../functions/loader";
import PlayerNameHolder from "../components/PlayerNameHolder";;
import { UserContext } from "../contexts/userContext";
import Confetti from "react-confetti";
import Winner from "../components/Winner";
const GAME_OVER = "game_over";
const MOVE = "move";
const INIT_GAME = "init_game";

export default function () {
  const { user, setUser } = useContext(UserContext);
  const [moves, setMoves] = useState([]);
  const socket = useSocket();
  const [dispButton, setDispButton] = useState(false);
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [playerColour, setPlayerColour] = useState("w");
  const [showOptions, setShowOptions] = useState(false);
  const [whoWon,setWhoWon]=useState(null);
  const [isGameOver,setIsGameOver]=useState(false);
  const [opponent,setOpponent]=useState(null);
  const [showConfetti,setShowConfetti]=useState(false );

  const [moveNo, setMoveNo] = useState(0);
  useEffect(() => {
    setBoard(chess.board());
  }, [chess]);
  const [loaderShow, setLoaderShow] = useState(false);
  function sendMessageToSocket(winner){
    if(playerColour===winner)
    socket.send(JSON.stringify({
      type:GAME_OVER,
      payload:{
        winner:user,
      }
    }));
  }
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
            console.log(message.opponent);
            setOpponent(message.opponent);
            console.log("Player Connected");
            if (message.payload.color === "b") {
              console.log(BLACK);
              setPlayerColour(BLACK);
            } else {
              console.log(WHITE);
              setPlayerColour(WHITE);
            }
            setLoaderShow(false);
            // addGameToFirebase();
            break;
          case MOVE:
            chess.move(message.payload);

            setBoard(chess.board());
            setMoves(chess.history());
            setMoveNo((prev) => prev + 1);
            // console.log("Move");
            break;
          case GAME_OVER:
            console.log("Game Over");
            console.log(message); 
            setIsGameOver(true);
            setWhoWon(message.payload.winner);
            sendMessageToSocket(message.payload.winner);
            if(message.payload.winner===playerColour)
            setShowConfetti(true);
            break;
          default:
            console.log("Unknown message");
        }
      };
    }
  }, [socket, chess]);
  const [mode, setMode] = useState("bullet");
  const [selectedTime, setSelectedTime] = useState(null);
  const [showPlayButton, setShowPlayButton] = useState(true);

  // console.log(chess.);
  //   console.log(board);

  function setTime(mode2, selectedTime2) {
    console.log(mode2, selectedTime2);
    setSelectedTime(selectedTime2);
    setMode(mode2);
    socket?.send(
      JSON.stringify({
        type: INIT_GAME,
        timeControl: mode2,
        subType: selectedTime2,
        userInfo: user,
      })
    );
    setShowOptions(false);
    setLoaderShow(true);
    setShowPlayButton(false);
  }
  // function handleSubmission(){
  // }
  function handleWinner(){
    setIsGameOver(false);
    setWhoWon(null);
  }

  return (
    <div className="flex flex-col">
      <Navbar />
       {showConfetti && <Confetti />}
      <div className="flex flex-row items-center justify-around">
        <PlayerNameHolder
          loaderShow={loaderShow}
          selectedTime={selectedTime}
          playerColour={playerColour}
          moveNo={moveNo}
          socket={socket}
          chess={chess}
          dispButton={dispButton}
          opponent={opponent}
        />
        <div className="flex flex-col ">
       
          <div>
            <ChessBoard
              playerColour={playerColour}
              board={board}
              setBoard={setBoard}
              chess={chess}
              setChess={setChess}
              socket={socket}
              moves={moves}
              setMoves={setMoves}
            />
          </div>
         
        </div>
        {isGameOver && <Winner whoWon={whoWon} playerColour={playerColour} handleWinner={handleWinner}/>}
        
        <div>
          {!dispButton && !showOptions && showPlayButton && (
            <Button
              type="primary"
              onClick={() => setShowOptions(true)}
            >
              Play!
            </Button>
          )}
         
          {showOptions && <TimeOptions setTime={setTime} />}
        
          {dispButton && <Record moves={moves} />}
          {loaderShow && <CircularIndeterminate />}
        </div>
      </div>
    </div>
  );
}
