import React, { useContext } from "react";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../contexts/userContext"
export default function () {
  const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   setUser(useContext(UserContext));
    const user=useContext(UserContext);
  return (
    <div className="w-300px flex flex-col m-2 gap-10">
      <Button type="primary"  onClick={()=>navigate("/login")}>
        <h3 className="text-white font-medium bg-green-400 rounded-md p-2">Login</h3>
      </Button>
      <h2>{user?.user}</h2>
   {   console.log(user)}
      <Button type="primary" onClick={()=>navigate("/register")}>
        <h3 className="text-white font-medium bg-green-400 rounded-md p-2">Register</h3>
      </Button>
    </div>
  );
}
