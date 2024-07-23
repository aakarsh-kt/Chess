import { Button } from '@mui/material';
import React, { useState } from 'react';

export default function TimeOptions(props) {
    const [selectedTime,setSelectedTime]=useState(null);
    const [mode,setMode]=useState(null);
  return (

    <div className='flex flex-col '>
      {selectedTime && <div>
        <h2 className='font-bold text-white bg-lime-400 text-center rounded-md h-10 cursor-pointer text-xl'>{selectedTime}</h2>
      </div>}
      <div className="flex flex-col ">
        <h3 className='font-bold text-orange-400'>Bullet</h3>
        <div className='bg-black'>
            <ul onClick={()=>setMode("bullet")} className='flex font-bold flex-row flex-wrap justify-between bg-black rounded-md p-1'>
                <li className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer' onClick={()=>setSelectedTime("1|0")}>1 min</li>
                <li className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer' onClick={()=>setSelectedTime("1|1")}>1|1</li>
                <li className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer' onClick={()=>setSelectedTime("2|1")}>2|1</li>
                <li className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer' onClick={()=>setSelectedTime("30 sec")}>30 sec</li>
                <li className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer' onClick={()=>setSelectedTime("20 sec|1")}>20 sec|1</li>
            </ul>
        </div>
        </div>
        <div className='flex flex-col'>
        <h3 className='font-bold text-orange-400'>Blitz</h3>
        <div>
            <ul onClick={()=>setMode("blitz")} className='flex font-bold flex-row justify-between bg-black rounded-md p-1'>
                <li onClick={()=>setSelectedTime("3|0")} className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer'>3 min</li>
                <li onClick={()=>setSelectedTime("3|2")} className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer'>3|2</li>
                <li onClick={()=>setSelectedTime("5|0")} className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer'>5 min</li>
                <li onClick={()=>setSelectedTime("5|5")} className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer'>5|5</li>
                <li onClick={()=>setSelectedTime("5|2")} className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer'>5|2</li>
            </ul>
        </div>
        </div>
        <div className='flex flex-col'>
        <h3 className='font-bold text-orange-400'>Rapid</h3>
        <div>
            <ul onClick={()=>setMode("rapid")} className='flex flex-row justify-between bg-black rounded-md font-bold p-1 flex-wrap'>
                <li onClick={()=>setSelectedTime("10|0")} className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer '>10 min</li>
                <li onClick={()=>setSelectedTime("15|10")}className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer '>15|10</li>
                <li onClick={()=>setSelectedTime("30|0")} className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer '>30 min</li>
                <li onClick={()=>setSelectedTime("10|5")} className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer '>10|5</li>
                <li onClick={()=>setSelectedTime("20|0")} className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer '>20 min</li>
                <li onClick={()=>setSelectedTime("60|0")} className='bg-lime-300 w-20 m-1 p-2 rounded-md cursor-pointer '>60 min</li>
            </ul>
        </div>
        </div>
        <div className='flex flex-row  justify-center mt-5  '>
        <button onClick={()=>props.setTime(mode,selectedTime)}  className="text-xl bg-orange-500 rounded-md py-1 w-32 text-white font-bold" >Start</button>
        </div>
          
    
    </div>
  );
}
