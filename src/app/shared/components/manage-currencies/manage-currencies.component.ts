import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Currency } from 'shared/models/currency';
import { Vault } from 'shared/models/vault';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { CurrencyService } from 'shared/services/currency.service';

@Component({
  selector: 'manage-currencies',
  templateUrl: './manage-currencies.component.html',
  styleUrls: ['./manage-currencies.component.css']
})
export class ManageCurrenciesComponent implements OnDestroy, OnChanges {
    @Input('vault') vault: Vault;
    @Input('selectedCurrency') selectedCurrency: Currency;
    @Input('edit') editMode: boolean;
    @Output('selectedCurrencyChange') emitter1: EventEmitter<object> = new EventEmitter<object>();
    @Output('editChange') emitter2: EventEmitter<boolean> = new EventEmitter<boolean>();

    currencies: Currency[];
    currencySub: Subscription;
    selected: any[];
    newCurrency = new Currency();
    showDisplay: boolean = false;

    columns = [
      { prop: 'name', name: 'Name' },
      { name: 'Abbreviation' },
      { name: 'Multiplier'}
    ];
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private currencyService: CurrencyService,
    private confirmationDialogService: ConfirmationDialogService
    ) { }

    toggleDisplay() {
      this.showDisplay = !this.showDisplay;
    }

  createDefaultCurrencies() {
    this.currencyService.createDefaults(this.vault.key);
  }

  createCurrency() {
    this.emitter1.emit(this.newCurrency);
    this.emitter2.emit(true);
  }

  editCurrency() {
    this.emitter1.emit(this.selectedCurrency);
    this.emitter2.emit(true);
  }

  deleteCurrency() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete the currency ' + this.selectedCurrency.name + '?  This action cannot be undone.';
      this.confirmationDialogService.confirm(header, body)
      .then((confirmed) => {
        if (confirmed) {
          this.currencyService.remove(this.selectedCurrency.key);
        }
      })
      .catch(() => {
        //
      });
  }

  onSelect({ selected }) {
    this.selectedCurrency = selected[0];
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

  openModal(modal) {
    this.modalService.open(modal);
  }

  ngOnChanges() {
    if (this.vault.key) {
      this.currencySub = this.currencyService.getCurrenciesByVault(this.vault.key)
      .subscribe(cls => {
        this.currencies = cls as Currency[];
        this.currencies.sort((a, b) => (a.multiplier > b.multiplier) ? 1 : ((b.multiplier > a.multiplier) ? -1 : 0));
        this.selected = [];
        // this.selectedCurrency = this.currencies[0];
      });
    }
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }

}
