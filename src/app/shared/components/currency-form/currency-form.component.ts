import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Currency } from 'shared/models/currency';
import { Subscription } from 'rxjs';
import { Vault } from 'shared/models/vault';
import { CurrencyService } from 'app/shared/services/currency.service';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';

@Component({
  selector: 'currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.css']
})
export class CurrencyFormComponent {
  @Input('vault') vault: Vault;
  @Input('selectedCurrency') set setSelectedCurrency(value) {
    this.currency = value;
  }
  @Input('edit') editMode: boolean;
  @Output('selectedCurrencyChange') emitter1: EventEmitter<object> = new EventEmitter<object>();
  @Output('editChange') emitter2: EventEmitter<boolean> = new EventEmitter<boolean>();
  currency: Currency;
  currencies: Currency[];
  currencySub: Subscription;
  selected: any[];


  constructor(
    private currencyService: CurrencyService,
    private confirmationDialogService: ConfirmationDialogService
    ) { }

  save(currency) {

    if (currency.hasOwnProperty('key')) {
      this.currencyService.update(this.currency.key, currency);
    } else {
      currency.vault = this.vault.key;
      console.log(currency);
      this.currencyService.create(currency);
    }

    this.emitter2.emit(false);
  }

  cancel() {
    this.emitter2.emit(false);
  }

  delete() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete the currency ' + this.currency.name + '?  This action cannot be undone.';
      this.confirmationDialogService.confirm(header, body)
      .then((confirmed) => {
        if (confirmed) {
          this.currencyService.remove(this.currency.key);
          this.emitter2.emit(false);
        }
      })
      .catch(() => {

      });

  }


}
