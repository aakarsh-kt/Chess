
import { WebSocketServer } from 'ws';
import GameManager from './GameManager.js';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200);
    res.end('Server is healthy');
  }
});

const wss = new WebSocketServer({ noServer: true });

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  gameManager.addUser(ws);

  ws.on('message', function message(data) {
    console.log('Received message:', data);
  });

  ws.on('close', () => {
    console.log('Player disconnected');
    gameManager.removeUser(ws);
  });

  ws.send('Welcome to the Chess Game!');
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
// import express from 'express';  // Use Express for easier handling of routes and requests
// import Pusher from 'pusher';
// import GameManager from './GameManager.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8080;

// // Initialize Pusher
// const pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: process.env.PUSHER_CLUSTER,
//   useTLS: true
// });

// const gameManager = new GameManager();

// app.use(express.json()); // Middleware to parse JSON bodies

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).send('Server is healthy');
// });

// // Endpoint to trigger a Pusher event when a player connects
// app.post('/connect', (req, res) => {
//   const { userId } = req.body;

//   // Simulate adding a user to the game
//   gameManager.addUser(userId);

//   pusher.trigger('chess-game', 'player-connected', { userId });

//   res.status(200).send('Player connected');
// });

// // Endpoint to trigger a Pusher event when a player disconnects
// app.post('/disconnect', (req, res) => {
//   const { userId } = req.body;

//   // Simulate removing a user from the game
//   gameManager.removeUser(userId);

//   pusher.trigger('chess-game', 'player-disconnected', { userId });

//   res.status(200).send('Player disconnected');
// });

// // Endpoint to trigger a Pusher event when a message is received
// app.post('/message', (req, res) => {
//   const { userId, message } = req.body;

//   pusher.trigger('chess-game', 'new-message', { userId, message });

//   res.status(200).send('Message received');
// });

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });
