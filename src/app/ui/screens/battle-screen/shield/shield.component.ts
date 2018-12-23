import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shield',
  templateUrl: './shield.component.html',
  styleUrls: ['./shield.component.css']
})
export class ShieldComponent implements OnInit {
  @Input() target;
  constructor() { }

  ngOnInit() {
  }
  onClick() {
  }
}
