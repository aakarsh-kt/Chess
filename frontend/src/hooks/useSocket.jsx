// import { useState, useEffect } from "react";

// export const useSocket = () => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const ws = new WebSocket("wss://13.233.230.204:8080"); // Update this line

//     // const ws = new WebSocket("ws://localhost:8080");
//     ws.onopen = () => {
//       console.log("Connected to server");
//       setSocket(ws);
//     };
//     ws.onclose = () => {
//       console.log("Disconnected from server");
//       setSocket(null);
//     };
//     return () => {
//       ws.close();
//     };
//   }, []);
  
//   return socket;
// };
import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

export const useSocket = () => {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher("05b11be49aff7d0d9690", {
      cluster: "9f08513467fe7b5c8f7a",
      encrypted: true
    });

    // Subscribe to the channel
    const channel = pusher.subscribe('chess-game');
    setChannel(channel);

    // Bind to events
    channel.bind('player-connected', (data) => {
      console.log('Player connected:', data.userId);
      // Handle player connected logic
    });

    channel.bind('player-disconnected', (data) => {
      console.log('Player disconnected:', data.userId);
      // Handle player disconnected logic
    });

    channel.bind('new-message', (data) => {
      console.log('New message:', data.message);
      // Handle new message logic
    });

    // Cleanup on component unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return channel;
};
