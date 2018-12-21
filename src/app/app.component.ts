import { Component, OnDestroy, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import {CdkDragDrop } from '@angular/cdk/drag-drop';
import { CommandService } from './logic/command.service';
import { START_STATE, State } from './logic/state';
import { GameStateService } from './logic/game-state.service';
import { Subject } from 'rxjs';
import { ParticlesComponent } from './ui/particles/particles.component';
import { DamageTextComponent } from 'src/app/ui/particles/damage-text/damage-text.component';
import { ExplosionComponent } from './ui/particles/explosion/explosion.component';
import { Card } from './logic/Card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('particles') particles:ParticlesComponent;
  @ViewChild('player') playerRef;
  @ViewChild('baddie') baddieRef;

  title = 'spire';
  get cards() { return this.state.hand;}
  state:State;
  selectedCard: Card;

  private unsubscribe: Subject<void> = new Subject();

  constructor( private commandService: CommandService,
    stateService: GameStateService,

  ){
    this.state=stateService.state;
    const self=this;
    /*
    stateService.subscribe({
      baddieHealthLoss: amount =>{
        const baddieRect = self.baddieRef.nativeElement.getBoundingClientRect();
        const explosion = self.particles.spawn(ExplosionComponent).instance;
        explosion.x=baddieRect.left+baddieRect.width/2;
        explosion.y=baddieRect.top+baddieRect.height/2;
        setTimeout(_=>{
        const text:any = self.particles.spawn(DamageTextComponent).instance;
        text.value=amount;
        text.x = baddieRect.left+baddieRect.width/2;
        text.y = baddieRect.top;
        },250);
      }
    },this.unsubscribe);
    */
  }

  ngOnInit(): void {
    this.commandService.startGame();
  }

  startDrag(card){
    this.selectedCard = card;
  }

  playErrorMessage(){
    if (!this.selectedCard) return "No card selected";
    if (this.selectedCard.energyCost > this.state.energy.current)
      return "Not enough energy";
    return false;
  }

  verb(){
    if (!this.selectedCard) return "";
    switch (this.selectedCard.type){
      case "Engineering": return "Make it so!";
      case "Attack": return "Fire!";
      case "Drone": return "Launch";
      case "Cargo": return "Jettison";
    }
  }


  style (i){
    var index = i-Math.floor(this.cards.length /2);
    const posX  = 0;
    const posY  = Math.abs(index)*(20);
    const rotation = index*5;
    return {'transform':`translateY(${posY}px) translateX(${posX}px) rotateZ(${rotation}deg)` }
  }

  play(){
    if(!this.selectedCard) return;
    this.commandService.play(this.selectedCard);
  }

  endTurn(){
    this.commandService.endTurn();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete(); 
  }
}
