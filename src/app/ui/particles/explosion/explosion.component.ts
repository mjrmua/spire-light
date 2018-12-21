import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'explosion',
  templateUrl: './explosion.component.html',
  styleUrls: ['./explosion.component.css'],
   animations: [
    trigger('animate', [
      state('finished', style({
        backgroundPosition: "-1152px" 
      })),
      transition('void => finished', [
        animate('1s steps(12)')
      ]),
    ]),
  ],
})
export class ExplosionComponent implements OnInit {
  x=0;
  y=0;
  @Output() destroy = new EventEmitter();

  constructor() { }


  done(event){
    this.destroy.emit();
  }

  ngOnInit() {
  }

}
