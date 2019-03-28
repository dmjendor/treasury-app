import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { Vault } from 'shared/models/vault';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { UserService } from 'shared/services/user.service';
import { VaultService } from 'shared/services/vault.service';

@Component({
  selector: 'manage-vaults',
  templateUrl: './manage-vaults.component.html',
  styleUrls: ['./manage-vaults.component.css']
})
export class ManageVaultsComponent implements OnInit, OnDestroy {
  vaults: Vault[];
  vaultSub: Subscription;
  selected: any[];
  selectedVault: Vault;
  userList: AppUser[];
  userSub: Subscription;
  columns = [
    { prop: 'name', name: 'Name' },
    { name: 'Owner' },
    { name: 'Active' }
  ];

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private vaultService: VaultService,
    private userService: UserService,
    private router: Router
    ) {
    }

  createVault() {
    this.router.navigate(['/admin/vaults/new']);
  }

  editVault() {
    localStorage.setItem('returnUrl', '/admin/vaults');
    this.router.navigate(['/admin/vaults/' + this.selectedVault.key]);
  }

  deleteVault() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete ' + this.selectedVault.name + '?  This action cannot be undone.';
    this.confirmationDialogService.confirm(header, body)
    .then((confirmed) => {
      if (confirmed) {
        this.vaultService.remove(this.selectedVault.key);
      }
    })
    .catch(() => {
    });
  }

  onSelect({ selected }) {
    this.selectedVault = this.selected[0];
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  filter(query: string) {
     const filteredProducts = (query) ?
      this.vaults.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.vaults;
    // this.initializeTable(filteredProducts);

  }

  reloadItems(params) {

  }

  getName(name: string) {
    if (name && this.userList && this.userList.length > 0) {
      for (let u = 0; u < this.userList.length; u++) {
        if (this.userList[u].key === name) {
          return this.userList[u].name;
        }
      }
    }
  }

  async ngOnInit() {

    this.vaultSub = this.vaultService.getAll()
    .subscribe(cls => {
      this.vaults = cls as Vault[];
      this.selected = [this.vaults[0]];
      this.selectedVault = this.vaults[0];
    });

    this.userSub = this.userService.getAll()
      .subscribe((usr) => this.userList = usr as AppUser[]);
  }

  ngOnDestroy() {
    this.vaultSub.unsubscribe();
  }

}
