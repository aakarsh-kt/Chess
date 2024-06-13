import React, { useContext, useEffect } from "react";


export default function OpponentNameHolder(props) {
    const [name,setName]=useState("");
    useEffect(()=>{
        setName(props.name);
    },[props.name])
  return (
    <div>

      <h3 className="text-white font-bold font-size-6 ">{user?.displayName}</h3>
    </div>
  );
}
