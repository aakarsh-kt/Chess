import React, { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export default function PlayerNameHolder() {
  const {user} = useContext(UserContext);
  return (
    <div className="m-2 ml-10">
      {/* {console.log(user)} */}
      <h3 className="text-white font-bold font-size-6 ">{user?.displayName}</h3>
    </div>
  );
}
