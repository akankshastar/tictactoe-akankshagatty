import { Component } from '@angular/core';
class Player {
  state: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const winStates = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0],
  [1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1]
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  player1 = new Player('Bibi');
  player2 = new Player('Ganz');
  moveCounter = 0;
  currentPlayer = this.player1;
  //board = [null, null, null, null, null, null, null, null, null];
  board:any= Array(9).fill(null);;
  move(index:number, player: Player) {
    if (this.player1.state[index] === 0 && this.player2.state[index] === 0) {
      player.state[index] = 1;
      this.moveCounter++;
      this.board[index] = this.currentPlayer === this.player1 ? 'x' : 'o';
      if (this.moveCounter > 4) {
        this.checkWin(this.currentPlayer);
      }    
      this.currentPlayer = this.switchCurrentPlayer();
    } else {
      alert("can't move");
    }
  }

  switchCurrentPlayer() {
    return this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  checkWin(player: Player) {
    for (let state of winStates) {
      const win = state.every((val, index) => player.state[index] === 1 && val === 1);
      if (win) {
        this.endGame();
      }
    }
  }
  
  endGame() {
    alert(this.currentPlayer.name + ' Win');
    this.player1 = new Player('Bibi');
    this.player2 = new Player('Ganz');
    this.board = [null, null, null, null, null, null, null, null, null];
    this.moveCounter = 0;
  }
}