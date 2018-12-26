import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/logic/Card';
import { ModalService } from 'src/app/modal.service';

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.scss']
})
export class ViewCardsComponent implements OnInit {

  cards: Card[];

  constructor(private service:ModalService) { }

  ngOnInit() {
  }

  close(){
    this.service.close();
  }
}
