import { Component, OnInit, Input, EventEmitter, OnDestroy } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { ValuablesService } from 'shared/services/valuables.service';
import { Valuable } from 'shared/models/valuable';
import { BagService } from 'shared/services/bag.service';
import { Bag } from 'shared/models/bag';
import { CurrencyService } from 'shared/services/currency.service';
import { Currency } from 'shared/models/currency';
import { take } from 'rxjs/operators';

@Component({
  selector: 'edit-valuables',
  templateUrl: './edit-valuables.component.html',
  styleUrls: ['./edit-valuables.component.css']
})
export class EditValuablesComponent implements OnInit, OnDestroy {
  @Input() vault: Vault;
  valuable = new Valuable();
  currency: Currency;
  showDisplay: boolean = false;
  bagSub: Subscription;
  currencySub: Subscription;
  bags: Bag[];
  constructor(
    private bagService: BagService,
    private currencyService: CurrencyService,
    private valuableService: ValuablesService
  ) { }

  async ngOnInit() {
    this.bagSub = this.bagService.getBagsByVault(this.vault.key)
    .subscribe(bag => {
      this.bags = bag as Bag[];
      this.bags.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    });

    this.currencySub = this.currencyService.get(this.vault.commonCurrency)
    .valueChanges().pipe(take(1)).subscribe(p => {
      this.currency = p as Currency;
      this.currency.key = this.vault.commonCurrency;
    });
  }

  ngOnDestroy() {
    if (this.bagSub) {
      this.bagSub.unsubscribe();
    }
    if (this.currencySub) {
      this.currencySub.unsubscribe();
    }
  }

  displayValue() {
    if (this.currency) {
      return 'Value (' + this.currency.abbreviation + ')';
    }
  }

  toggleDisplay() {
    this.showDisplay = !this.showDisplay;
  }

  addValuable() {
    this.valuable.vault = this.vault.key;
    this.valuable.quantity = Math.floor(this.valuable.quantity);
    this.valuable.value = Math.floor(this.valuable.value * this.currency.multiplier);
    this.valuable.changeby = sessionStorage.getItem('userId');
    this.valuableService.create(this.valuable).then((response) => {
      this.valuable = new Valuable();
    });
  }

}
