import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Spectate() {    
    const location =useLocation();
    const { games } = location.state || {}; 
  return (
    <div>
        <h1>Spectate</h1>
        {games.map((game,i)=>{
            return(
                <div key={i}>
                    <h2>Game ID:  {game.id}</h2>
                    <h2>Player 1: {game.player1}</h2>
                    <h2>Player 2: {game.player2}</h2>
                </div>
            );
        })}
        {/* <h2>Game ID: {games.gameId}</h2> */}
      
    </div>
  );
}
