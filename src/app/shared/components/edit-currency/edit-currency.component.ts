import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { Currency } from 'shared/models/currency';
import { CurrencyService } from 'shared/services/currency.service';

@Component({
  selector: 'edit-currency',
  templateUrl: './edit-currency.component.html',
  styleUrls: ['./edit-currency.component.css']
})
export class EditCurrencyComponent implements OnInit, OnChanges, OnDestroy {
  @Input() vault: Vault;
  @Output('splitChange') emitter1: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('split') set setSplitValue(value) {
    this.split = value;
  }
  split: boolean;
  partyNum: number = null;
  consolidateTitle: string =  'Consolidate coin split into highest denominations?';
  splitTitle: string = 'Keep a full share of the coin in the party treasury after split?';
  showDisplay: boolean = false;
  currencySub: Subscription;
  currencies: Currency[];
  oldVault: string;
  constructor(
    private currencyService: CurrencyService
  ) { }

  async ngOnInit() {
    this.createSubscriptions();
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

  createSubscriptions() {
    this.currencySub = this.currencyService.getCurrenciesByVault(this.vault.key)
    .subscribe(currency => {
      this.currencies = currency as Currency[];
      this.oldVault = this.vault.key;
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

  splitCoin() {
    sessionStorage.setItem('partyNum', String(this.partyNum));
    this.emitter1.emit(true);
  }


}
