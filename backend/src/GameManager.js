import Game from "./Game.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages.js";
import admin from 'firebase-admin';
import serviceAccount from './chess-e3600-firebase-adminsdk-ckjup-4e265a5600.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chess-e3600-default-rtdb.firebaseio.com",
});

const db = admin.firestore();

export default class GameManager {
  constructor() {
    this.games = [];
    this.users = [];
    this.pendingUsers = {
      rapid: { "10|0": [], "15|10": [], "10|5": [], "30|0": [], "20|0": [], "60|0": [] },
      bullet: { "1|0": [], "1|1": [], "2|1": [], "20sec|1": [], "30sec|0": [] },
      blitz: { "3|0": [], "3|2": [], "5|0": [], "5|5": [], "5|2": [] },
    };
  }

  async addGame(game) {
    const obj = {
      id: game.id,
      player1: game.player1Info?.email,
      player2: game.player2Info?.email,
      timeControl: game.timeControl,
      subType: game.subType,
      startTime: game.startTime,
      winner: "",
      status: "ongoing"
    };
    const id=obj.id;
   
    try {
      const docRef = await db.collection("games").add(obj);
      game.docId = docRef.id;
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    const newObj= {
      id: game.docId ,
      player1: game.player1Info?.email,
      player2: game.player2Info?.email,
      timeControl: game.timeControl,
      subType: game.subType,
      startTime: game.startTime,
      winner: "",
      status: "ongoing"
    };
    await this.addGameToUser(game.player1Info?.email, newObj);
    await this.addGameToUser(game.player2Info?.email, newObj);
  }

  async addGameToUser(email, game) {
    const usersRef = db.collection('users');
    const q = usersRef.where('email', '==', email);
    const querySnapshot = await q.get();
    
    if (querySnapshot.empty) {
      console.log('No matching documents for email: ', email);
      return;
    }

    querySnapshot.forEach(async (doc) => {
      const docRef = doc.ref;
      try {
        await docRef.update({
          games: admin.firestore.FieldValue.arrayUnion(game)
        });
        console.log('Game added to user successfully');
      } catch (error) {
        console.error('Error adding game to user: ', error);
      }
    });
  }

  async updateGameResult(gameId, winnerEmail) {
    try {
      const gameRef = db.collection('games').doc(gameId);
      await gameRef.update({
        winner: winnerEmail,
        status: "finished"
      });
      console.log('Game result updated successfully');
      console.log(gameRef.id, "Game ID");
      // Update both users' documents
      const gameDoc = await gameRef.get();
      const gameData = gameDoc.data();
      console.log("<- Game Data    ID->",gameId);
      console.log(winnerEmail);
      await this.updateUserGameResult(gameData.player1, gameId, winnerEmail);
      await this.updateUserGameResult(gameData.player2, gameId, winnerEmail);

    } catch (error) {
      console.error('Error updating game result: ', error);
    }
  }

  async updateUserGameResult(email, gameId, winnerEmail) {
    const usersRef = db.collection('users');
    const q = usersRef.where('email', '==', email);
    const querySnapshot = await q.get();
    
    if (querySnapshot.empty) {
      console.log('No matching documents for email: ', email);
      return;
    }

    querySnapshot.forEach(async (doc) => {
      const userGames = doc.data().games.map(game => {
        if (game.id === gameId) {
          game.winner = (email === winnerEmail) ? "Win" : "Loss";
        }
        return game;
      });

      try {
        await doc.ref.update({
          games: userGames
        });
        console.log('User game result updated successfully');
      } catch (error) {
        console.error('Error updating user game result: ', error);
      }
    });
  }

  addUser(socket) {
    this.users.push(socket);
    this.addHandler(socket);
  }

  removeUser(socket) {
    this.users = this.users.filter((user) => user !== socket);
  }

  handleGame(socket, userInfo, timeControl, subType, category) {
    if (this.pendingUsers[category][subType].length > 0) {
      const opponentObj = this.pendingUsers[category][subType].pop();
      const opponentSocket = opponentObj.s;
      const opponentInfo = opponentObj.i;

      const game = new Game(
        socket,
        opponentSocket,
        timeControl,
        subType,
        userInfo,
        opponentInfo
      );
      this.games.push(game);
      this.addGame(game);
    } else {
      this.pendingUsers[category][subType].push({ s: socket, i: userInfo });
    }
  }

  addHandler(socket) {
    socket.emit("Player Connected", "You are connected");

    socket.on("message", (data) => {
      console.log("in GameManager");
      try {
        const message = JSON.parse(data);

        if (message.type === INIT_GAME) {
          const userInfo = message.userInfo;
          const timeControl = message.timeControl;
          const subType = message.subType;

          switch (timeControl) {
            case "blitz":
              this.handleGame(socket, userInfo, timeControl, subType, "blitz");
              break;
            case "bullet":
              this.handleGame(socket, userInfo, timeControl, subType, "bullet");
              break;
            case "rapid":
              this.handleGame(socket, userInfo, timeControl, subType, "rapid");
              break;
            default:
              console.log("Invalid time control");
          }
        }

        if (message.type === MOVE) {
          const game = this.games.find(
            (game) => game.player1 === socket || game.player2 === socket
          );
          if (game) {
            game.makeMove(socket, message.payload);
          }
        }

        if (message.type === GAME_OVER) {
          const winner = message.payload.winner;
          console.log("winner  ->  ", winner.email);
          const game = this.games.find(
            (game) => game.player1 === socket || game.player2 === socket
          );
          if (game) {
            game.gameOver(socket, winner);
            this.updateGameResult(game.docId, winner.email);
          }
        }
      } catch (error) {
        console.error("Failed to parse message", error);
      }
    });
  }
}
