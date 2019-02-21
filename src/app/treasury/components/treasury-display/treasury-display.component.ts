import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Permission } from 'shared/models/permission';
import { Vault } from 'shared/models/vault';
import { PermissionService } from 'shared/services/permission.service';
import { ThemeService } from 'shared/services/theme.service';
import { VaultService } from 'shared/services/vault.service';

@Component({
  selector: 'treasury-display',
  templateUrl: './treasury-display.component.html',
  styleUrls: ['./treasury-display.component.css']
})
export class TreasuryDisplayComponent implements OnDestroy {
  routeSub: Subscription;
  permissionSub: Subscription;
  splitTreasure: boolean = false;
  treasuryId: string;
  vault: Vault = new Vault();
  coinAllowed: boolean = false;
  treasureAllowed: boolean = false;
  valuablesAllowed: boolean = false;
  permissions: Permission[];

  constructor(
    private router: Router,
    private vaultService: VaultService,
    private themeService: ThemeService,
    private permissionService: PermissionService
  ) {
    this.routeSub = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.initializeTreasury(e);
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    this.permissionSub.unsubscribe();
  }

  initializeTreasury(e) {
    this.vaultService.setActiveVault(this.vault);
    if (e.url) {
      this.treasuryId = e.url.replace('/treasury/', '');
      this.vaultService.get(this.treasuryId)
        .valueChanges().pipe(take(1)).subscribe(p => {
          this.vault = p as Vault;
          this.vault.key = this.treasuryId;
          this.vaultService.setActiveVault(this.vault);
          this.themeService.setCurrentTheme(this.vault.theme);
          this.permissionSub = this.permissionService.getPermissionsByUser()
          .subscribe(permission => {
            this.permissions = permission as Permission[];
            this.permissions.forEach((perm) => {
              if (perm.coin && perm.vault === this.vault.key) {
                this.coinAllowed = true;
              }
              if (perm.gja && perm.vault === this.vault.key) {
                this.valuablesAllowed = true;
              }
              if (perm.item && perm.vault === this.vault.key) {
                this.treasureAllowed = true;
              }
            });
          });
        });
    }

  }

}
