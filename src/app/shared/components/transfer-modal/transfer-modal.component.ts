import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Bag } from 'shared/models/bag';
import { Permission } from 'shared/models/permission';
import { Vault } from 'shared/models/vault';
import { BagService } from 'shared/services/bag.service';
import { PermissionService } from 'shared/services/permission.service';
import { TreasureService } from 'shared/services/treasure.service';
import { ValuablesService } from 'shared/services/valuables.service';
import { VaultService } from 'shared/services/vault.service';

@Component({
  selector: 'app-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrls: ['./transfer-modal.component.css']
})
export class TransferModalComponent implements OnInit, OnDestroy {
  vault: Vault;
  item: any;
  source: string;
  baseItem: any;
  vaultSub: Subscription;
  vaults: Vault[];
  bagSub: Subscription;
  bagList: Bag[];
  permissionSub: Subscription;
  permissions: Permission[];
  selectVault: boolean = true;
  selectContainer: boolean = false;
  selectedVault: string = '';
  selectedContainer: string = '';
  mergedPerms: {};

  constructor(
    private permissionService: PermissionService,
    private valuablesService: ValuablesService,
    private treasureService: TreasureService,
    private vaultService: VaultService,
    private bagService: BagService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.baseItem = JSON.parse(JSON.stringify(this.item));
    this.vaultSub = this.vaultService.getAll()
    .subscribe(vault => {
      this.vaults = vault as Vault[];
      this.permissionSub = this.permissionService.getPermissionsByUser()
      .subscribe(permission => {
        this.permissions = permission as Permission[];
        // merge permissions with vault info.
        const mp = this.permissions.map((perm) =>
          Object.assign({}, perm, this.vaults.find((vlt) => vlt.key === perm.vault) || {}));
        // remove current vault from list to prevent self transfers
        this.mergedPerms = mp.filter((vl) => vl.key !== this.vault.key);
      });
    });
  }

  ngOnDestroy() {
    this.vaultSub.unsubscribe();
    if (this.bagSub) {
      this.bagSub.unsubscribe();
    }
  }

  nextStep() {
    this.selectVault = false;
    this.selectContainer = true;
    this.bagSub = this.bagService.getBagsByVault(this.selectedVault)
      .subscribe((bg) => this.bagList = bg as Bag[]);
  }

  vaultName(key: string) {
    if (this.vaults && key) {
      const val = this.vaults.find(vl => vl.key === key);
      return val.name;
    }
  }

  save() {
    this.item.vault = this.selectedVault;
    this.item.location = this.selectedContainer;
    if (this.source === 'treasure') {
      this.treasureService.update(this.item.key, this.item, this.baseItem).then((a) => {
        this.modal.close();
      });
    } else if (this.source === 'valuables') {
      this.valuablesService.update(this.item.key, this.item, this.baseItem).then((a) => {
        this.modal.close();
      });
    }
  }

  cancel() {
    this.modal.close();
  }

}
