import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrepTreasureService } from 'app/creator/services/prep-treasure.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Bag } from 'shared/models/bag';
import { Currency } from 'shared/models/currency';
import { PrepTreasure } from 'shared/models/prep-treasure';
import { RewardPrep } from 'shared/models/reward-prep';
import { Vault } from 'shared/models/vault';
import { BagService } from 'shared/services/bag.service';
import { CurrencyService } from 'shared/services/currency.service';
import { VaultService } from 'shared/services/vault.service';

import { EditPrepTreasureItemComponent } from '../edit-prep-treasure-item/edit-prep-treasure-item.component';

@Component({
  selector: 'display-prep-treasure',
  templateUrl: './display-prep-treasure.component.html',
  styleUrls: ['./display-prep-treasure.component.css']
})
export class DisplayPrepTreasureComponent implements OnInit, OnDestroy {
  @Input() reward: RewardPrep;
  treasures: PrepTreasure[];
  treasureSub: Subscription;
  bags: Bag[];
  bagSub: Subscription;
  currencySub: Subscription;
  currency: Currency;
  droppedItem: PrepTreasure;
  showDisplay: boolean = false;
  vaultSub: Subscription;
  vault: Vault;

  constructor(
    private bagService: BagService,
    private modalService: NgbModal,
    private vaultService: VaultService,
    private currencyService: CurrencyService,
    private treasureService: PrepTreasureService
    ) {
  }

  initializeSubscriptions() {
    this.vaultSub = this.vaultService.get(this.reward.vault)
    .valueChanges().pipe(take(1)).subscribe(v => {
      this.vault = v as Vault;

      this.currencySub = this.currencyService.get(this.vault.commonCurrency)
      .valueChanges().pipe(take(1)).subscribe(p => {
        this.currency = p as Currency;
        this.currency.key = this.vault.commonCurrency;
      });
    });


    this.bagSub = this.bagService.getBagsByVault(this.reward.vault)
    .subscribe(bag => {
      this.bags = bag as Bag[];
    });

    this.treasureSub = this.treasureService.getPrepTreasureByReward(this.reward.key)
      .subscribe(val => {
        this.treasures = val as PrepTreasure[];
    });
  }

  destroySubscriptions() {
    const vaultPromise = new Promise((resolve, reject) => {
      this.vaultSub.unsubscribe();
      resolve();
      reject();
    });

    const treasurePromise = new Promise((resolve, reject) => {
      this.treasureSub.unsubscribe();
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

    return treasurePromise.then((a) => {
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
    this.initializeSubscriptions();
  }

  ngOnDestroy() {
    this.destroySubscriptions();
  }

  currencyDisplay(value) {
    if (this.currency) {
      const x = (value / this.currency.multiplier);
      const retVal = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return  retVal + ' ' + this.currency.abbreviation;
    }
  }

  toggleDisplay() {
    this.showDisplay = !this.showDisplay;
  }

  toggleBag(bag: Bag) {
    bag.hidden = !bag.hidden;
  }

  increaseQty(item: PrepTreasure) {
    item.quantity++;
    this.treasureService.update(item.key, item);
  }

  decreaseQty(item: PrepTreasure) {
    if (item.quantity > 1) {
      item.quantity--;
      this.treasureService.update(item.key, item);
    } else {
      this.treasureService.remove(item.key);
    }
  }

  bagSplit(bag: string) {
    if (this.treasures) {
        return this.treasures.filter(x => x.location === bag);
    } else {
      return [];
    }
  }

  drop(ev) {
    ev.preventDefault();

     const draggable = ev.dataTransfer.getData('text/plain');
     this.treasureService.get(draggable)
     .valueChanges().pipe(take(1)).subscribe(p => {
      const useme = p as PrepTreasure;
      useme.location = ev.target.parentElement.id;
      this.treasureService.update(draggable, useme);
    });
   }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData('text/plain', ev.target.id);
  }

  editItemDetails(item: PrepTreasure) {
      const activeModal = this.modalService.open(EditPrepTreasureItemComponent, {ariaLabelledBy: 'Edit ' + item.name, });
      activeModal.componentInstance.vault = this.vault;
      activeModal.componentInstance.treasure = item;
  }
}
