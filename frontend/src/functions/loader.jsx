import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import React from 'react';
export default function CircularIndeterminate() {
    return (
      <Box sx={{ display: 'flex' }} className="flex flex-col items-center ">
        <CircularProgress />
        <h2 className='text-white font-medium m-3'>Searching for Opponent!!!</h2>
      </Box>
    );
  }