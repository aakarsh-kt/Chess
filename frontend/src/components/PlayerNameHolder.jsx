import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import Clock from "./Clock";
import Loader from "../functions/loader"
import Slideshow from "../functions/slideShow";
export default function PlayerNameHolder(props) {
  const {user,setUser} = useContext(UserContext);

  const [time,setTime]=useState(null);
  useEffect(()=>{
    setTime(props.selectedTime);

  },[props.selectedTime])


  return (
    <div className="bg-slate-700 flex flex-col h-96 justify-evenly mt-20 ml-10 rounded-md w-40 items-center">
      {console.log(user)}
      {/* <h3 className="text-white font-bold font-size-6 "> */}
      {props.loaderShow ?  <Slideshow/>:<img src="profile.webp" className="rounded-full w-20"/>}
        {/* </h3> */}
       <Clock time={time}/>
       <Clock time={time}/>
      <h3 className="text-white font-bold font-size-6 ">{user?.name}</h3>
    </div>
  );
}
