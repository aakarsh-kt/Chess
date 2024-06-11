import Game from "./Game.js";
import { INIT_GAME, MOVE } from "./messages.js";
// import { gameCollectionRef } from "../../frontend/src/firebase.js";
// import { db } from "./firebaseBack.js";
// import { set } from "firebase/database";
// import { addDoc, serverTimestamp } from "firebase/firestore";
export default class GameManager {
  // addGame = async (game, player1, player2) => {
  //   const docRef = db.collection('gameCollectionRef').doc("123");
  //   await docRef.set({
  //     game: game,
  //     player1: player1,
  //     player2: player2,
  //   });
  //   console.log("Document written successfully.");
  // };
  constructor() {
    this.games = [];
    this.users = [];
    this.pendingUsers = [];
  }

  addUser(socket) {
    this.users.push(socket);
    this.addHandler(socket);
  }

  removeUser(socket) {
    this.users = this.users.filter((user) => user !== socket);
  }

  addHandler(socket) {
    console.log(this.users.length);
    socket.emit("Player Connected", "You are connected");

    socket.on("message", (data) => {
      console.log("in GameManager");
      try {
        const message = JSON.parse(data);
        console.log("Received message", message);

        if (message.type === INIT_GAME) {
          if (this.pendingUsers.length > 0) {
            const opponentSocket = this.pendingUsers.pop();
            const game = new Game(socket, opponentSocket);
            // console.log(game);
            // addGame(game, this.player1, this.player2);
            this.games.push(game);
           
            // console.log(socket, opponentSocket); 

          } else {
            this.pendingUsers.push(socket);
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
