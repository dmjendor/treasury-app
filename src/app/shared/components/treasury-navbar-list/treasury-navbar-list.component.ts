import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { PermissionService } from 'shared/services/permission.service';
import { Permission } from 'shared/models/permission';
import { Subscription } from 'rxjs';
import { Vault } from 'shared/models/vault';
import { VaultService } from 'shared/services/vault.service';
import { Router } from '@angular/router';

@Component({
  selector: 'treasury-navbar-list',
  templateUrl: './treasury-navbar-list.component.html',
  styleUrls: ['./treasury-navbar-list.component.css']
})
export class TreasuryNavbarListComponent implements OnInit, OnDestroy {
  user: string;
  permissions: Permission[];
  permissionSub: Subscription;
  vaults: Vault[];
  vaultSub: Subscription;
  mergedPerms: any;



  constructor(
    private permissionService: PermissionService,
    private vaultService: VaultService,
    private router: Router
    ) {

     }

  vaultRoute(vault: string) {
    return '/treasury/' + vault;
  }

  async ngOnInit() {
    this.vaultSub = this.vaultService.getAll()
      .subscribe(vault => {
        this.vaults = vault as Vault[];
        this.permissionSub = this.permissionService.getPermissionsByUser()
        .subscribe(permission => {
          this.permissions = permission as Permission[];
          this.mergedPerms = this.permissions.map((perm) =>
          Object.assign({}, perm, this.vaults.find((vlt) => vlt.key === perm.vault) || {}));
        });
    });


  }

  ngOnDestroy() {
    this.permissionSub.unsubscribe();
    this.vaultSub.unsubscribe();
  }

}
