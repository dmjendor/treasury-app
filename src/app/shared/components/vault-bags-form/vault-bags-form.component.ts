import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Bag } from 'shared/models/bag';
import { Subscription } from 'rxjs';
import { Vault } from 'shared/models/vault';
import { BagService } from 'app/shared/services/bag.service';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { DefaultBagService } from 'shared/services/default-bag.service';
import { DefaultBag } from 'shared/models/defaultbag';


@Component({
  selector: 'vault-bags-form',
  templateUrl: './vault-bags-form.component.html',
  styleUrls: ['./vault-bags-form.component.css']
})
export class VaultBagsFormComponent implements OnInit, OnDestroy {
  @Input('vault') vault: Vault;
  @Input('selectedBag') set setSelectedBag(value) {
    this.bag = value;
  }
  @Input('edit') editMode: boolean;
  @Output('selectedBagChange') emitter1: EventEmitter<object> = new EventEmitter<object>();
  @Output('editChange') emitter2: EventEmitter<boolean> = new EventEmitter<boolean>();
  bag: Bag;
  defaultBags: DefaultBag[];
  dBagSub: Subscription;
  selected: any[];

  constructor(
    private bagService: BagService,
    private dBagService: DefaultBagService,
    private confirmationDialogService: ConfirmationDialogService
    ) { }

  save() {
    if (this.bag.key !== null) {
      this.bagService.update(this.bag.key, this.bag);
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
      this.confirmationDialogService.confirm(header, body)
      .then((confirmed) => {
        if (confirmed) {
          this.bagService.remove(this.bag.key);
          this.emitter2.emit(false);
        }
      })
      .catch(() => {

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
