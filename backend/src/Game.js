import {Chess} from "chess.js";
import { INIT_GAME, MOVE } from "./messages.js";

export default class Game {
  player1;
  player2;
  board;
  moves;
  movecount;
  // chess;
  startTime;
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.board=new Chess();
    this.movecount=0;
    // this.chess = new chess();

    this.startTime = new Date();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "w",
        },
      })
    );
 
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "b",
        },
      })
    );
  }

  makeMove(socket, move) {
    console.log(move, "in Game Class");
    try {
      this.board.move(move);
    } catch (e) {
      console.log(e);
      return;
    }

    if (this.board.isGameOver()) {
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "white" : "black",
          },
        })
      );
      return;
    }
    if (this.movecount % 2 === 0) {
      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    } else {
      this.player1.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }
    this.movecount++;
    console.log(this.movecount, "movecount");
  }
}
