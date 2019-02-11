import { Component, OnChanges, OnDestroy, AfterContentInit, AfterViewInit, Input, OnInit } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { Treasure } from 'shared/models/treasure';
import { TreasureService } from 'shared/services/treasure.service';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditTreasureItemComponent } from 'shared/components/edit-treasure-item/edit-treasure-item.component';


@Component({
  selector: 'display-treasure',
  templateUrl: './display-treasure.component.html',
  styleUrls: ['./display-treasure.component.css']
})
export class DisplayTreasureComponent implements OnInit, OnChanges, OnDestroy {
  @Input('vault') vault: Vault;
  treasures: Treasure[];
  treasureSub: Subscription;
  bags: Bag[];
  bagSub: Subscription;
  currencySub: Subscription;
  currency: Currency;
  droppedItem: Treasure;
  oldVault: string;
  showDisplay: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bagService: BagService,
    private modalService: NgbModal,
    private utilityService: UtilityService,
    private commerceService: CommerceService,
    private currencyService: CurrencyService,
    private treasureService: TreasureService,
    private coinService: TreasuryCurrencyService
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
  }

  destroySubscriptions() {
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
          return true;
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

  ngOnChanges() {
    if (this.vault && this.oldVault && this.vault.key  && (this.vault.key !== this.oldVault)) {
      this.destroySubscriptions().then((init) => {
        this.initializeSubscriptions();
      });
    }
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

  increaseQty(item: Treasure) {
    item.quantity++;
    this.treasureService.update(item.key, item);
  }

  decreaseQty(item) {
    if (item.quantity > 1) {
      item.quantity--;
      this.treasureService.update(item.key, item);
    } else {
      this.treasureService.remove(item.key);
    }
  }

  buyItem(item) {
    item.quantity++;
    this.treasureService.update(item.key, item);
    this.commerceService.buySell(item, this.vault, true);
  }

  sellItem(item) {
    if (item.quantity > 1) {
      item.quantity--;
      this.treasureService.update(item.key, item);
    } else {
      this.treasureService.remove(item.key);
    }
    this.commerceService.buySell(item, this.vault, true);
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
      if (pos !== -1) {
        useme.location = ev.target.parentElement.id;
        this.treasureService.update(draggable, useme);
      }
    });
   }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData('text/plain', ev.target.id);
  }

  editItemDetails(item: Treasure) {
    const activeModal = this.modalService.open(EditTreasureItemComponent, {ariaLabelledBy: 'Edit ' + item.name, });
    activeModal.componentInstance.vault = this.vault;
    activeModal.componentInstance.treasure = item;
  }

}
