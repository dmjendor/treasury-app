import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import { Bag } from 'shared/models/bag';
import { Currency } from 'shared/models/currency';
import { Valuable } from 'shared/models/valuable';
import { Vault } from 'shared/models/vault';
import { BagService } from 'shared/services/bag.service';
import { CommerceService } from 'shared/services/commerce.service';
import { CurrencyService } from 'shared/services/currency.service';
import { ValuablesService } from 'shared/services/valuables.service';
import { VaultService } from 'shared/services/vault.service';

@Component({
  selector: 'display-valuables',
  templateUrl: './display-valuables.component.html',
  styleUrls: ['./display-valuables.component.css']
})
export class DisplayValuablesComponent implements OnInit, OnChanges, OnDestroy {
  @Input('vault') vault: Vault;
  valuables: Valuable[];
  valuableSub: Subscription;
  bags: Bag[];
  bagSub: Subscription;
  currencySub: Subscription;
  currency: Currency;
  droppedItem: Valuable;
  oldVault: string;
  showDisplay: boolean = false;
  private alive: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private bagService: BagService,
    private vaultService: VaultService,
    private currencyService: CurrencyService,
    private commerceService: CommerceService,
    private valuableService: ValuablesService
    ) {
  }

  ngOnChanges() {
    if (this.vault && this.oldVault && this.vault.key  && (this.vault.key !== this.oldVault)) {
      this.destroySubscriptions().then((init) => {
        this.createSubscriptions();
      });
    }
  }

  createSubscriptions() {
    this.currencySub = this.currencyService.get(this.vault.commonCurrency)
    .valueChanges().pipe(take(1)).subscribe(p => {
      this.currency = p as Currency;
      this.currency.key = this.vault.commonCurrency;
    });

    this.bagSub = this.bagService.getBagsByVault(this.vault.key)
    .subscribe(bag => {
      this.bags = bag as Bag[];
    });

    this.valuableSub = this.valuableService.getValuablesByVault(this.vault.key)
      .subscribe(val => {
        this.oldVault = this.vault.key;
        this.valuables = val as Valuable[];
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

    return valuablesPromise.then((a) => {
      bagPromise.then((b) => {
        currencyPromise.then((c) => {
          return true;
        });
      });
    });
  }

  async ngOnInit() {
    this.vaultService.activeVault$.pipe(takeWhile(() => this.alive)).subscribe(
      vault => {
          this.vault = vault;
          this.createSubscriptions();
    });
  }


  currencyDisplay(value) {
    if (this.currency) {
      return this.currencyService.formatDisplay(this.currency, value);
    }
  }

  ngOnDestroy() {
    this.destroySubscriptions();
  }

  toggleDisplay() {
    this.showDisplay = !this.showDisplay;
  }

  toggleBag(bag: Bag) {
    bag.hidden = !bag.hidden;
  }

  increaseQty(item: Valuable) {
    item.quantity++;
    this.valuableService.update(item.key, item);
  }

  decreaseQty(item) {
    if (item.quantity > 1) {
      item.quantity--;
      this.valuableService.update(item.key, item);
    } else {
      this.valuableService.remove(item.key);
    }
  }

  buyItem(item) {
    item.quantity++;
    this.valuableService.update(item.key, item);
    this.commerceService.buySell(item, this.vault, true);
  }

  sellItem(item) {
    if (item.quantity > 1) {
      item.quantity--;
      this.valuableService.update(item.key, item);
    } else {
      this.valuableService.remove(item.key);
    }
    this.commerceService.buySell(item, this.vault, true);
  }

  bagSplit(bag) {
    if (this.valuables) {
        return this.valuables.filter(x => x.location === bag);
    } else {
      return [];
    }
  }

  drop(ev) {
    ev.preventDefault();
     const draggable = ev.dataTransfer.getData('text/plain');
     this.valuableService.get(draggable)
     .valueChanges().pipe(take(1)).subscribe(p => {
      const useme = p as Valuable;
      const pos = this.bags.map(function(e) { return e.key; }).indexOf(ev.target.parentElement.id);
      if (pos !== -1) {
        useme.location = ev.target.parentElement.id;
        this.valuableService.update(draggable, useme);
      }

    });
   }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData('text/plain', ev.target.id);
  }

}
