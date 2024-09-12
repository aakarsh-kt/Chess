import { WebSocketServer } from 'ws';
import GameManager from './GameManager.js';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200);
    res.end('Server is healthy');
  } else {
    // Serve the frontend
    const filePath = path.join(__dirname, '../frontend/build', req.url === '/' ? 'index.html' : req.url);
    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404);
          res.end('404 Not Found');
        } else {
          res.writeHead(500);
          res.end('Server Error');
        }
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      }
    });
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

