import { Component, OnInit, Input } from '@angular/core';
import { Card } from "src/app/logic/Card";

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card:Card;

  constructor() { 
  }

  ngOnInit() {
  }
}
