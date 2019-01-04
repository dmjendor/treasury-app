import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'dnc-edit',
  templateUrl: './dnc-edit.component.html',
  styleUrls: ['./dnc-edit.component.css']
})
export class DnCEditComponent {

  @Output('dncChange') emitter1: EventEmitter<number> = new EventEmitter<number>();
  @Output('totalCostChange') emitter2: EventEmitter<number> = new EventEmitter<number>();
  @Input('name') set setName(value) {
    this.name = value;
  }
  @Input('dnc') set setDnC(value) {
    this.dnc = value;
    console.log(this.name, this.dnc);
  }

  @Input('base') set setBase(value) {
    this.base = value;
  }

  @Input('totalCost') set setTotalCost(value) {
    this.totalCost = value;
  }

  name = '';
  base = 0;
  dnc = 0;
  totalCost = 0;

  constructor() {}

  resetCost() {
    this.totalCost -=  (0.25 * this.dnc);
    this.emitter2.emit(this.totalCost);
  }

  onChange() {
    document.getElementById(this.name).blur();
    this.totalCost += (0.25 * this.dnc);
    this.emitter1.emit(this.dnc);
    this.emitter2.emit(this.totalCost);
  }

}
