import { Component, Input, AfterContentInit } from '@angular/core';
import { PrepCoinService } from 'app/creator/services/prep-coin.service';
import { Currency } from 'shared/models/currency';
import { PrepCoin } from 'shared/models/prep-coin';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'prep-coin-input-form',
  templateUrl: './prep-coin-input-form.component.html',
  styleUrls: ['./prep-coin-input-form.component.css']
})
export class PrepCoinInputFormComponent implements AfterContentInit {
  @Input() currency: Currency;
  coin = new PrepCoin();
  id: string;

  constructor(
    private coinService: PrepCoinService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }


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
    this.coin.reward = this.id;
    this.coin.vault = this.currency.vault;
    this.coin.currency = this.currency.key;
    this.coin.changeby = sessionStorage.getItem('userId');
  }
}
