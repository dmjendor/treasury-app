import { Component, OnInit, OnChanges, Input, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TreasuryCurrencyService } from 'app/treasury/services/treasury-currency.service';
import { Vault } from 'shared/models/vault';
import { Coin } from 'shared/models/coin';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'shared/services/utility.service';
import { Currency } from 'shared/models/currency';
import { CurrencyService } from 'shared/services/currency.service';

@Component({
  selector: 'display-currency',
  templateUrl: './display-currency.component.html',
  styleUrls: ['./display-currency.component.css']
})
export class DisplayCurrencyComponent implements AfterViewInit, AfterContentInit, OnChanges, OnDestroy {
  @Input('vault') vault: Vault;
  coins: Coin[];
  displayCoins: Coin[] = [];
  coinSub: Subscription;
  currencies: Currency[];
  currencySub: Subscription;
  vaultId: string;

  constructor(
    private coinService: TreasuryCurrencyService,
    private currencyService: CurrencyService,
    private utilityService: UtilityService,
    private route: ActivatedRoute

    ) {
    this.vaultId = this.route.snapshot.paramMap.get('id');
  }

  ngOnChanges() {
    if (this.vault.key) {
      this.updateCoinList();
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

  ngAfterViewInit() {
   // this.updateCoinList();
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
    if (this.coins) {
      const grouped = this.utilityService.groupBy(this.coins, cn => cn.currency);
      this.currencies.forEach((item) => {
        const cns = grouped.get(item.key);
        if (cns) {
          const reduc = cns.reduce(function(previousValue: Coin, currentValue: Coin) {
            const val = previousValue.value + currentValue.value;
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
    this.currencySub = this.currencyService.getCurrenciesByVault(this.vault.key)
    .subscribe(currency => {
      this.currencies = currency as Currency[];
      this.currencies.sort((a, b) => (a.multiplier > b.multiplier) ? 1 : ((b.multiplier > a.multiplier) ? -1 : 0));
      this.coinSub = this.coinService.getCoinRecordsByVault(this.vaultId)
      .subscribe(coin => {
        this.coins = coin as Coin[];
        this.updateCoinList();
      });
    });
  }



}
