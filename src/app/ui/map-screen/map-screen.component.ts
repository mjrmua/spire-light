import { Component, OnInit } from '@angular/core';
import { State } from '../../logic/state';
import { CommandService } from '../../logic/command.service';
import { GameStateService } from '../../logic/game-state.service';

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
