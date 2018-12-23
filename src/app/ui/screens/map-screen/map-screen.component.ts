import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/logic/state';
import { GameStateService } from 'src/app/logic/game-state.service';
import { CommandService } from 'src/app/logic/command.service';

@Component({
  selector: 'map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent implements OnInit {
    state:State;j
    constructor( private commandService: CommandService,
    stateService: GameStateService,
  ){
    this.state=stateService.state;
  }

  jump(location){
    this.commandService.jump(location);
  }

  ngOnInit() {
  }

}
