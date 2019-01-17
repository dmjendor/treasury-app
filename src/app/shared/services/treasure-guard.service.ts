import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Permission } from 'shared/models/permission';
import { PermissionService } from './permission.service';
import { AppUser } from 'shared/models/app-user';

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
