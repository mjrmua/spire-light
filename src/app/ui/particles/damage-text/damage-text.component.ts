import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition, } from '@angular/animations'; 

@Component({
  selector: 'app-damage-text',
  templateUrl: './damage-text.component.html',
  styleUrls: ['./damage-text.component.css'],
  animations: [
    trigger('animate', [
      state('finished', style({
        transform: 'translateY(-100px)'
      })),
      transition('void => finished', [
        animate('1s')
      ]),
    ]),
  ],
})
export class DamageTextComponent implements OnInit {
  value=0;
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
