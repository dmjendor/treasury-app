import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { Currency } from 'shared/models/currency';
import { Treasure } from 'shared/models/treasure';
import { Vault } from 'shared/models/vault';
import { CurrencyService } from 'shared/services/currency.service';
import { TreasureService } from 'shared/services/treasure.service';

@Component({
  selector: 'app-edit-treasure-item',
  templateUrl: './edit-treasure-item.component.html',
  styleUrls: ['./edit-treasure-item.component.css']
})
export class EditTreasureItemComponent implements OnInit {
  vault: Vault;
  treasure: Treasure;
  currency: Currency;
  baseTreasure: Treasure;

  constructor(
    public currencyService: CurrencyService,
    public treasureService: TreasureService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.baseTreasure = JSON.parse(JSON.stringify(this.treasure));
    this.currencyService.get(this.vault.baseCurrency)
      .valueChanges().pipe(take(1)).subscribe(c => {
        this.currency = c as Currency;
      });
  }

  save() {
    this.treasureService.update(this.treasure.key, this.treasure, this.baseTreasure).then((a) => {
      this.modal.close();
    });
  }

  delete() {
    this.treasureService.remove(this.treasure.key, this.treasure).then((a) => {
      this.modal.close();
    });
  }

  cancel() {
    this.modal.close();
  }

}
