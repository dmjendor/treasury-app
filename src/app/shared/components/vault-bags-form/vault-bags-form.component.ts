import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BagService } from 'app/shared/services/bag.service';
import { Subscription } from 'rxjs';
import { Bag } from 'shared/models/bag';
import { DefaultBag } from 'shared/models/defaultbag';
import { Vault } from 'shared/models/vault';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { DefaultBagService } from 'shared/services/default-bag.service';
import { ToastService } from 'shared/services/toast.service';
import { TreasureService } from 'shared/services/treasure.service';
import { UtilityService } from 'shared/services/utility.service';
import { ValuablesService } from 'shared/services/valuables.service';


@Component({
  selector: 'vault-bags-form',
  templateUrl: './vault-bags-form.component.html',
  styleUrls: ['./vault-bags-form.component.css']
})
export class VaultBagsFormComponent implements OnInit, OnDestroy {
  @Input('vault') vault: Vault;
  @Input('selectedBag') set setSelectedBag(value) {
    this.bag = value;
    this.original = JSON.parse(JSON.stringify(this.bag));
  }
  @Input('edit') editMode: boolean;
  @Output('selectedBagChange') emitter1: EventEmitter<object> = new EventEmitter<object>();
  @Output('editChange') emitter2: EventEmitter<boolean> = new EventEmitter<boolean>();
  bag: Bag;
  defaultBags: DefaultBag[];
  dBagSub: Subscription;
  selected: any[];
  original: Bag;

  constructor(
    private toast: ToastService,
    private bagService: BagService,
    private utilityService: UtilityService,
    private dBagService: DefaultBagService,
    private treasureService: TreasureService,
    private valuablesService: ValuablesService,
    private confirmationDialogService: ConfirmationDialogService
    ) {  }

  save() {
    if (this.bag.key !== null) {
      this.bagService.update(this.bag.key, this.bag, this.original);
    } else {
      this.bag.vault = this.vault.key;
      this.bag.changeby = sessionStorage.getItem('userId');
      console.log(this.bag);
      this.bagService.create(this.bag);
    }

    this.emitter2.emit(false);
  }

  cancel() {
    this.emitter2.emit(false);
  }

  delete() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete the bag ' + this.bag.name + '?  This action cannot be undone.';
    this.treasureService.checkBagContents(this.bag.key).toPromise().then((treasure) => {
      if (this.utilityService.isEmpty(treasure)) {
        this.valuablesService.checkBagContents(this.bag.key).toPromise().then((valuable) => {
          if (this.utilityService.isEmpty(valuable)) {
            this.confirmationDialogService.confirm(header, body)
            .then((confirmed) => {
              if (confirmed) {
                this.bagService.remove(this.bag.key, this.bag);
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


  selectBag(name) {
    this.bag.name = name;
  }

  async ngOnInit() {
    this.dBagSub = this.dBagService.getAll()
      .subscribe(dbag => {
        this.defaultBags = dbag as DefaultBag[];
        this.defaultBags.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      });
  }

  ngOnDestroy() {
    this.dBagSub.unsubscribe();
  }
}
