  import { Box } from "@mui/material";
  import React, { useEffect, useState } from "react";

  export default function Clock(props) {
    const [time, setTime] = useState(null);
    const [seconds, setSeconds] = useState(null);

    const [player1Time, setPlayer1Time] = useState(null);
    const [player2Time, setPlayer2Time] = useState(null);

    const [increment, setIncrement] = useState(null);
    const [moveNo, setMoveNo] = useState(props?.moveNo);
    const [playerColour, setPlayerColour] = useState(props?.playerColour);
    useEffect(() => {
      console.log(props.time);
      const s = props.time;
      if (s != null) {
        for (let i = 0; i < s.length; i++) {
          if (s[i] === "|") {
            setTime(s.slice(0, i));
            setIncrement(s.slice(i + 1, s.length));
          }
        }
      } else {
        console.log(time);
        setTime(0);
        setIncrement(0);
      }
    }, [props.time]);
    useEffect(()=>{
      // setMinutes(time);
      setPlayer1Time(time*60);
      setPlayer2Time(time*60);
      setSeconds(time*60);
    },[time])
    
    useEffect(() => {
      if(player1Time===0)
      {
        console.log("Player 1 time ran out");
        props.socket.send(JSON.stringify({type:'game_over',payload:{winner:'b'}}))
        
      }
      else if(player2Time===0)
        {
        console.log("Player 2 time ran out");
        props.socket.send(JSON.stringify({type:'game_over',payload:{winner:'w'}}))
      }
      if(props.dispButton===true || seconds!=null)
      {let timer;
      // console.log(playerColour);
      // console.log(moveNo);
      
      timer = setInterval(() => {
          if (props.chess.turn() === 'b') {
            setPlayer2Time((prevTime) => Math.max(prevTime - 1, 0));
          }
          if(props.chess.turn() ==='w')
            {
            setPlayer1Time((prevTime) => Math.max(prevTime - 1, 0));
          }
        }, 1000);
      
      return () => clearInterval(timer);}
    }, [ props.chess.turn()]);
    useEffect(()=>{
      if(player1Time!=null && player1Time===0 )
        {
          console.log("Player 1 time ran out");
          props.socket?.send(JSON.stringify({type:'game_over',payload:{winner:'b'}}))
          
        }
        else if(player2Time!=null && player2Time===0)
          {
          console.log("Player 2 time ran out");
          props.socket?.send(JSON.stringify({type:'game_over',payload:{winner:'w'}}))
        }
    },[player1Time,player2Time])
    return (
      <div>
        {   console.log(player1Time)}
        {/* {   console.log(props.moveNo)} */}
        <Box className="flex flex-col items-center bg-slate-500 rounded-md cursor-pointer">

        {props.playerColour==='w'? 
          <div>
            <h2 className="text-white font-medium m-3">{Math.floor(player2Time/60)}:{(player2Time%60)>9?player2Time%60:'0'+player2Time%60}</h2>
            <h2 className="text-white font-medium m-3">{Math.floor(player1Time/60)}:{(player1Time%60)>9?player1Time%60:'0'+player1Time%60}</h2>
          </div>
          :
          <div>
            <h2 className="text-white font-medium m-3">{Math.floor(player1Time/60)}:{(player1Time%60)>9?player1Time%60:'0'+player1Time%60}</h2>
            <h2 className="text-white font-medium m-3">{Math.floor(player2Time/60)}:{(player2Time%60)>9?player2Time%60:'0'+player2Time%60}</h2>
          </div>
          }
        </Box>
      </div>
    );
  }
