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
    <div className=' w-screen'>
        <nav className='flex flex-row justify-between'>
            <ul className='flex flex-row justify-between gap-20 font-medium text-white mx-10 cursor-pointer items-center'>
                <li className='rounded-md bg-slate-600 p-1'   onClick={()=>navigate('/landing')} >Home</li>
               {user==="" || user==undefined   && <li className='rounded-md bg-slate-600 p-1' onClick={()=>navigate("/login")}>Login</li>}
               {user==="" || user==undefined&& <li className='rounded-md bg-slate-600 p-1' onClick={()=>navigate("/register")}>Sign Up</li>}
               {user!=="" && user!=undefined && <li className='rounded-md bg-slate-600 p-1' onClick={()=>logout()}>Logout</li>}
            </ul>
            
          {user!=="" && user!=undefined && < img className='right-0  w-20 h-20 rounded-full p-2 cursor-pointer' src={user.profilePicture}/>}
        </nav>
      
    </div>
  );
}

export default Navbar;
