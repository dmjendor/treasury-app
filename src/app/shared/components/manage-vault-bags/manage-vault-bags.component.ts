import { Component, Input, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';
import { BagService } from 'shared/services/bag.service';
import { Router } from '@angular/router';
import { Bag } from 'shared/models/bag';
import { Subscription } from 'rxjs';
import { Vault } from 'shared/models/vault';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { ToastService } from 'shared/services/toast.service';
import { TreasureService } from 'shared/services/treasure.service';
import { ValuablesService } from 'shared/services/valuables.service';
import { UtilityService } from 'shared/services/utility.service';


@Component({
  selector: 'manage-vault-bags',
  templateUrl: './manage-vault-bags.component.html',
  styleUrls: ['./manage-vault-bags.component.css']
})
export class ManageVaultBagsComponent implements OnDestroy, OnChanges {
  @Input('vault') vault: Vault;
  @Input('selectedBag') selectedBag: Bag;
  @Input('edit') editMode: boolean;
  @Output('selectedBagChange') emitter1: EventEmitter<object> = new EventEmitter<object>();
  @Output('editChange') emitter2: EventEmitter<boolean> = new EventEmitter<boolean>();

  bags: Bag[];
  bagSub: Subscription;
  selected: any[];
  newBag = new Bag();
  showDisplay: boolean = false;

  columns = [
    { prop: 'name', name: 'Name' }
  ];
constructor(
  private router: Router,
  private toast: ToastService,
  private bagService: BagService,
  private utilityService: UtilityService,
  private treasureService: TreasureService,
  private valuablesService: ValuablesService,
  private confirmationDialogService: ConfirmationDialogService,
  ) { }

toggleDisplay() {
  this.showDisplay = !this.showDisplay;
}

createBag() {
  this.emitter1.emit(this.newBag);
  this.emitter2.emit(true);
}

editBag() {
  this.emitter1.emit(this.selectedBag);
  this.emitter2.emit(true);
}

deleteBag() {
  const header: string = 'Please confirm..';
  const body: string = 'Are you sure you wish to delete the bag ' + this.selectedBag.name + '?  This action cannot be undone.';
  this.treasureService.checkBagContents(this.selectedBag.key).toPromise().then((treasure) => {
    if (this.utilityService.isEmpty(treasure)) {
      this.valuablesService.checkBagContents(this.selectedBag.key).toPromise().then((valuable) => {
        if (this.utilityService.isEmpty(valuable)) {
          this.confirmationDialogService.confirm(header, body)
          .then((confirmed) => {
            if (confirmed) {
              this.bagService.remove(this.selectedBag.key);
              this.emitter2.emit(false);
            }
          })
          .catch(() => {

          });
        } else {
          this.toast.addToast('error', 'Error', 'You cannot delete a bag while it contains valuables.');
        }
      });
    } else {
     this.toast.addToast('error', 'Error', 'You cannot delete a bag while it contains treasure.');
    }
  });
}

onSelect({ selected }) {
  this.selectedBag = selected[0];
}

onActivate(event) {
  // console.log('Activate Event', event);
}

filter(query: string) {
    const filteredProducts = (query) ?
    this.bags.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
    this.bags;
  // this.initializeTable(filteredProducts);

}

ngOnChanges() {
  if (this.vault.key) {
    this.bagSub = this.bagService.getBagsByVault(this.vault.key)
    .subscribe(cls => {
      this.bags = cls as Bag[];
      this.bags.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
      this.selected = [];
      // this.selectedBag = this.bags[0];
    });
  }
}

ngOnDestroy() {
  this.bagSub.unsubscribe();
}

}
