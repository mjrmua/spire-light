import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';
import { Card } from "./Card";
import { Planet } from './planet';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  constructor(private state: GameStateService) { }

  jump(planet: Planet)  {
    this.state.jump(planet);
  }

  buy(i: any): any {
    this.state.buy(i);
  }

  play(card: Card){
    this.state.play(card);
  }

  endTurn(){
    this.state.endTurn();
  }

  startGame(){
    this.state.startGame();
  }

  startJump(): any {
    this.state.startJump();
  }
}
