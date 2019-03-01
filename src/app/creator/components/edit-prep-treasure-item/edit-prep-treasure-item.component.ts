import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrepTreasureService } from 'creator/services/prep-treasure.service';
import { take } from 'rxjs/operators';
import { Currency } from 'shared/models/currency';
import { PrepTreasure } from 'shared/models/prep-treasure';
import { Vault } from 'shared/models/vault';
import { CurrencyService } from 'shared/services/currency.service';

@Component({
  selector: 'app-edit-prep-treasure-item',
  templateUrl: './edit-prep-treasure-item.component.html',
  styleUrls: ['./edit-prep-treasure-item.component.css']
})
export class EditPrepTreasureItemComponent implements OnInit {
  vault: Vault;
  treasure: PrepTreasure;
  currency: Currency;

  constructor(
    public currencyService: CurrencyService,
    public treasureService: PrepTreasureService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.currencyService.get(this.vault.baseCurrency)
      .valueChanges().pipe(take(1)).subscribe(c => {
        this.currency = c as Currency;
      });
  }

  save() {
    this.treasureService.update(this.treasure.key, this.treasure).then((a) => {
      this.modal.close();
    });
  }

  delete() {
    this.treasureService.remove(this.treasure.key).then((a) => {
      this.modal.close();
    });
  }

  cancel() {
    this.modal.close();
  }

}
