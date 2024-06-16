import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Clock(props) {
  const [time, setTime] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [increment, setIncrement] = useState(null);
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
    setMinutes(time);
    setSeconds(0);
  },[time])
  return (
    <div>
      <Box className="flex flex-col items-center bg-slate-500 rounded-md cursor-pointer">
        <h2 className="text-white font-medium m-3">{minutes}:{seconds>9?seconds:'0'+seconds}</h2>
      </Box>
    </div>
  );
}
