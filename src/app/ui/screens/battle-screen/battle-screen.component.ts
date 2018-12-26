import { Component, OnInit, ViewChild } from '@angular/core';
import { ParticlesComponent } from '../../particles/particles.component';
import { Card } from 'src/app/logic/Card';
import { State } from 'src/app/logic/state';
import { Subject } from 'rxjs';
import { CommandService } from 'src/app/logic/command.service';
import { GameStateService } from 'src/app/logic/game-state.service';
import { ExplosionComponent } from '../../particles/explosion/explosion.component';
import { DamageTextComponent } from '../../particles/damage-text/damage-text.component';
import { ModalService } from 'src/app/modal.service';
import { ViewCardsComponent } from '../../view-cards/view-cards.component';

@Component({
  selector: 'battle-screen',
  templateUrl: './battle-screen.component.html',
  styleUrls: ['./battle-screen.component.css']
})
export class BattleScreenComponent implements OnInit {

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
    private modalService:ModalService
  ){
    this.state=stateService.state;
    const self=this;
    stateService.subscribe({
      baddieHealthLoss: amount =>{
        const rect = self.baddieRef.nativeElement.getBoundingClientRect();
        const explosion = self.particles.spawn(ExplosionComponent).instance;
        explosion.x=rect.left+rect.width/2;
        explosion.y=rect.top+rect.height/2;
        setTimeout(_=>{
        const text:any = self.particles.spawn(DamageTextComponent).instance;
        text.value=amount;
        text.x = rect.left+rect.width/2;
        text.y = rect.top;
        },250);
      },
      playerHealthLoss: amount =>{
        const rect = self.playerRef.nativeElement.getBoundingClientRect();
        const explosion = self.particles.spawn(ExplosionComponent).instance;
        explosion.x=rect.left+rect.width/2;
        explosion.y=rect.top+rect.height/2;
        setTimeout(_=>{
        const text:any = self.particles.spawn(DamageTextComponent).instance;
        text.value=amount;
        text.x = rect.left+rect.width/2;
        text.y = rect.top;
        },250);
      }
    },this.unsubscribe);
  }

  ngOnInit(): void {
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

  viewDrawDeck() {
      var view = this.modalService.open(ViewCardsComponent);
      view.cards=this.state.drawStack;
  }

  viewDiscards() {
      var view = this.modalService.open(ViewCardsComponent);
      view.cards=this.state.discards;
  }

}
