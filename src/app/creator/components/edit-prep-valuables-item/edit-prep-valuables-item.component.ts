import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyService } from 'app/shared/services/currency.service';
import { PrepValuablesService } from 'creator/services/prep-valuables.service';
import { take } from 'rxjs/operators';
import { Currency } from 'shared/models/currency';
import { PrepValuable } from 'shared/models/prep-valuables';
import { Vault } from 'shared/models/vault';

@Component({
  selector: 'edit-prep-valuables-item',
  templateUrl: './edit-prep-valuables-item.component.html',
  styleUrls: ['./edit-prep-valuables-item.component.css']
})
export class EditPrepValuablesItemComponent implements OnInit {
  vault: Vault;
  valuable: PrepValuable;
  currency: Currency;
  baseValuable: PrepValuable;

  constructor(
    public currencyService: CurrencyService,
    public valuableService: PrepValuablesService,
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
    this.valuableService.update(this.valuable.key, this.valuable).then((a) => {
      this.modal.close();
    });
  }

  delete() {
    this.valuableService.remove(this.valuable.key).then((a) => {
      this.modal.close();
    });
  }

  cancel() {
    this.modal.close();
  }

}
