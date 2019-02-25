import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Currency } from 'shared/models/currency';
import { Vault } from 'shared/models/vault';
import { CurrencyService } from 'shared/services/currency.service';
import { VaultService } from 'shared/services/vault.service';

@Component({
  selector: 'edit-currency',
  templateUrl: './edit-currency.component.html',
  styleUrls: ['./edit-currency.component.css']
})
export class EditCurrencyComponent implements OnInit, OnChanges, OnDestroy {

  @Output('splitChange') emitter1: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('split') set setSplitValue(value) {
    this.split = value;
  }
  vault: Vault;
  split: boolean;
  partyNum: number = null;
  private alive: boolean = true;
  consolidateTitle: string =  'Consolidate coin split into highest denominations?';
  splitTitle: string = 'Keep a full share of the coin in the party treasury after split?';
  showDisplay: boolean = false;
  currencySub: Subscription;
  currencies: Currency[];
  oldVault: string;
  constructor(
    private vaultService: VaultService,
    private currencyService: CurrencyService
  ) { }

  async ngOnInit() {
    this.vaultService.activeVault$.pipe(takeWhile(() => this.alive)).subscribe(
      vault => {
          this.vault = vault as Vault;
          if (this.vault.commonCurrency) {
            this.createSubscriptions();
          }
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
