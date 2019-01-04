import { Component, OnInit, Input, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';
import { CurrencyService } from 'shared/services/currency.service';
import { Router } from '@angular/router';
import { Currency } from 'shared/models/currency';
import { Subscription } from 'rxjs';
import { Vault } from 'shared/models/vault';

@Component({
  selector: 'manage-currencies',
  templateUrl: './manage-currencies.component.html',
  styleUrls: ['./manage-currencies.component.css']
})
export class ManageCurrenciesComponent implements OnInit, OnDestroy, OnChanges {
    @Input('vault') vault: Vault;
    @Input('selectedCurrency') selectedCurrency: Currency;
    @Input('edit') editMode: boolean;
    @Output('selectedCurrencyChange') emitter1: EventEmitter<object> = new EventEmitter<object>();
    @Output('editChange') emitter2: EventEmitter<boolean> = new EventEmitter<boolean>();

    currencies: Currency[];
    currencySub: Subscription;
    selected: any[];
    newCurrency = new Currency();

    columns = [
      { prop: 'name', name: 'Name' },
      { name: 'Abbreviation' },
      { name: 'Multiplier'}
    ];
  constructor(
    private currencyService: CurrencyService,
    private router: Router
    ) { }

  createCurrency() {
    console.log(this.newCurrency);
    this.emitter1.emit(this.newCurrency);
    this.emitter2.emit(true);
  }

  editCurrency() {
    this.emitter1.emit(this.selectedCurrency);
    this.emitter2.emit(true);
  }

  deleteCurrency() {
    this.currencyService.remove(this.selectedCurrency.key);
  }

  onSelect({ selected }) {
    this.selectedCurrency = this.selected[0];
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  filter(query: string) {
      const filteredProducts = (query) ?
      this.currencies.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.currencies;
    // this.initializeTable(filteredProducts);

  }

  async ngOnInit() {

  }

  ngOnChanges() {
    if (this.vault.key) {
      this.currencySub = this.currencyService.getCurrenciesByVault(this.vault.key)
      .subscribe(cls => {
        this.currencies = cls as Currency[];
        this.selected = [this.currencies[0]];
        this.selectedCurrency = this.currencies[0];
      });
    }
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }

}
