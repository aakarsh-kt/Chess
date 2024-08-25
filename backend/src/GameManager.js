import Game from "./Game.js";
import { DRAW, FINISHED, GAME_OVER, GET_GAMES, INIT_GAME, MOVE, ON_GOING } from "./messages.js";
import admin from 'firebase-admin';
import dotenv from 'dotenv';


dotenv.config();
const serviceAccount={
  type: "service_account",
  project_id: "chess-e3600",
  private_key_id: "4e265a56002f52a77c53c6dfb6fa3019592ad7b8",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCf6oQSa/+fgfJt\n31lnTj8lrrG0k4XIDVeV7uKt/pK4hcBrkYhWN1IPz5ynHRGoiAsCaCsHgxQWWe/j\nC4MxxowBijUhb3t1+I0fdLt5M3OEI5wNsnjXR1yPWHQC8nHca5UrusEmqgXNgXa1\nMAMwBQDoHjzeel1kfDIy7DeSvhDixZU25BCvhj1nK9VRznOL6NhYqimyR0BZJbXp\n3X+2VkkMhR4bIDRGPpJPMO9y6DKMIN6lDT/dhiRgsq48r/0kGZb0fKNNLW17t8hK\nULUHoDqWiE2tckldw+o1VqCj0dbX0TXzVKTquW5PbcneiwR3OKn2/nLNvtmLJIkS\nE0b/KsKrAgMBAAECgf8vXsjArD03LXHNb4aMPiF2iB5xNJdB1gdGjVJDOFCTWGDS\nJx9maqdkXPDf5TyAhSFoanL/Rqosn3ean05oRZLeNz0wf6roHI2xQ7hFBCNegS3j\ni3qVoA31vb31IYbuREVr2WZd4v9/tgSep2+fnzElkSTMF8iSe40N3etDDLTzzMY7\nzEdUxIx4L6p/Ak+elF3o3FU2EPPEcMXbDcbgNA75iB3z1m5bSubvrDyqDKSRR3yJ\nga9ftL1t4JuxI7rM0NNjvG6NjM4exh76bdGGGDKottOAJYyVqCbfYFk4G0B+Qakb\n7yHPArmKEGh3npOn5PVCK0Di6JtTDrQaKWcYNWUCgYEA0/IWF/6hRaMn37abjeYe\nwCoxkC63ZCqSnNUJOQNuXQLhblZYHAJq1SEZ2C6KL5xcv+M64MhyMm/4BZe+uobP\n/fgpGVaPFZCsdAqsV/FaLcNjKTke++ei3hKikDeySqT8DKG5eY61inJEQ7PfD2dw\nLIHW/m3vUf8Xm2oycvSUYf0CgYEAwSfdrxzDnYFk1pu7tNO7gx6DCKxpnJpmg4uR\ncAJN+zC4McqPqVUTkaWt2w1jKe03R1MBcg2Rl3Y9oIiJb9RFzA4fQPheHoRgmSoX\n0/Z/QNtRpALDqYQP7sd1/YhoObeWMIYspBHT9AMCUSxESIco4RdT3NaK6TjJ4U0v\nlLkxI8cCgYEApDmXzv3ZPpk+g0T+YUQnHaVUBDF+npmyQt17qPa0pFNgE9vJp+Jj\nn0NnwC/HmT6iS3kpnRUUD2rdFpBPFD7zmQmZ5u1AL2iLh9rhUb9MrdsQ0ddV38DL\nXSG5XuAZQWd3ed4yVjMzDdSeeos8UrZGn+X3jevnHXT4eM8fyh0jgI0CgYBxmxMF\n9bMQJpS6rOogFxCItB95sH6Ff0KgSCyIZrKa9TLBBlSs0b8qwPmahys187G5n5aQ\nEG77WK4yh1vejElpFT1Ip0wkQtPWAi31m1uJN/Wys3WFdIkyddpt/hbfK52IeMI0\n1c+GC2cHezPGPMjMaz4F+6HEPoRuoUlE/g9q7QKBgQDNMQP7FBJxnUA0oNHg+3ys\n4WGMZOZBtzwO489Ykat4RD7AEkLIEUJKblKqIKUnLFIwynNshLkw2p/Jp1UYhwfj\nMjRXyM0qUIq/tP1w+z8d3sFfGSLqDXWPD//16uPzqMdRx2Sx06WhUWUdIss+os8E\nlu3fZTBCo8ePiSSSZ+ARvg==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-ckjup@chess-e3600.iam.gserviceaccount.com",
  client_id: "113106098887821369152",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ckjup%40chess-e3600.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}


// const serviceAccount = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   // private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCf6oQSa/+fgfJt\n31lnTj8lrrG0k4XIDVeV7uKt/pK4hcBrkYhWN1IPz5ynHRGoiAsCaCsHgxQWWe/j\nC4MxxowBijUhb3t1+I0fdLt5M3OEI5wNsnjXR1yPWHQC8nHca5UrusEmqgXNgXa1\nMAMwBQDoHjzeel1kfDIy7DeSvhDixZU25BCvhj1nK9VRznOL6NhYqimyR0BZJbXp\n3X+2VkkMhR4bIDRGPpJPMO9y6DKMIN6lDT/dhiRgsq48r/0kGZb0fKNNLW17t8hK\nULUHoDqWiE2tckldw+o1VqCj0dbX0TXzVKTquW5PbcneiwR3OKn2/nLNvtmLJIkS\nE0b/KsKrAgMBAAECgf8vXsjArD03LXHNb4aMPiF2iB5xNJdB1gdGjVJDOFCTWGDS\nJx9maqdkXPDf5TyAhSFoanL/Rqosn3ean05oRZLeNz0wf6roHI2xQ7hFBCNegS3j\ni3qVoA31vb31IYbuREVr2WZd4v9/tgSep2+fnzElkSTMF8iSe40N3etDDLTzzMY7\nzEdUxIx4L6p/Ak+elF3o3FU2EPPEcMXbDcbgNA75iB3z1m5bSubvrDyqDKSRR3yJ\nga9ftL1t4JuxI7rM0NNjvG6NjM4exh76bdGGGDKottOAJYyVqCbfYFk4G0B+Qakb\n7yHPArmKEGh3npOn5PVCK0Di6JtTDrQaKWcYNWUCgYEA0/IWF/6hRaMn37abjeYe\nwCoxkC63ZCqSnNUJOQNuXQLhblZYHAJq1SEZ2C6KL5xcv+M64MhyMm/4BZe+uobP\n/fgpGVaPFZCsdAqsV/FaLcNjKTke++ei3hKikDeySqT8DKG5eY61inJEQ7PfD2dw\nLIHW/m3vUf8Xm2oycvSUYf0CgYEAwSfdrxzDnYFk1pu7tNO7gx6DCKxpnJpmg4uR\ncAJN+zC4McqPqVUTkaWt2w1jKe03R1MBcg2Rl3Y9oIiJb9RFzA4fQPheHoRgmSoX\n0/Z/QNtRpALDqYQP7sd1/YhoObeWMIYspBHT9AMCUSxESIco4RdT3NaK6TjJ4U0v\nlLkxI8cCgYEApDmXzv3ZPpk+g0T+YUQnHaVUBDF+npmyQt17qPa0pFNgE9vJp+Jj\nn0NnwC/HmT6iS3kpnRUUD2rdFpBPFD7zmQmZ5u1AL2iLh9rhUb9MrdsQ0ddV38DL\nXSG5XuAZQWd3ed4yVjMzDdSeeos8UrZGn+X3jevnHXT4eM8fyh0jgI0CgYBxmxMF\n9bMQJpS6rOogFxCItB95sH6Ff0KgSCyIZrKa9TLBBlSs0b8qwPmahys187G5n5aQ\nEG77WK4yh1vejElpFT1Ip0wkQtPWAi31m1uJN/Wys3WFdIkyddpt/hbfK52IeMI0\n1c+GC2cHezPGPMjMaz4F+6HEPoRuoUlE/g9q7QKBgQDNMQP7FBJxnUA0oNHg+3ys\n4WGMZOZBtzwO489Ykat4RD7AEkLIEUJKblKqIKUnLFIwynNshLkw2p/Jp1UYhwfj\nMjRXyM0qUIq/tP1w+z8d3sFfGSLqDXWPD//16uPzqMdRx2Sx06WhUWUdIss+os8E\nlu3fZTBCo8ePiSSSZ+ARvg==\n-----END PRIVATE KEY-----\n",
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,  
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
//   universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
// };
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chess-e3600-default-rtdb.firebaseio.com",
});

const db = admin.firestore();
function sendGames(games, socket) {
  console.log("Sending games");
  console.log(games.length);
  const gameData = games.map(game => {
    return {
      id: game.docId,
      player1: game.player1Info?.email,
      player2: game.player2Info?.email,
      timeControl: game.timeControl,
      subType: game.subType,
      startTime: game.startTime,
      winner: game.winner,
      status: game.status
    };
  });
  socket.send(JSON.stringify({
    type: GET_GAMES,
    payload: gameData
  }));
}
export default class GameManager {
  constructor() {
    this.games = [];
    this.users = [];
    this.onGoingGames = [];
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
      status: ON_GOING
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
      status: ON_GOING
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
        status: FINISHED
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
          if(winnerEmail===DRAW)
            game.winner=DRAW;
          else
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
    const prevUser=this.users.find((user) => user === socket);
    if(prevUser){
      this.restoreGame(socket);
      this.addHandler(socket);
    }
    else{
    this.users.push(socket);
    this.addHandler(socket);
  }
  }
  restoreGame(socket){
    const game = this.onGoingGames.find(
      (game) => game.player1 === socket || game.player2 === socket
    );
    if (game) {
      // if(game.status===ON_GOING)
      // this.onGoingGames.push(game);
      game.restoreGame(socket);
    }
  }
  
  removeUser(socket) {

    this.users = this.users.filter((user) => user !== socket);
    //delete the game created by the user
    const game = this.games.find(
      (game) => game.player1 === socket || game.player2 === socket
    );
    if (game) {
      this.games = this.games.filter((g) => g !== game);
      this.updateGameResult(game.docId, DRAW);
    }
    //remove the user from pending users
    console.log("Removing user from pending users");
    for (const subType in this.pendingUsers) {
      for (const category in this.pendingUsers[subType]) {
        this.pendingUsers[subType][category] = this.pendingUsers[subType][category].filter(
          (user) => user.s !== socket
        );
      }
    }
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
      this.onGoingGames.push(game);
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
            const output=game.makeMove(socket, message.payload);
            if(output){

              if(output.type===GAME_OVER){
                const winner = message.payload.winner;
                console.log("winner  ->  ", winner.email);
                const game = this.games.find(
                  (game) => game.player1 === socket || game.player2 === socket
                );
                if (game) {
                  this.onGoingGames = this.onGoingGames.filter((game) => game !== game);
                  game.gameOver(socket, winner);
                
                  this.updateGameResult(game.docId, winner.email);
                }
              }
              if(output.type===DRAW){
                const winner = message.payload.winner;
                console.log("winner  ->  ", winner.email);
                const game = this.games.find(
                  (game) => game.player1 === socket || game.player2 === socket
                );
                if (game) {
                  this.onGoingGames = this.onGoingGames.filter((game) => game !== game);
                  game.gameOver(socket, winner);
                
                 
                  this.updateGameResult(game.docId, DRAW);
                }
              }
            }
          }
        }
        if(message.type===GET_GAMES){
          sendGames(this.games,socket);
        }

        if (message.type === GAME_OVER) {
          const winner = message.payload.winner;
          console.log("winner  ->  ", winner.email);
          const game = this.games.find(
            (game) => game.player1 === socket || game.player2 === socket
          );
          if (game) {
            this.onGoingGames = this.onGoingGames.filter((game) => game !== game);
            game.gameOver(socket, winner);
            if(winner===DRAW){
                this.updateGameResult(game.docId, winner);
            }
            else
            this.updateGameResult(game.docId, winner.email);
          }
        }
      } catch (error) {
        console.error("Failed to parse message", error);
      }
    });
  }
}
