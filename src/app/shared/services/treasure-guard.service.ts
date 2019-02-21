import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { Permission } from 'shared/models/permission';

import { AuthService } from './auth.service';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class TreasureGuard implements CanActivate, OnInit {
  vaultId: string;
  permissions: Permission[];
  appUser: AppUser;

  constructor(
    private permissionService: PermissionService,
    private authService: AuthService,
    private router: Router
    ) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    return this.hasRequiredPermission(state.root.firstChild.params.id);
  }

  protected hasRequiredPermission(vault: string): Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.permissionService.checkTreasuryAccess(vault, sessionStorage.getItem('userId'))
      .subscribe(perm => {
        resolve(perm);
        if (!perm) {
          this.router.navigate(['/noAccess']);
        }
      });
    });
  }

  ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }
}
