import { OrbitControls } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";
import SinglePawn from "../components/SinglePawn";
import Navbar from "../components/Navbar";
import { useSocket } from "../hooks/useSocket";
import { orange, red } from "@mui/material/colors";
const GET_GAMES="get_games";

export default function () {
  const navigate = useNavigate();
  const {user,setUser}=useContext(UserContext);
  const socket=useSocket();
  console.log(user);
  const [color, setColor] = React.useState(0xffa726); 
  const [color3, setColor3] = React.useState(0xffb74d); 
  const [color2, setColor2] = React.useState(0xffffff); 
  useEffect(() => {
    if (!socket) return;
    if (socket) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case GET_GAMES:

            console.log(message.payload);
            navigate("/spectate",{state:{games:message.payload}})
            break;
          default:
            console.log("Unknown message");
        }
      };
    }
  }, [socket]);
  return (
    <div className="h-screen w-screen flex flex-col bg-black  ">
      <Navbar/>
      <div className="flex flex-row items-center">
      <Canvas>
          <OrbitControls />
          
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <SinglePawn color={color3}/>
      
        </Canvas>

        <div className="text-white text-center text-7xl font-bold mt-6  rounded-md">
          <h1 >
          Chess
          </h1>
          <h1 className="text-orange-400">
          Nerds
          </h1>
        </div>
        <Canvas>
          <OrbitControls />
          
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <SinglePawn color={color2}/>

        </Canvas>

      </div>
      <div className="flex flex-1 justify-around items-center ">
      
       {console.log(user?.email)   }
        <img src="chessBoard.jpg" alt="chess board" className="max-w-100 max-h-96  " />
        
       
        <div className="flex flex-col gap-y-5 mr-20 ">
          
          <button
            className="btn bg-orange-400 h-60px italic text-white hover:bg-cyan-400 rounded text-2xl px-8 py-4 hover:text-black font-medium"
            onClick={() => navigate("/game")}
          >
            Play Online
          </button>
          <button
           className="btn bg-black-400 h-60px border  italic text-orange-400 hover:bg-cyan-400 rounded text-2xl px-8 py-4 hover:text-black font-medium"
            onClick={()=>socket?.send(JSON.stringify({type:"get_games"}))}
          >
            Spectate Online Games
          </button>
         
        </div>
      </div>
    </div>
  );
}
