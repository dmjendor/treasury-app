import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Currency } from 'shared/models/currency';
import { FormGroup } from '@angular/forms';
import { Coin } from 'shared/models/coin';
import { TreasuryCurrencyService } from 'app/treasury/services/treasury-currency.service';
@Component({
  selector: 'coin-input-form',
  templateUrl: './coin-input-form.component.html',
  styleUrls: ['./coin-input-form.component.css']
})
export class CoinInputFormComponent implements AfterContentInit {
  @Input() currency: Currency;
  coin = new Coin();


  constructor(
    private coinService: TreasuryCurrencyService
  ) {}


  addCurrency() {
    this.coin.timestamp = Date.now();
    this.coinService.create(this.coin);
    this.coin.value = null;
  }

  subtractCurrency() {
    this.coin.timestamp = Date.now();
    this.coin.value = this.coin.value * -1;
    this.coinService.create(this.coin);
    this.coin.value = null;
  }

  ngAfterContentInit() {
    this.coin.value = null;
    this.coin.vault = this.currency.vault;
    this.coin.currency = this.currency.key;
    this.coin.changeby = sessionStorage.getItem('userId');
  }

}
