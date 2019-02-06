import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { ValuablesService } from 'shared/services/valuables.service';
import { Valuable } from 'shared/models/valuable';
import { BagService } from 'shared/services/bag.service';
import { Bag } from 'shared/models/bag';
import { CurrencyService } from 'shared/services/currency.service';
import { Currency } from 'shared/models/currency';
import { take } from 'rxjs/operators';
import { DefaultValuablesService } from 'shared/services/default-valuables.service';
import { DefaultValuable } from 'shared/models/defaultvaluable';
import { ToastService } from 'shared/services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BagsModalViewComponent } from '../bags-modal-view/bags-modal-view.component';

@Component({
  selector: 'edit-valuables',
  templateUrl: './edit-valuables.component.html',
  styleUrls: ['./edit-valuables.component.css']
})
export class EditValuablesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() vault: Vault;
  valuable = new Valuable();
  selectedBag: string;
  currency: Currency;
  showDisplay: boolean = false;
  bagSub: Subscription;
  currencySub: Subscription;
  step1: string = '-1';
  step2: string = '-1';
  step3: string = '-1';
  bags: Bag[];
  defaultValuableSub: Subscription;
  defaultValuables: DefaultValuable[];
  oldVault: string;

  constructor(
    private toast: ToastService,
    private bagService: BagService,
    private modalService: NgbModal,
    private currencyService: CurrencyService,
    private valuableService: ValuablesService,
    private defaultValuableService: DefaultValuablesService
  ) { }

  async ngOnInit() {
    this.createSubscriptions();
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

    this.defaultValuableSub = this.defaultValuableService.getAll()
    .subscribe(dval => {
      this.defaultValuables = dval as DefaultValuable[];
    });
  }

  destroySubscriptions() {
    const currencyPromise  = new Promise((resolve, reject) => {
      this.currencySub.unsubscribe();
      resolve();
      reject();
    });
    const bagPromise  = new Promise((resolve, reject) => {
      this.bagSub.unsubscribe();
      resolve();
      reject();
    });
    const defaultValuablePromise  = new Promise((resolve, reject) => {
      this.defaultValuableSub.unsubscribe();
      resolve();
      reject();
    });
    return currencyPromise.then((a) => {
      bagPromise.then((b) => {
        defaultValuablePromise.then((c) => {
          return true;
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

  addValuable() {
    if (this.valuable.location) {
      this.valuable.vault = this.vault.key;
      this.valuable.quantity = Math.floor(this.valuable.quantity);
      this.valuable.value = Math.floor(this.valuable.value * this.currency.multiplier);
      this.valuable.changeby = sessionStorage.getItem('userId');
      this.valuable.timestamp = new Date();
      this.valuableService.create(this.valuable).then((response) => {
        this.valuable = new Valuable();
        this.valuable.location = this.selectedBag;
      });
    } else {
      this.toast.addToast('error', 'Error', 'You must select a location before adding an item');
    }
  }

  showQuickValueRange(item: DefaultValuable) {
    return '(' + this.currencyService.formatDisplay(this.currency, item.lowvalue) + ' - ' + this.currencyService.formatDisplay(this.currency, item.highvalue) + ')';
  }

  quickAdd() {
    if (this.valuable.location) {
      const item1 = this.defaultValuables.find(item => item.key === this.step3);
      const item2 = this.defaultValuables.find(item => item.key === this.step2);
      this.valuable.quantity = 1;
      this.valuable.name = item1.name + ', ' + item2.name;
      this.valuable.vault = this.vault.key;
      this.valuable.changeby = sessionStorage.getItem('userId');
      const hv = Math.floor(item1.highvalue);
      const lv = Math.floor(item1.lowvalue);
      this.valuable.value = Math.floor((Math.random() * (hv - lv))) + lv;
      this.valuable.timestamp = Date.now();
      this.valuableService.create(this.valuable).then((response) => {
        this.valuable = new Valuable();
        this.valuable.location = this.selectedBag;
      });
    } else {
      this.toast.addToast('error', 'Error', 'You must select a location before adding an item');
    }

  }

  filterStep1() {
    if (this.defaultValuables) {
      return this.defaultValuables.filter(val1 => val1.parent === '');
    }
  }

  filterStep2() {
    if (this.step1 !== '-1') {
      return this.defaultValuables.filter(val2 => val2.parent === this.step1);
    }
  }

  filterStep3() {
    if (this.step2 !== '-1') {
      return this.defaultValuables.filter(val3 => (val3.parent === this.step2 || val3.parent === this.step1) && val3.lowvalue > 0 );
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
