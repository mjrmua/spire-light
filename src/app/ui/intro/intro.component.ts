import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/modal.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  constructor(private modalService:ModalService) { }

  ngOnInit() {
  }

  close(){

    this.modalService.close();
  }

}
