import { Chess } from "chess.js";
import { INIT_GAME, MOVE, GAME_OVER, DRAW } from "./messages.js";
import { time } from "console";
import {nanoid} from "nanoid";

export default class Game {
  constructor(player1, player2, timeControl, subType,player1Info,player2Info) {
    this.id=nanoid();
    this.player1 = player1;
    this.player2 = player2;
    this.player1Info=player1Info;
    this.player2Info=player2Info;
    this.timeControl = timeControl;
    this.subType = subType;
    this.board = new Chess();
    this.movecount = 0;
    this.startTime = new Date();
    
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "w",
        },
        opponent: player2Info,
      })
    );

    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "b",
        },
        opponent: player1Info,
      })
    );
  }

  gameOver(socket,winner){
    if(socket===this.player1)
    {
      this.player2.send(
        JSON.stringify({
          type:GAME_OVER,
          payload:{
            winner:winner,
          }
        })
      );
    }
    else{
      this.player1.send(
        JSON.stringify({
          type:GAME_OVER,
          payload:{
            winner:winner,
          }
        })
      );
    }
    console.log( JSON.stringify({
      type:GAME_OVER,
      payload:{
        winner:winner,
      }
    }));
  }

  makeMove(socket, move) {
    console.log(move, "in Game Class");

    // Validate the move before making it
    const result = this.board.move(move);
    if (!result) {
      console.log("Invalid move:", move);
      return;
    }

    // Check for game over
    if (this.board.isCheckmate()) {
      const winner = this.board.turn() === "w" ? 'b' : "w";
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: winner,
          },
        })
      );
      this.player2.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: winner,
          },
        })
      );
      return;
    }
    //check for draw
    if(this.board.isDraw() || this.board.isStalemate() || this.board.isThreefoldRepetition()){
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: DRAW,
          },
        })
      );
      this.player2.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: DRAW,
          },
        })
      );
      return;
    }
    // Send the move to the other player
    const opponent = socket === this.player1 ? this.player2 : this.player1;
    opponent.send(
      JSON.stringify({
        type: MOVE,
        payload: move,
      })
    );

    this.movecount++;
    // console.log(this.movecount, 'movecount');
  }
}
