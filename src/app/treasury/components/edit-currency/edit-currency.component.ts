import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { Currency } from 'shared/models/currency';
import { CurrencyService } from 'shared/services/currency.service';

@Component({
  selector: 'edit-currency',
  templateUrl: './edit-currency.component.html',
  styleUrls: ['./edit-currency.component.css']
})
export class EditCurrencyComponent implements OnInit {
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
  constructor(
    private currencyService: CurrencyService
  ) { }

  async ngOnInit() {
    this.currencySub = this.currencyService.getCurrenciesByVault(this.vault.key)
    .subscribe(currency => {
      this.currencies = currency as Currency[];
      this.currencies.sort((a, b) => (a.multiplier > b.multiplier) ? 1 : ((b.multiplier > a.multiplier) ? -1 : 0));
    });
  }

  toggleDisplay() {
    this.showDisplay = !this.showDisplay;
  }

  splitCoin() {
    console.log('splitting');
    sessionStorage.setItem('partyNum', String(this.partyNum));
    this.emitter1.emit(true);
  }


}
