import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PrepValuable } from 'shared/models/prep-valuables';
import { Subscription } from 'rxjs';
import { Bag } from 'shared/models/bag';
import { Currency } from 'shared/models/currency';
import { BagService } from 'shared/services/bag.service';
import { CurrencyService } from 'shared/services/currency.service';
import { PrepValuablesService } from 'app/creator/services/prep-valuables.service';
import { VaultService } from 'shared/services/vault.service';
import { Vault } from 'shared/models/vault';
import { RewardPrep } from 'shared/models/reward-prep';
import { take } from 'rxjs/operators';

@Component({
  selector: 'display-prep-valuables',
  templateUrl: './display-prep-valuables.component.html',
  styleUrls: ['./display-prep-valuables.component.css']
})
export class DisplayPrepValuablesComponent implements OnInit, OnDestroy {
  @Input() reward: RewardPrep;
  valuables: PrepValuable[] = [];
  valuableSub: Subscription;
  bags: Bag[] = [];
  bagSub: Subscription;
  currencySub: Subscription;
  currency: Currency;
  droppedItem: PrepValuable;
  showDisplay: boolean = false;
  vaultSub: Subscription;
  vault: Vault;

  constructor(
    private bagService: BagService,
    private vaultService: VaultService,
    private currencyService: CurrencyService,
    private prepValuableService: PrepValuablesService
    ) {
  }

  createSubscriptions() {
    this.vaultSub = this.vaultService.get(this.reward.vault)
    .valueChanges().pipe(take(1)).subscribe(v => {
      this.vault = v as Vault;

      this.currencySub = this.currencyService.get(this.vault.commonCurrency)
      .valueChanges().pipe(take(1)).subscribe(p => {
        this.currency = p as Currency;
        this.currency.key = this.vault.commonCurrency;
      });

      this.bagSub = this.bagService.getBagsByVault(this.reward.vault)
      .subscribe(bag => {
        this.bags = bag as Bag[];
      });

      this.valuableSub = this.prepValuableService.getPrepValuablesByReward(this.reward.key)
        .subscribe(val => {
          this.valuables = val as PrepValuable[];
      });
    });

  }

  destroySubscriptions() {
    const valuablesPromise = new Promise((resolve, reject) => {
      this.valuableSub.unsubscribe();
      resolve();
      reject();
    });

    const bagPromise = new Promise((resolve, reject) => {
      this.bagSub.unsubscribe();
      resolve();
      reject();
    });

    const currencyPromise = new Promise((resolve, reject) => {
      this.currencySub.unsubscribe();
      resolve();
      reject();
    });

    const vaultPromise = new Promise((resolve, reject) => {
      this.vaultSub.unsubscribe();
      resolve();
      reject();
    });

    return valuablesPromise.then((a) => {
      bagPromise.then((b) => {
        currencyPromise.then((c) => {
          vaultPromise.then((d) => {
            return true;
          });
        });
      });
    });
  }

  async ngOnInit() {
    this.createSubscriptions();
  }

  ngOnDestroy() {
    this.destroySubscriptions();
  }

  currencyDisplay(value) {
    if (this.currency) {
      return this.currencyService.formatDisplay(this.currency, value);
    }
  }

  toggleDisplay() {
    this.showDisplay = !this.showDisplay;
  }

  toggleBag(bag: Bag) {
    bag.hidden = !bag.hidden;
  }


  bagSplit(bag) {
    if (this.valuables) {
        return this.valuables.filter(x => x.location === bag);
    } else {
      return [];
    }
  }

  increaseQty(item: PrepValuable) {
    item.quantity++;
    this.prepValuableService.update(item.key, item);
  }

  decreaseQty(item: PrepValuable) {
    if (item.quantity > 1) {
      item.quantity--;
      this.prepValuableService.update(item.key, item);
    } else {
      this.prepValuableService.remove(item.key);
    }
  }

  drop(ev) {
    ev.preventDefault();

     const draggable = ev.dataTransfer.getData('text/plain');
     this.prepValuableService.get(draggable)
     .valueChanges().pipe(take(1)).subscribe(p => {
      const useme = p as PrepValuable;
      useme.location = ev.target.parentElement.id;
      this.prepValuableService.update(draggable, useme);
    });
   }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData('text/plain', ev.target.id);
  }

}
