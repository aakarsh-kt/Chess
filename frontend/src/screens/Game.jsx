import React, { useContext, useEffect, useState } from "react";
import ChessBoard from "../components/Chessboard";
import { BLACK, Chess, WHITE } from "chess.js";
import { useSocket } from "../hooks/useSocket";
import { Button } from "@mui/material";
import { Record } from "../components/Record";
import { gameCollectionRef, db } from "../firebase";
import Navbar from "../components/Navbar";
import TimeOptions from "../components/TimeOptions";
import CircularIndeterminate from "../functions/loader";
import PlayerNameHolder from "../components/PlayerNameHolder";
import OpponentNameHolder from "../components/OpponentNameHolder";
import { UserContext } from "../contexts/userContext";
const GAME_OVER = "game_over";
const MOVE = "move";
const INIT_GAME = "init_game";

export default function () {
  const {user,setUser}=useContext(UserContext);
  const [moves, setMoves] = useState([]);
  const socket = useSocket();
  const [dispButton, setDispButton] = useState(false);
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [playerColour, setPlayerColour] = useState("w");
  const [showOptions, setShowOptions] = useState(false);
  const [opponentName, setOpponentName] = useState("");
  // function addGameToFirebase() {
  //   // console.log(socket);
  // }
  useEffect(() => {
    setBoard(chess.board());
  }, [chess]);
  const [loaderShow, setLoaderShow] = useState(false);
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
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row items-center justify-around">
      <PlayerNameHolder loaderShow={loaderShow} selectedTime={selectedTime}/>
        <div className="flex flex-col ">
          {/* <OpponentNameHolder  /> */}
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
          {/* <PlayerNameHolder /> */}
        </div>
        <div>
          {!dispButton && !showOptions && showPlayButton && (
            <Button
              type="primary"
              // onClick={() => socket?.send(JSON.stringify({ type: INIT_GAME }))}
              onClick={() => setShowOptions(true)}
            >
              Play!
            </Button>
          )}
          {showOptions && <TimeOptions setTime={setTime} />}
          {/* {showOptions && <Button type="primary" onClick={()=>handleSubmission()}>Play</Button>} */}
          {dispButton && <Record moves={moves} />}
          {loaderShow && <CircularIndeterminate />}
        </div>
      </div>
    </div>
  );
}
