import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import { Bag } from 'shared/models/bag';
import { Currency } from 'shared/models/currency';
import { DefaultTreasure } from 'shared/models/defaulttreasure';
import { Modifier } from 'shared/models/modifier';
import { Treasure } from 'shared/models/treasure';
import { Vault } from 'shared/models/vault';
import { BagService } from 'shared/services/bag.service';
import { CurrencyService } from 'shared/services/currency.service';
import { DefaultTreasureService } from 'shared/services/default-treasure.service';
import { ModifierService } from 'shared/services/modifier.service';
import { ToastService } from 'shared/services/toast.service';
import { TreasureService } from 'shared/services/treasure.service';
import { VaultService } from 'shared/services/vault.service';

import { BagsModalViewComponent } from '../bags-modal-view/bags-modal-view.component';





@Component({
  selector: 'edit-treasure',
  templateUrl: './edit-treasure.component.html',
  styleUrls: ['./edit-treasure.component.css']
})
export class EditTreasureComponent implements OnInit, OnChanges, OnDestroy {
  vault: Vault;
  treasure = new Treasure();
  currency: Currency;
  showDisplay: boolean = false;
  bagSub: Subscription;
  currencySub: Subscription;
  step1: string = '-1';
  step2: string = '-1';
  step3: string = '-1';
  selectedBag: string;
  bags: Bag[];
  defaultTreasureSub: Subscription;
  defaultTreasure: DefaultTreasure[];
  modifierSub: Subscription;
  modifiers: Modifier[];
  oldVault: string;
  selectedMods: any[] = [];
  private alive: boolean = true;

  constructor(
    private toast: ToastService,
    private bagService: BagService,
    private modalService: NgbModal,
    private vaultService: VaultService,
    private currencyService: CurrencyService,
    private treasureService: TreasureService,
    private modifierService: ModifierService,
    private defaultTreasureService: DefaultTreasureService
  ) { }


  async ngOnInit() {
    this.vaultService.activeVault$.pipe(takeWhile(() => this.alive)).subscribe(
      vault => {
          this.vault = vault;
          if (this.vault.commonCurrency) {
            console.log('vaultLoaded6');
            this.createSubscriptions();
          }
    });
  }

  ngOnChanges() {
    if (this.vault && this.oldVault && this.vault.key  && (this.vault.key !== this.oldVault)) {
      this.destroySubscriptions().then((init) => {
        this.createSubscriptions();
      });
    }
  }

  ngOnDestroy() {
    this.destroySubscriptions();
  }

  createSubscriptions() {
    this.bagSub = this.bagService.getBagsByVault(this.vault.key)
    .subscribe(bag => {
      this.bags = bag as Bag[];
      this.bags.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    });

    this.currencySub = this.currencyService.get(this.vault.commonCurrency)
    .valueChanges().pipe(take(1)).subscribe(p => {
      this.currency = p as Currency;
      this.currency.key = this.vault.commonCurrency;
      this.oldVault = this.vault.key;
    });

    this.defaultTreasureSub = this.defaultTreasureService.getTreasuresByEdition(this.vault.edition)
    .subscribe(dval => {
      this.defaultTreasure = dval as DefaultTreasure[];
    });

    this.modifierSub = this.modifierService.getModifiersByEdition(this.vault.edition)
    .subscribe(mod => {
      this.modifiers = mod as Modifier[];
    });
  }

  destroySubscriptions() {
    const currencyPromise = new Promise((resolve, reject) => {
      this.currencySub.unsubscribe();
      resolve();
      reject();
    });

    const bagPromise = new Promise((resolve, reject) => {
      this.bagSub.unsubscribe();
      resolve();
      reject();
    });

    const defaultTreasurePromise = new Promise((resolve, reject) => {
      this.defaultTreasureSub.unsubscribe();
      resolve();
      reject();
    });

    const modifierPromise = new Promise((resolve, reject) => {
      this.modifierSub.unsubscribe();
      resolve();
      reject();
    });

    return currencyPromise.then((a) => {
      bagPromise.then((b) => {
        defaultTreasurePromise.then((c) => {
          modifierPromise.then((d) => {
            return true;
          });
        });
      });
    });
  }

  displayValue() {
    if (this.currency) {
      return 'Value (' + this.currency.abbreviation + ')';
    }
  }

  toggleDisplay() {
    this.showDisplay = !this.showDisplay;
  }

  selectBag(bagId: string) {
    this.selectedBag = bagId;
  }

  addTreasure() {
    if (this.treasure.location) {
      this.treasure.vault = this.vault.key;
      this.treasure.quantity = Math.floor(this.treasure.quantity);
      this.treasure.value = Math.floor(this.treasure.value * this.currency.multiplier);
      this.treasure.changeby = sessionStorage.getItem('userId');
      this.treasure.timestamp = Date.now();
      this.treasureService.create(this.treasure).then((response) => {
        this.treasure = new Treasure();
        this.treasure.location = this.selectedBag;
      });
    } else {
      this.toast.addToast('error', 'Error', 'You must select a location before adding an item');
    }
  }

  showQuickValueRange(item: DefaultTreasure) {
    return '(' + this.currencyService.formatDisplay(this.currency, Math.floor(item.value)) +  ')';
  }

  quickAdd() {
    if (this.treasure.location) {
      const item1 = this.defaultTreasure.find(item => item.key === this.step3);
      this.treasure.name = item1.name;
      this.treasure.value = Math.floor(item1.value);
      if (this.selectedMods.length > 0) {
        for (let i = 0; i < this.selectedMods.length; i++) {
          const mod = this.modifiers.find(md => md.key === this.selectedMods[i]);
          this.treasure.name += ', ' + mod.name;
          this.treasure.value += Math.floor(mod.value);
        }
      }
      this.treasure.quantity = 1;
      this.treasure.vault = this.vault.key;
      this.treasure.changeby = sessionStorage.getItem('userId');

      this.treasure.timestamp = Date.now();
      this.treasureService.create(this.treasure).then((response) => {
        this.treasure = new Treasure();
        this.treasure.location = this.selectedBag;
      });
    } else {
      this.toast.addToast('error', 'Error', 'You must select a location before adding an item');
    }

  }

  filterModifiers() {
    if (this.modifiers && this.step3 !== '-1') {
      return this.modifiers.filter(mod => mod.parent === this.step1);
    }
  }

  filterStep1() {
    if (this.defaultTreasure) {
      return this.defaultTreasure.filter(val1 => val1.parent === '');
    }
  }

  filterStep2() {
    if (this.step1 !== '-1') {
      return this.defaultTreasure.filter(val2 => val2.parent === this.step1);
    }
  }

  filterStep3() {
    if (this.step2 !== '-1') {
      return this.defaultTreasure.filter(val3 => (val3.parent === this.step2 || val3.parent === this.step1) && val3.value > 0 );
    }
  }

  changeStep2() {
    this.step3 = '-1';
  }

  changeStep1() {
    this.step2 = '-1';
    this.step3 = '-1';
  }

  editBags() {
    const activeModal = this.modalService.open(BagsModalViewComponent, {ariaLabelledBy: 'Edit Bags', });
    activeModal.componentInstance.vault = this.vault;
  }

}
