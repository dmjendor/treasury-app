import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'option-quantity',
  templateUrl: './option-quantity.component.html',
  styleUrls: ['./option-quantity.component.css']
})
export class OptionQuantityComponent {
  @Output('optvalChange') emitter1: EventEmitter<number> = new EventEmitter<number>();
  @Output('totalcostChange') emitter2: EventEmitter<number> = new EventEmitter<number>();
  @Input('baseval') set setBaseVal(value) {
    this.base = value;
  }
  @Input('optval') set setOptValue(value) {
    this.count = value;
  }
  @Input('costval') set setCostValue(value) {
    this.cost = value;
  }
  @Input('totalcost') set setTotalCostValue(value) {
    this.totalcost = value;
  }
  @Input('step') set setStepValue(value) {
    this.step = value;
  }
  @Input('max') set setMaxValue(value) {
    this.max = value;
  }

  step = 1;
  max = 10;
  base = 0;
  count = 0;
  cost = 0;
  totalcost = 0;

  increment() {
    if (this.count < this.max) {
      this.count += this.step;
      this.totalcost += this.cost * this.step;
      this.emitter1.emit(this.count);
      this.emitter2.emit(this.totalcost);
    }
  }

  decrement() {
    if (this.count > this.base) {
      this.count -= this.step;
      this.totalcost -= this.cost * this.step;
      this.emitter1.emit(this.count);
      this.emitter2.emit(this.totalcost);
    }
  }

  onChange() {
    this.emitter2.emit(this.totalcost);
    this.emitter1.emit(this.count);
  }

}
