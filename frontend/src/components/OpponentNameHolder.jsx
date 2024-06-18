import React, { useContext, useEffect, useState } from "react";


export default function OpponentNameHolder(props) {
    const [name,setName]=useState("");
    const [profilePicture,setProfilePicture]=useState("");
    useEffect(()=>{
        setName(props.opponent?.name);
        setProfilePicture(props.opponent?.profilePicture);
    },[props.opponent])
  return (
    <div className="flex flex-col items-center gap-5">
      <img src={profilePicture} className="w-20 h-16 rounded-md"/>
      <h3 className="text-white font-bold font-size-6 ">{name}</h3>
    </div>
  );
}
