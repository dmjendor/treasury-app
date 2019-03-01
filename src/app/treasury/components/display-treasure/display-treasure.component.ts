import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import { EditTreasureItemComponent } from 'shared/components/edit-treasure-item/edit-treasure-item.component';
import { TransferModalComponent } from 'shared/components/transfer-modal/transfer-modal.component';
import { Bag } from 'shared/models/bag';
import { Currency } from 'shared/models/currency';
import { Permission } from 'shared/models/permission';
import { Treasure } from 'shared/models/treasure';
import { Vault } from 'shared/models/vault';
import { BagService } from 'shared/services/bag.service';
import { CommerceService } from 'shared/services/commerce.service';
import { CurrencyService } from 'shared/services/currency.service';
import { PermissionService } from 'shared/services/permission.service';
import { ToastService } from 'shared/services/toast.service';
import { TreasureService } from 'shared/services/treasure.service';
import { VaultService } from 'shared/services/vault.service';

@Component({
  selector: 'display-treasure',
  templateUrl: './display-treasure.component.html',
  styleUrls: ['./display-treasure.component.css']
})
export class DisplayTreasureComponent implements OnInit, OnChanges, OnDestroy {
  vault: Vault;
  treasures: Treasure[];
  treasureSub: Subscription;
  bags: Bag[];
  bagSub: Subscription;
  currencySub: Subscription;
  currency: Currency;
  droppedItem: Treasure;
  oldVault: string;
  showDisplay: boolean = false;
  permissions: Permission[];
  permissionSub: Subscription;
  treasureAllowed: boolean = false;
  private alive: boolean = true;

  constructor(
    private toast: ToastService,
    private bagService: BagService,
    private modalService: NgbModal,
    private vaultService: VaultService,
    private commerceService: CommerceService,
    private currencyService: CurrencyService,
    private treasureService: TreasureService,
    private permissionService: PermissionService
    ) {
  }

  initializeSubscriptions() {
    this.currencySub = this.currencyService.get(this.vault.commonCurrency)
    .valueChanges().pipe(take(1)).subscribe(p => {
      this.currency = p as Currency;
      this.currency.key = this.vault.commonCurrency;
    });

    this.bagSub = this.bagService.getBagsByVault(this.vault.key)
    .subscribe(bag => {
      this.bags = bag as Bag[];
    });

    this.treasureSub = this.treasureService.getTreasureByVault(this.vault.key)
      .subscribe(val => {
        this.treasures = val as Treasure[];
    });

    this.permissionSub = this.permissionService.getPermissionsByUser()
    .subscribe(permission => {
      this.permissions = permission as Permission[];
      this.permissions.forEach((perm) => {
        if (perm.item && perm.vault === this.vault.key) {
          this.treasureAllowed = true;
        }
      });
    });
  }


  destroySubscriptions() {
    const permissionPromise = new Promise((resolve, reject) => {
      if (this.permissionSub) {
        this.permissionSub.unsubscribe();
      }
      resolve();
      reject();
    });
    const treasurePromise = new Promise((resolve, reject) => {
      if (this.treasureSub) {
        this.treasureSub.unsubscribe();
      }
      resolve();
      reject();
    });

    const bagPromise = new Promise((resolve, reject) => {
      if (this.bagSub) {
        this.bagSub.unsubscribe();
      }
      resolve();
      reject();
    });

    const currencyPromise = new Promise((resolve, reject) => {
      if (this.currencySub) {
        this.currencySub.unsubscribe();
      }
      resolve();
      reject();
    });

    return treasurePromise.then((a) => {
      bagPromise.then((b) => {
        currencyPromise.then((c) => {
          permissionPromise.then((p) => {
            return true;
          });
        });
      });
    });
  }

  async ngOnInit() {
    this.vaultService.activeVault$.pipe(takeWhile(() => this.alive)).subscribe(
      vault => {
          this.vault = vault;
          if (this.vault.commonCurrency) {
            this.initializeSubscriptions();
          } else {

          }
    });
  }

  ngOnDestroy() {
    this.destroySubscriptions();
  }

  ngOnChanges() {
    if (this.vault && this.oldVault && this.vault.key  && (this.vault.key !== this.oldVault)) {
      this.destroySubscriptions().then((init) => {
        this.initializeSubscriptions();
      });
    }
  }

  toggleDisplay() {
    this.showDisplay = !this.showDisplay;
  }

  toggleBag(bag: Bag) {
    bag.hidden = !bag.hidden;
  }

  increaseQty(item: Treasure) {
    const baseItem = JSON.parse(JSON.stringify(item));
    item.quantity++;
    this.treasureService.update(item.key, item, baseItem);
  }

  decreaseQty(item) {
    const baseItem = JSON.parse(JSON.stringify(item));
    if (item.quantity > 1) {
      item.quantity--;
      this.treasureService.update(item.key, item, baseItem);
    } else {
      this.treasureService.remove(item.key, item);
    }
  }

  buyItem(item) {
    const baseItem = JSON.parse(JSON.stringify(item));
    item.quantity++;
    this.treasureService.update(item.key, item, baseItem);
    this.commerceService.buySell(item, this.vault, false, 'treasure', false, true);
  }

  sellItem(item) {
    const baseItem = JSON.parse(JSON.stringify(item));
    if (item.quantity > 1) {
      item.quantity--;
      this.treasureService.update(item.key, item, baseItem);
    } else {
      this.treasureService.remove(item.key, item);
    }
    this.commerceService.buySell(item, this.vault, true, 'treasure', false, true);
  }

  currencyDisplay(value) {
    if (this.currency) {
      const x = (value / this.currency.multiplier);
      const retVal = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return  retVal + ' ' + this.currency.abbreviation;
    }
  }

  marginDisplay(type: string, value: number) {
    if (type === 'buy') {
      return this.currencyDisplay(value * ((100 + this.vault.ibMarkup) / 100));
    } else {
      return this.currencyDisplay(value * ((100 - this.vault.isMarkup) / 100));
    }
  }

  bagSplit(bag) {
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
      const useme = p as Treasure;
      const pos = this.bags.map(function(e) { return e.key; }).indexOf(ev.target.parentElement.id);
      const original = JSON.parse(JSON.stringify(useme));
      if (pos !== -1) {
        useme.location = ev.target.parentElement.id;
        this.treasureService.update(draggable, useme, original);
      }
    });
   }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData('text/plain', ev.target.id);
  }

  identify(item: Treasure) {
    if (this.treasureAllowed) {
      const baseItem = JSON.parse(JSON.stringify(item));
      item.identified = true;
      this.treasureService.update(item.key, item, baseItem).then((a) => {});
    } else {
      this.toast.addToast('error', 'Error', 'You do not have permission to edit treasures.');
    }
  }

  editItemDetails(item: Treasure) {
    if (this.treasureAllowed) {
      const activeModal = this.modalService.open(EditTreasureItemComponent, {ariaLabelledBy: 'Edit ' + item.name, });
      activeModal.componentInstance.vault = this.vault;
      activeModal.componentInstance.treasure = item;
    } else {
      this.toast.addToast('error', 'Error', 'You do not have permission to edit treasures.');
    }
  }

  xferItem(item: Treasure) {
    if (this.treasureAllowed) {
      const activeModal = this.modalService.open(TransferModalComponent, {ariaLabelledBy: 'Transfer ' + item.name, });
      activeModal.componentInstance.vault = this.vault;
      activeModal.componentInstance.item = item;
      activeModal.componentInstance.source = 'treasure';
    } else {
      this.toast.addToast('error', 'Error', 'You do not have permission to edit treasures.');
    }
  }

}
