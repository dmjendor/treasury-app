import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyService } from 'app/shared/services/currency.service';
import { take } from 'rxjs/operators';
import { Currency } from 'shared/models/currency';
import { Valuable } from 'shared/models/valuable';
import { Vault } from 'shared/models/vault';
import { ValuablesService } from 'shared/services/valuables.service';

@Component({
  selector: 'app-edit-valuable-item',
  templateUrl: './edit-valuable-item.component.html',
  styleUrls: ['./edit-valuable-item.component.css']
})
export class EditValuableItemComponent implements OnInit {
  vault: Vault;
  valuable: Valuable;
  currency: Currency;
  baseValuable: Valuable;

  constructor(
    public currencyService: CurrencyService,
    public valuableService: ValuablesService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.baseValuable = JSON.parse(JSON.stringify(this.valuable));
    this.currencyService.get(this.vault.baseCurrency)
      .valueChanges().pipe(take(1)).subscribe(c => {
        this.currency = c as Currency;
      });
  }

  save() {
    this.valuableService.update(this.valuable.key, this.valuable, this.baseValuable).then((a) => {
      this.modal.close();
    });
  }

  delete() {
    this.valuableService.remove(this.valuable.key, this.valuable).then((a) => {
      this.modal.close();
    });
  }

  cancel() {
    this.modal.close();
  }

}
