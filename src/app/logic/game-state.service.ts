import { Injectable } from '@angular/core';
import { START_STATE, View } from './state';
import { Card } from "./Card";
import { Baddie } from './Baddie';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Planet } from './planet';

export interface GameEventHandler{
  baddieHealthLoss?:(amount:number)=>void;
  playerBlocksDamage?:(damage:number)=>void;
  baddieBlocksDamage?:(damage:number)=>void;
  playerHealthLoss?:(value:number)=>void;
}

const defaultHandlers: GameEventHandler = {
  baddieHealthLoss:_=>null,
  playerBlocksDamage:_=>null,
  baddieBlocksDamage:_=>null,
  playerHealthLoss:_=>null,
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  startBattle(baddie: Baddie): any {
    this.state.view=View.Battle;
    this.state.baddie=baddie;
  }

  startJump(): any {
    this.state.view= View.Map;
  }

  jump(location:Planet){
    this.state.level++;
    location.land(this);
  }

  buy(i: any): any {
    var card = this.state.store.forSale[i];
    if (card.purchasePrice>this.state.money) return;
    this.state.money-=card.purchasePrice;
    this.state.store.forSale.splice(i,1);
    this.state.deck.push(card);
  }

  addEnergy(amount: number): any {
    this.state.energy.current+=amount;
  }

  startGame(): any {
    this.state=START_STATE;
    this.state.drawStack = [...this.state.deck];
    shuffle(this.state.drawStack);
    this.startTurn();
  }
  private events = new Subject<((v:GameEventHandler)=>void)>();

  subscribe(handler, terminator) 
  {
    var allHandlers = {...defaultHandlers};
    Object.assign(allHandlers,handler);
    this.events
      .pipe(takeUntil(terminator))
      .subscribe(v=>{
        v(allHandlers);
      });
  }

  damagePlayer(damage: any): any {
    var blockedDamage = Math.min(damage,this.state.shield);

    if (blockedDamage>0)
    {
      this.events.next(v=>v.playerBlocksDamage(blockedDamage));
      this.state.shield-=blockedDamage;
    }

    const effectiveDamage = Math.min(this.state.health.current, damage-blockedDamage);

    this.state.health.current-=effectiveDamage;

    this.events.next(v=>v.playerHealthLoss(effectiveDamage));

    if (this.state.health.current<=0)
    {
      this.killPlayer();
    }
  }

  killPlayer(): any {
    alert("Game over man!");
  }

  state = START_STATE;
  constructor() { }

  discard(card: Card){
    var index = this.state.hand.indexOf(card);
    if (index==-1) return;
    this.state.hand.splice(index,1);
    this.state.discards.push(card);
  }

  damageBaddie(damage: number){
    var blockedDamage = Math.min(damage,this.state.baddie.shield);

    if (blockedDamage>0)
    {
      this.events.next(v=>v.baddieBlocksDamage(blockedDamage));
      this.state.baddie.shield-=blockedDamage;
    }

    const effectiveDamage = Math.min(this.state.baddie.health.current, damage-blockedDamage);

    this.state.baddie.health.current-=effectiveDamage;

    this.events.next(v=>v.baddieHealthLoss(effectiveDamage));

    if (this.state.baddie.health.current<=0)
    {
      this.killBaddie();
    }
  }

  killBaddie(){
    alert("Victory!");
  }

  addShields(shields: number) {
    this.state.shield+=shields;
  }

  play(card: Card): any {
    if (this.state.energy.current<card.energyCost) return;
    this.state.energy.current-=card.energyCost;
    card.apply(this);
    switch(card.type){
      case "Cargo": this.jettison(card); break;
      case "Attack": 
      case "Engineering": this.discard(card); break;
      case "Drone":       this.discard(card); break;
    }
    this.discard(card);
  }

  jettison(card: Card): any {
    this.state.deck.splice(this.state.deck.indexOf(card),1);
    this.state.hand.splice(this.state.hand.indexOf(card),1);
  }

  endTurn(): any {
    this.state.baddie.act(this);
    this.startTurn();
  }

  refreshDrawStack(){
    this.state.drawStack = this.state.drawStack.concat(this.state.discards);
    shuffle(this.state.drawStack);
    this.state.discards=[];
  }

  startTurn(){
    this.state.shield=0;
    this.state.energy.current=this.state.energy.maximum;
    for (const card of [...this.state.hand])
      this.discard(card);

    for (var i = 0; i<5; i++)
    {
      this.draw();
    }
  }

  draw(): any {
    if (this.state.drawStack.length==0 && this.state.discards.length>0)
      this.refreshDrawStack();
    if (this.state.drawStack.length==0) return;
    const card= this.state.drawStack.pop();
    this.state.hand.push(card);
  }
}
