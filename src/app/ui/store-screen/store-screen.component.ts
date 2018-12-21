import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/logic/state';
import { GameStateService } from '../../logic/game-state.service';
import { CommandService } from '../../logic/command.service';

@Component({
  selector: 'store-screen',
  templateUrl: './store-screen.component.html',
  styleUrls: ['./store-screen.component.css']
})
export class StoreScreenComponent implements OnInit {

  state:State;
  constructor( private commandService: CommandService,
    stateService: GameStateService,
  ){
    this.state=stateService.state;
  }

  done(){
    this.commandService.startJump();
  }

  buy(i){
    this.commandService.buy(i);
  }

  ngOnInit() {
  }

}
