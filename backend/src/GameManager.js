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
        "3|0":[],
        "3|2":[],
        "5|0":[],
        "5|5":[],
        "5|2":[],
      },
    };
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
        // console.log("Received message", message);

        if (message.type === INIT_GAME) {
          const userInfo=message.userInfo;
          console.log(userInfo);
          if(message.timeControl==="blitz")
            {
              const subType=message.subType;
              switch(subType)
             { 
              case "3|0":{
                if (this.pendingUsers.blitz["3|0"].length > 0) {
                const {opponentSocket,opponentInfo} = this.pendingUsers.blitz["3|0"].pop();
                
                const game = new Game(socket, opponentSocket,message.timeControl,subType,userInfo,opponentInfo);
                this.games.push({game});
            } else {
                this.pendingUsers.blitz["3|0"].push({socket,userInfo});
              }
              break;
            
            }
              case "3|2":{
                if(this.pendingUsers.blitz["3|2"].length>0)
                  {
                    const opponentSocket = this.pendingUsers.blitz["3|2"].pop();
                    const game = new Game(socket, opponentSocket,message.timeControl,subType);
                    this.games.push(game);
                  }
                else{
                  this.pendingUsers.blitz["3|2"].push(socket);
                }
              break;
                }
              case "5|0":{
                if(this.pendingUsers.blitz["5|0"].length>0)
                  {
                    const opponentSocket = this.pendingUsers.blitz["5|0"].pop();
                    const game = new Game(socket, opponentSocket,message.timeControl,subType);
                    this.games.push(game);
                  }
                else{
                  this.pendingUsers.blitz["5|0"].push(socket);
                }
                break;
              }
              case "5|5":{
                if(this.pendingUsers.blitz["5|5"].length>0)
                  {
                    const opponentSocket = this.pendingUsers.blitz["5|5"].pop();
                    const game = new Game(socket, opponentSocket,message.timeControl,subType);
                    this.games.push(game);
                  }
                else{
                  this.pendingUsers.blitz["5|5"].push(socket);
                }
                break;
              }
              case "5|2":{
                if(this.pendingUsers.blitz["5|2"].length>0)
                  {
                    const opponentSocket = this.pendingUsers.blitz["5|2"].pop();
                    const game = new Game(socket, opponentSocket,message.timeControl,subType);
                    this.games.push(game);
                  }
                else{
                  this.pendingUsers.blitz["5|2"].push(socket);
                }
                break;
              }
                default:console.log("Invalid subType");
              
                
              }
            }
          else if(message.timeControl==="bullet")
          {
            const subType=message.subType;
            switch(subType)
           { 
            case "1|0":{
              if (this.pendingUsers.bullet["1|0"].length > 0) {
              const opponentSocket = this.pendingUsers.bullet["1|0"].pop();
              const game = new Game(socket, opponentSocket,message.timeControl,subType);
              this.games.push(game);
            } else {
              this.pendingUsers.bullet["1|0"].push(socket);
            }
            break;
          
          }
            case "1|1":{
              if(this.pendingUsers.bullet["1|1"].length>0)
                {
                  const opponentSocket = this.pendingUsers.bullet["1|1"].pop();
                  const game = new Game(socket, opponentSocket,message.timeControl,subType);
                  this.games.push(game);
                }
              else{
                this.pendingUsers.bullet["1|1"].push(socket);
              }
            break;
              }
            case "2|1":{
              if(this.pendingUsers.bullet["2|1"].length>0)
                {
                  const opponentSocket = this.pendingUsers.bullet["2|1"].pop();
                  const game = new Game(socket, opponentSocket,message.timeControl,subType);
                  this.games.push(game);
                }
              else{
                this.pendingUsers.bullet["2|1"].push(socket);
              }
              break;
            }
            case "20sec|1":{
              if(this.pendingUsers.bullet["20sec|1"].length>0)
                {
                  const opponentSocket = this.pendingUsers.bullet["20sec|1"].pop();
                  const game = new Game(socket, opponentSocket,message.timeControl,subType);
                  this.games.push(game);
                }
              else{
                this.pendingUsers.bullet["20sec|1"].push(socket);
              }
              break;
            }
            case "30sec|0":{
              if(this.pendingUsers.bullet["30sec"].length>0)
                {
                  const opponentSocket = this.pendingUsers.bullet["30sec"].pop();
                  const game = new Game(socket, opponentSocket,message.timeControl,subType);
                  this.games.push(game);
                }
              else{
                this.pendingUsers.bullet["30sec"].push(socket);
              }
              break;
            }
              default:console.log("Invalid subType");
            
              
            }
          }
          else if(message.timeControl==="rapid")
            {
              const subType=message.subType;
              switch(subType)
             { 
              case "10|0":{
                if (this.pendingUsers.rapid["10|0"].length > 0) {
                const opponentSocket = this.pendingUsers.rapid["10|0"].pop();
                const game = new Game(socket, opponentSocket,message.timeControl,subType);
                this.games.push(game);
       
    
              } else {
                this.pendingUsers.rapid["10|0"].push(socket);
              }
              break;
            
            }
              case "15|10":{
                if(this.pendingUsers.rapid["15|10"].length>0)
                  {
                    const opponentSocket = this.pendingUsers.rapid["15|10"].pop();
                    const game = new Game(socket, opponentSocket,message.timeControl,subType);
                    this.games.push(game);
                  }
                else{
                  this.pendingUsers.rapid["15|10"].push(socket);
                }
              break;
                }
              case "30|0":{
                if(this.pendingUsers.rapid["30|0"].length>0)
                  {
                    const opponentSocket = this.pendingUsers.rapid["30|0"].pop();
                    const game = new Game(socket, opponentSocket,message.timeControl,subType);
                    this.games.push(game);
                  }
                else{
                  this.pendingUsers.rapid["30|0"].push(socket);
                }
                break;
              }
              case "10|5":{
                if(this.pendingUsers.rapid["10|5"].length>0)
                  {
                    const opponentSocket = this.pendingUsers.rapid["10|5"].pop();
                    const game = new Game(socket, opponentSocket,message.timeControl,subType);
                    this.games.push(game);
                  }
                else{
                  this.pendingUsers.rapid["10|5"].push(socket);
                }
                break;
              }
              case "20|0":{
                if(this.pendingUsers.rapid["20|0"].length>0)
                  {
                    const opponentSocket = this.pendingUsers.rapid["20|0"].pop();
                    const game = new Game(socket, opponentSocket,message.timeControl,subType);
                    this.games.push(game);
                  }
                else{
                  this.pendingUsers.rapid["20|0"].push(socket);
                }
                break;
              }
              case "60|0":{
                if(this.pendingUsers.rapid["60|0"].length>0)
                  {
                    const opponentSocket = this.pendingUsers.rapid["60|0"].pop();
                    const game = new Game(socket, opponentSocket,message.timeControl,subType);
                    this.games.push(game);
                  }
                else{
                  this.pendingUsers.rapid["60|0"].push(socket);
                }
                break;
              }
                default:console.log("Invalid subType");
              
                
              }
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
