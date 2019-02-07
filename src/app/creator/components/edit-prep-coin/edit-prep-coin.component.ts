import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RewardPrep } from 'shared/models/reward-prep';
import { Subscription } from 'rxjs';
import { Currency } from 'shared/models/currency';
import { CurrencyService } from 'shared/services/currency.service';

@Component({
  selector: 'edit-prep-coin',
  templateUrl: './edit-prep-coin.component.html',
  styleUrls: ['./edit-prep-coin.component.css']
})
export class EditPrepCoinComponent implements OnInit, OnDestroy {
  @Input() reward: RewardPrep;

  split: boolean;
  showDisplay: boolean = false;
  currencySub: Subscription;
  currencies: Currency[];

  constructor(
    private currencyService: CurrencyService
  ) { }

  async ngOnInit() {
    this.createSubscriptions();
  }

  ngOnDestroy() {
    this.destroySubscriptions();
  }

  createSubscriptions() {
    this.currencySub = this.currencyService.getCurrenciesByVault(this.reward.vault)
    .subscribe(currency => {
      this.currencies = currency as Currency[];
      this.currencies.sort((a, b) => (a.multiplier < b.multiplier) ? 1 : ((b.multiplier < a.multiplier) ? -1 : 0));
    });
  }

  destroySubscriptions() {
    const currencyPromise  = new Promise((resolve, reject) => {
      this.currencySub.unsubscribe();
      resolve();
      reject();
    });

    return currencyPromise.then((a) => {
      return true;
    });
  }

  toggleDisplay() {
    this.showDisplay = !this.showDisplay;
  }

}
