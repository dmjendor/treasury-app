import { Component, OnChanges, OnDestroy, AfterContentInit, AfterViewInit, Input, OnInit } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { Valuable } from 'shared/models/valuable';
import { ValuablesService } from 'shared/services/valuables.service';
import { UtilityService } from 'shared/services/utility.service';
import { ActivatedRoute } from '@angular/router';
import { BagService } from 'shared/services/bag.service';
import { Bag } from 'shared/models/bag';
import { CurrencyService } from 'shared/services/currency.service';
import { Currency } from 'shared/models/currency';
import { take } from 'rxjs/operators';
import { Coin } from 'shared/models/coin';
import { TreasuryCurrencyService } from 'app/treasury/services/treasury-currency.service';
import { CommerceService } from 'shared/services/commerce.service';
import { BagsModalFormComponent } from 'shared/components/bags-modal-form/bags-modal-form.component';

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

  constructor(
    private route: ActivatedRoute,
    private bagService: BagService,
    private utilityService: UtilityService,
    private currencyService: CurrencyService,
    private commerceService: CommerceService,
    private valuableService: ValuablesService,
    private coinService: TreasuryCurrencyService
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
    this.createSubscriptions();
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

      if (this.bags.indexOf(ev.target.parentElement.id) !== -1) {
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
