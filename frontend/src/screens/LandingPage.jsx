import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import Hero from "../components/ChessModel";
import Phoenix from "../components/Phoenix_bird";
import Dragon from "../components/Dragon_flying";
import House from "../components/House";
import Sidebar from "../components/Sidebar";
export default function () {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex flex-col bg-slate-700  ">
      <h1 className="text-white text-center text-5xl font-bold mt-4">
        Play Chess Online on World's #3 site
      </h1>
      <div className="flex flex-1 justify-around items-center">
        <Sidebar />
        <img src="chessBoard.jpg" alt="chess board" className="max-w-100 max-h-96 " />
        
        {/* <Canvas>
          <OrbitControls />
          
          <ambientLight intensity={1} />
          <House/>

        </Canvas> */}

        <div className="flex flex-col gap-y-5 mr-20 ">
          <button className="btn bg-green-400 h-60px italic hover:bg-green-700 rounded text-2xl px-8 py-4 hover:text-white font-medium">
            Play with computer
          </button>
          <button
            className="btn bg-green-400 h-60px italic hover:bg-green-700 rounded text-2xl px-8 py-4 hover:text-white font-medium"
            onClick={() => navigate("/game")}
          >
            Play Online
          </button>
        </div>
      </div>
    </div>
  );
}
