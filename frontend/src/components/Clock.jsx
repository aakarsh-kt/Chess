import { Box } from '@mui/material';
import React, { useEffect } from 'react';

export default function Clock(props) {
    const [time,setTime]=useState(null);
    const [increment,setIncrement]=useState(null);  
    useEffect(()=>{
        let s=props.timeControl;
            for(let i=0;i<s.length;i++){
                if(s[i]==='|'){
                    setTime(s.slice(0,i));
                    setIncrement(s.slice(i+1,s.length));
                }
            }
    },[])
    return (
    <div>
      <Box className="flex flex-col items-center">
        <h2 className="text-white font-medium m-3">{props.time}</h2>
        </Box>
    </div>
  );
}
