import Game from "./Game.js";
import { INIT_GAME,MOVE } from "./messages.js";
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
      rapid: {
        "10|0": [],
        "15|10": [],
        "10|5": [],
        "30|0": [],
        "20|0": [],
        "60|0": [],
      },
      bullet: {
        "1|0": [],
        "1|1": [],
        "2|1": [],
        "20sec|1": [],
        "30sec|0": [],
      },
      blitz: {
        "3|0": [],
        "3|2": [],
        "5|0": [],
        "5|5": [],
        "5|2": [],
      },
    };
  }

  async addGame(game) {
    console.log(game);
    const obj = { id: game.id, player1: game.player1Info?.email, player2: game.player2Info?.email, timeControl: game.timeControl, subType: game.subType, startTime: game.startTime };
    try {
      const docRef = await db.collection("games").add(obj);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    const usersRef = db.collection('users');
    const q = usersRef.where('email', '==', game.player1Info?.email);
    const querySnapshot = await q.get();
    const userGame={ id: game.id, player1: game.player1Info?.email, player2: game.player2Info?.email, timeControl: game.timeControl, subType: game.subType, startTime: game.startTime}
    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    querySnapshot.forEach(async (doc) => {
      const docRef = doc.ref;
      try {
        await docRef.update({
          games: admin.firestore.FieldValue.arrayUnion(obj)
        });
        console.log('Game added to user successfully');
      } catch (error) {
        console.error('Error adding game to user: ', error);
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
      } catch (error) {
        console.error("Failed to parse message", error);
      }
    });
  }
}
