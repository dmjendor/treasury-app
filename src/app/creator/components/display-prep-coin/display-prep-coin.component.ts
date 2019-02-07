import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { PrepCoin } from 'shared/models/prep-coin';
import { Subscription } from 'rxjs';
import { Currency } from 'shared/models/currency';
import { PrepCoinService } from 'app/creator/services/prep-coin.service';
import { UtilityService } from 'shared/services/utility.service';
import { ActivatedRoute } from '@angular/router';
import { RewardPrep } from 'shared/models/reward-prep';
import { CurrencyService } from 'shared/services/currency.service';

@Component({
  selector: 'display-prep-coin',
  templateUrl: './display-prep-coin.component.html',
  styleUrls: ['./display-prep-coin.component.css']
})
export class DisplayPrepCoinComponent implements OnInit, OnDestroy {
  @Input() reward: RewardPrep;
  coins: PrepCoin[];
  displayPrepCoins: PrepCoin[] = [];
  coinSub: Subscription;
  currencies: Currency[];
  currencySub: Subscription;
  showDisplay: boolean = false;
  oldVault: string;

  constructor(
    private coinService: PrepCoinService,
    private currencyService: CurrencyService,
    private utilityService: UtilityService,
    private route: ActivatedRoute

    ) {
  }

  async ngOnInit() {
    this.createSubscriptions();
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

  updatePrepCoinList() {
    this.displayPrepCoins = [];
    if (this.coins) {
      const grouped = this.utilityService.groupBy(this.coins, cn => cn.currency);
      this.currencies.forEach((item) => {
        const cns = grouped.get(item.key);
        if (cns) {
          const reduc = cns.reduce(function(previousValue: PrepCoin, currentValue: PrepCoin) {
            const val = (previousValue.value * 1) + (currentValue.value * 1);
            currentValue.value = val;
            return currentValue;
          });
          this.displayPrepCoins.push(reduc);
        } else {
          this.displayPrepCoins.push({currency: item.key, value: 0, vault: item.vault} as PrepCoin);
        }
      });
    }
  }

  createSubscriptions() {
    this.currencySub = this.currencyService.getCurrenciesByVault(this.reward.vault)
    .subscribe(currency => {
      this.currencies = currency as Currency[];
      this.currencies.sort((a, b) => (a.multiplier < b.multiplier) ? 1 : ((b.multiplier < a.multiplier) ? -1 : 0));
      this.coinSub = this.coinService.getPrepCoinsByReward(this.reward.key)
      .subscribe(coin => {
        this.coins = coin.filter((cn) => cn.archived === false) as PrepCoin[];
        this.updatePrepCoinList();
      });
    });
  }



}
