import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';

import { FiltersService } from 'shared/services/filters.service';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { VaultService } from 'shared/services/vault.service';
import { Router } from '@angular/router';
import { Permission } from 'shared/models/permission';
import { PermissionService } from 'shared/services/permission.service';
import { ToastService } from 'shared/services/toast.service';


@Component({
  selector: 'create-vault',
  templateUrl: './create-vault.component.html',
  styleUrls: ['./create-vault.component.css']
})

export class CreateVaultComponent  implements OnInit, OnDestroy {
  active: boolean;
  vault = new Vault();
  appUser: AppUser;
  userSub: Subscription;
  userId: string;

  constructor(
    private permissionService: PermissionService,
    private vaultService: VaultService,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
    ) {

  }

  async ngOnInit() {
    this.userSub = this.authService.user$.subscribe(user => {
      this.userId = user.uid;
    });

    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  cancelVault() {
    this.router.navigate(['/vaults']);
  }

  createVault() {
    this.vault.owner = this.userId;
    const promise = new Promise((resolve, reject) => {
      resolve(this.vaultService.create(this.vault));
    });
    promise.then((data: Vault) => {
      this.toast.addToast('success', 'Success', 'New Treasury created successfully.');
      this.permissionService.initializeNewTreasury(this.userId, data.key);
      this.router.navigate(['/vaults']);
    }).catch((error) => {
      this.toast.addToast('error', 'Error', 'An error occured creating the new vault.');
      this.router.navigate(['/vaults']);
    });
  }

}

