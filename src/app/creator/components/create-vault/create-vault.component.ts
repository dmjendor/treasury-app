import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';

import { FiltersService } from 'shared/services/filters.service';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { VaultService } from 'shared/services/vault.service';
import { Router } from '@angular/router';

@Component({
  selector: 'create-vault',
  templateUrl: './create-vault.component.html',
  styleUrls: ['./create-vault.component.css']
})

export class CreateVaultComponent  implements OnInit, OnDestroy {
  active: boolean;
  vault: Vault;
  appUser: AppUser;
  userSub: Subscription;
  userId: string;

  constructor(
    private vaultService: VaultService,
    private authService: AuthService,
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
    this.vaultService.create(this.vault);
    this.router.navigate(['/vaults']);
  }

}

