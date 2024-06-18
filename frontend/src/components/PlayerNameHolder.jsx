import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import Clock from "./Clock";
import Loader from "../functions/loader";
import Slideshow from "../functions/slideShow";
import OpponentNameHolder from "./OpponentNameHolder";
export default function PlayerNameHolder(props) {
  const { user, setUser } = useContext(UserContext);

  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(props.selectedTime);
  }, [props.selectedTime]);

  return (
    <div className="bg-slate-700 flex flex-col h-96 justify-evenly mt-20 ml-10 rounded-md w-40 items-center">
      {/* {console.log(user)} */}
    
      {/* <h3 className="text-white font-bold font-size-6 "> */}
      {!props.dispButton && !props.loaderShow && <img src="profile.webp" className="rounded-full w-20" />}
      {props.loaderShow  &&  <Slideshow />} 
       
    
         {/* <img src="profile.webp" className="rounded-full w-20" /> */}
      {props.dispButton && <OpponentNameHolder opponent={props.opponent} />}
     
      {/* </h3> */}
      <Clock
        time={time}
        playerColour={props.playerColour}
        moveNo={props.moveNo}
        chess={props.chess}
        socket={props.socket}
        dispButton={props.dispButton}
      />
      {/* <Clock time={time} playerColour={props.playerColour} moveNo={props.moveNo} dispButton={props.dispButton}/> */}
      <img src={user?.profilePicture} className="w-20 rounded-md "/>
      <h3 className="text-white font-bold font-size-6 ">{user?.name}</h3>
    </div>
  );
}
