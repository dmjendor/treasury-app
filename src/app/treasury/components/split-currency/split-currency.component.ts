import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterContentInit } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { CurrencyService } from 'app/shared/services/currency.service';
import { Currency } from 'shared/models/currency';
import { TreasuryCurrencyService } from 'app/treasury/services/treasury-currency.service';
import { Coin } from 'shared/models/coin';

@Component({
  selector: 'split-currency',
  templateUrl: './split-currency.component.html',
  styleUrls: ['./split-currency.component.css']
})
export class SplitCurrencyComponent implements OnInit, OnDestroy, AfterContentInit {
  @Input('vault') vault: Vault;
  @Output('splitChange') emitter1: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('split') set setSplitValue(value) {
    this.split = value;
  }
  split: boolean;
  partyNum: number = 0;
  coins: Coin[];
  mergedTotal: number;
  coinSub: Subscription;
  currencies: Currency[];
  splitCoins: any[] = [];
  tSplitCoins: any[] = [];
  currencySub: Subscription;

  constructor(
    private currencyService: CurrencyService,
    private coinService: TreasuryCurrencyService,
  ) { }

  ngOnInit() {
    this.partyNum = parseInt(sessionStorage.getItem('partyNum'), 10);
    if (this.vault.treasurySplit) {
      this.partyNum++;
    }
  }

  ngOnDestroy() {
    if (this.coinSub) {
      this.coinSub.unsubscribe();
    }
    if (this.currencySub) {
      this.currencySub.unsubscribe();
    }
  }

  ngAfterContentInit() {
    this.createSubscriptions();
  }

  createSubscriptions() {
    this.currencySub = this.currencyService.getCurrenciesByVault(this.vault.key)
    .subscribe(currency => {
      this.currencies = currency as Currency[];
      this.currencies.sort((a, b) => (a.multiplier < b.multiplier) ? 1 : ((b.multiplier < a.multiplier) ? -1 : 0));
      this.coinSub = this.coinService.getCoinRecordsByVault(this.vault.key)
      .subscribe(coin => {
        // filter out all archived results
        this.coins = coin.filter((cn) => cn.archived === false) as Coin[];
        if (this.vault.mergeSplit) {
          this.mergeSplit();
        } else {
          this.straightSplit();
        }
      });
    });
  }

  straightSplit() {
    // create a frozen copy of the coin array to prevent infinite recursion
    const currentCoinBatch = JSON.parse(JSON.stringify(this.coins));
    for (let q = 0; q < this.currencies.length; q++) {
      let curTotS = 0;
      for (let i = 0; i < currentCoinBatch.length; i++) {
        if (this.currencies[q].key === currentCoinBatch[i].currency) {
          curTotS += Math.floor(currentCoinBatch[i].value);
        }
      }
      const tTot = curTotS;
      const splitMod = (tTot % this.partyNum);
      const splitTotal = Math.floor(tTot / this.partyNum);
      if (this.vault.treasurySplit) {
        const tSplitTotal = splitTotal + splitMod;
        this.tSplitCoins.push({name: this.currencies[q].name, value: tSplitTotal, key: this.currencies[q].key});
      }
      this.splitCoins.push({name: this.currencies[q].name, value: splitTotal, key: this.currencies[q].key});
    }
    for (let r = 0; r < currentCoinBatch.length; r++) {
      currentCoinBatch[r].archived = true;
    }
    if (this.vault.treasurySplit) {
      for (let o = 0; o < this.tSplitCoins.length; o++) {
        // currentCoinBatch[i].archived = true;
        const coin =
          {
            archived: false,
            changeby: sessionStorage.getItem('userId'),
            value: this.tSplitCoins[o].value,
            vault: this.vault.key,
            currency: this.tSplitCoins[o].key
            } as Coin;
        console.log(coin);
      }
    }
  }

  mergeSplit() {
    // create a frozen copy of the coin array to prevent infinite recursion
    const currentCoinBatch = JSON.parse(JSON.stringify(this.coins));
    this.mergedTotal = 0;
    for (let i = 0; i < currentCoinBatch.length; i++) {
      const curr = this.currencies.find((cncy) => cncy.key === currentCoinBatch[i].currency);
      this.mergedTotal += currentCoinBatch[i].value * curr.multiplier;
    }
    let splitTotal = this.mergedTotal / this.partyNum;
    const splitMod = (this.mergedTotal % this.partyNum);
    for (let q = 0; q < this.currencies.length; q++) {
      const curTot = Math.floor(splitTotal / this.currencies[q].multiplier);
      splitTotal = splitTotal % this.currencies[q].multiplier;
      if (this.vault.treasurySplit) {
        let tTot = curTot;
        if (this.currencies[q].multiplier === 1 && splitTotal !== 0) {
          tTot = tTot + splitMod;
        }
        this.tSplitCoins.push({name: this.currencies[q].name, value: tTot, key: this.currencies[q].key});
      }
      this.splitCoins.push({name: this.currencies[q].name, value: curTot, key: this.currencies[q].key});
    }
    for (let r = 0; r < currentCoinBatch.length; r++) {
      currentCoinBatch[r].archived = true;
      this.coinService.update(currentCoinBatch[r].key, currentCoinBatch[r]);
    }
    if (this.vault.treasurySplit) {
      for (let o = 0; o < this.tSplitCoins.length; o++) {
        const coin =
          {
            archived: false,
            changeby: sessionStorage.getItem('userId'),
            value: this.tSplitCoins[o].value,
            vault: this.vault.key,
            currency: this.tSplitCoins[o].key
            } as Coin;
        console.log(coin);
        this.coinService.create(coin);
      }
    }

  }

  close() {
    this.emitter1.emit(false);
  }
}
