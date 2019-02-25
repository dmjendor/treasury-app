import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreasuryCurrencyService } from 'app/treasury/services/treasury-currency.service';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Coin } from 'shared/models/coin';
import { Currency } from 'shared/models/currency';
import { Vault } from 'shared/models/vault';
import { CurrencyService } from 'shared/services/currency.service';
import { UtilityService } from 'shared/services/utility.service';
import { VaultService } from 'shared/services/vault.service';

@Component({
  selector: 'display-currency',
  templateUrl: './display-currency.component.html',
  styleUrls: ['./display-currency.component.css']
})
export class DisplayCurrencyComponent implements OnInit, OnChanges, OnDestroy {
  vault: Vault;
  coins: Coin[];
  displayCoins: Coin[] = [];
  coinSub: Subscription;
  currencies: Currency[];
  currencySub: Subscription;
  showDisplay: boolean = false;
  oldVault: string;
  private alive: boolean = true;

  constructor(
    private coinService: TreasuryCurrencyService,
    private currencyService: CurrencyService,
    private utilityService: UtilityService,
    private vaultService: VaultService,
    private route: ActivatedRoute

    ) {
  }

  async ngOnInit() {
    this.vaultService.activeVault$.pipe(takeWhile(() => this.alive)).subscribe(
      vault => {
          this.vault = vault;
          this.createSubscriptions();
    });
  }

  ngOnChanges() {
    if (this.vault && this.oldVault && this.vault.key  && (this.vault.key !== this.oldVault)) {
      this.destroySubscriptions().then((init) => {
        this.createSubscriptions();
      });
    }
  }

  ngOnDestroy() {
    this.destroySubscriptions();
  }

  destroySubscriptions() {
    const coinPromise = new Promise((resolve, reject) => {
      this.coinSub.unsubscribe();
      resolve();
      reject();
    });
    const currencyPromise = new Promise((resolve, reject) => {
      this.currencySub.unsubscribe();
      resolve();
      reject();
    });

    return coinPromise.then((a) => {
      currencyPromise.then((c) => {
        return true;
      });
    });
  }

  toggleDisplay() {
    this.showDisplay = !this.showDisplay;
  }

  currencyName(currencyID) {
    if (currencyID && this.currencies && this.currencies.length > 0) {
      for (let i = 0; i < this.currencies.length; i++) {
        if (this.currencies[i].key === currencyID) {
          return this.currencies[i].name;
        }
      }
    }
  }

  updateCoinList() {
    this.displayCoins = [];
    if (this.coins) {
      const grouped = this.utilityService.groupBy(this.coins, cn => cn.currency);
      this.currencies.forEach((item) => {
        const cns = grouped.get(item.key);
        if (cns) {
          const reduc = cns.reduce(function(previousValue: Coin, currentValue: Coin) {
            const val = (previousValue.value * 1) + (currentValue.value * 1);
            currentValue.value = val;
            return currentValue;
          });
          this.displayCoins.push(reduc);
        } else {
          this.displayCoins.push({currency: item.key, value: 0, vault: item.vault} as Coin);
        }
      });
    }
  }

  createSubscriptions() {
    if (this.vault && this.vault.key) {
      this.currencySub = this.currencyService.getCurrenciesByVault(this.vault.key)
      .subscribe(currency => {
        this.currencies = currency as Currency[];
        this.currencies.sort((a, b) => (a.multiplier < b.multiplier) ? 1 : ((b.multiplier < a.multiplier) ? -1 : 0));
        this.coinSub = this.coinService.getCoinRecordsByVault(this.vault.key)
        .subscribe(coin => {
          this.coins = coin.filter((cn) => cn.archived === false) as Coin[];
          this.updateCoinList();
        });
      });
    }

  }

  exchange(coin, direction) {
    const exchangecoins = [];
    this.getCoins(coin.currency).toPromise().then((cn) => {
      Object.entries(cn).forEach(([key, value]) => {
        const curr = value as Coin;
        curr['key'] = key;
        exchangecoins.push(curr);
      });
      const idx = this.currencies.findIndex((icn) => icn.key === coin.currency);
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      const newCoin = new Coin();
      newCoin.vault = coin.vault;
      newCoin.changeby = coin.changeby;
      newCoin.timestamp = Date.now();
      newCoin.value = Math.floor(coin.value / ( this.currencies[newIdx].multiplier / this.currencies[idx].multiplier));
      newCoin.currency = this.currencies[newIdx].key;
      this.archiveCoin(exchangecoins).then((a) => {
        this.coinService.create(newCoin);
        const mod = Math.floor(coin.value % ( this.currencies[newIdx].multiplier / this.currencies[idx].multiplier));
        if (mod !== 0) {
          const newCoinMod = new Coin();
          newCoinMod.vault = coin.vault;
          newCoinMod.changeby = coin.changeby;
          newCoinMod.timestamp = Date.now();
          newCoinMod.value = mod;
          newCoinMod.currency = this.currencies[idx].key;
          this.coinService.create(newCoinMod);
        }
      });
    });
  }

  getCoins(currency) {
    return this.coinService.getSnapShotByCurrency(currency);
  }

  archiveCoin(coins: Coin[]) {
    return this.coinService.archiveCoin(coins);
  }



}
