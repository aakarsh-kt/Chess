import React, { useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
function Navbar() {
    const {user,setUser}=useContext(UserContext);
    const navigate=useNavigate();
   
        async function logout() {
            console.log("reached");
            setUser(undefined);
            await signOut(auth);
          }
       
    
  return (
    <div className='flex flex-row-reverse  w-screen '>
        <nav>
            <ul className='flex flex-row justify-between gap-20 font-medium text-white mx-10 cursor-pointer'>
                <li className='rounded-md bg-slate-600 p-1'   onClick={()=>navigate('/landing')} >Home</li>
               {user==="" || user==undefined   && <li className='rounded-md bg-slate-600 p-1' onClick={()=>navigate("/login")}>Login</li>}
               {user==="" || user==undefined&& <li className='rounded-md bg-slate-600 p-1' onClick={()=>navigate("/register")}>Sign Up</li>}
               {user!=="" && user!=undefined && <li className='rounded-md bg-slate-600 p-1' onClick={()=>logout()}>Logout</li>}
            </ul>
        </nav>
      
    </div>
  );
}

export default Navbar;
