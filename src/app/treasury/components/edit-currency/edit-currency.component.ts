import { Component, OnInit, Input } from '@angular/core';
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
  @Input('vault') vault: Vault;
  currencySub: Subscription;
  currencies: Currency[];
  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnInit() {
    this.currencySub = this.currencyService.getCurrenciesByVault(this.vault.key)
    .subscribe(currency => {
      this.currencies = currency as Currency[];
      this.currencies.sort((a, b) => (a.multiplier > b.multiplier) ? 1 : ((b.multiplier > a.multiplier) ? -1 : 0));
    });
  }

}
