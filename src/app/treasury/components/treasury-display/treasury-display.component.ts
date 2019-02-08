import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { VaultService } from 'shared/services/vault.service';
import { take } from 'rxjs/operators';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { ThemeService } from 'shared/services/theme.service';
import { PermissionService } from 'shared/services/permission.service';
import { Permission } from 'shared/models/permission';

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
  vault: Vault;
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
    if (e.url) {
      this.treasuryId = e.url.replace('/treasury/', '');
      this.vaultService.get(this.treasuryId)
        .valueChanges().pipe(take(1)).subscribe(p => {
          this.vault = p as Vault;
          this.vault.key = this.treasuryId;
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
