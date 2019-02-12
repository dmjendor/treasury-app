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
export class SplitCurrencyComponent implements OnInit, AfterContentInit {
  @Input('vault') vault: Vault;
  @Output('splitChange') emitter1: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('split') set setSplitValue(value) {
    this.split = value;
  }
  split: boolean;
  partyNum: number = 0;
  coins: Coin[] = [];
  coinSub: Subscription;
  currencies: Currency[] = [];
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

  ngAfterContentInit() {
    this.getCurrencies().toPromise().then((data) => {
      // convert the currency objects into an array with the key as a value
      Object.entries(data).forEach(([key, value]) => {
        const curr = value as Currency;
        curr['key'] = key;
        this.currencies.push(curr);
      });
      // sort the currencies by multiplier decending
      this.currencies.sort((a, b) => (a.multiplier < b.multiplier) ? 1 : ((b.multiplier < a.multiplier) ? -1 : 0));
      this.getCoins().toPromise().then((data2) => {
        // convert the coin objects into an array with the key as a value
        Object.entries(data2).forEach(([key, value]) => {
          const coin = value as Coin;
          coin['key'] = key;
          if (!coin.archived) {
            this.coins.push(coin);
          }
        });

        if (this.vault.mergeSplit) {
          this.mergeSplit();
        } else {
          this.straightSplit();
        }
      });
    });
  }

  getCoins() {
    return this.coinService.getSnapShot(this.vault.key);
  }

  getCurrencies() {
    return this.currencyService.getSnapshot(this.vault.key);
  }

  straightSplit() {
    for (let q = 0; q < this.currencies.length; q++) {
      let curTotS = 0;
      for (let i = 0; i < this.coins.length; i++) {
        if (this.currencies[q].key === this.coins[i].currency) {
          curTotS += Math.floor(this.coins[i].value);
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
    this.archiveCoin();
    if (this.vault.treasurySplit) {
      this.createTreasurySplit();
    }
  }

  mergeSplit() {
    let mergedTotal = 0;
    for (let i = 0; i < this.coins.length; i++) {
      const curr = this.currencies.find((cncy) => cncy.key === this.coins[i].currency);
      mergedTotal += this.coins[i].value * curr.multiplier;
    }
    let splitTotal = mergedTotal / this.partyNum;
    const splitMod = (mergedTotal % this.partyNum);
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
    this.archiveCoin();
    if (this.vault.treasurySplit) {
      this.createTreasurySplit();
    }

  }

  archiveCoin() {
    this.coinService.archiveCoin(this.coins);
  }

  createTreasurySplit() {
    const coinArray = [] as Coin[];
    for (let o = 0; o < this.tSplitCoins.length; o++) {
      if (this.tSplitCoins[o].value > 0) {
        const coin = {
          archived: false,
          changeby: sessionStorage.getItem('userId'),
          value: this.tSplitCoins[o].value,
          vault: this.vault.key,
          currency: this.tSplitCoins[o].key
        } as Coin;
        coinArray.push(coin);
      }
    }

    this.coinService.createTreasurySplit(coinArray);
  }

  close() {
    this.emitter1.emit(false);
  }
}
