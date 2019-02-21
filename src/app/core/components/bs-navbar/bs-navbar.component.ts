import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { Vault } from 'shared/models/vault';
import { VaultService } from 'shared/services/vault.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  isTreasury: boolean;
  vaultId: string;
  vault: Vault;
  vaultSub: Subscription;
  private alive: boolean = true;

  constructor(
    private vaultService: VaultService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isTreasury = window.location.pathname.includes('treasury');
    vaultService.activeVault$.pipe(takeWhile(() => this.alive)).subscribe(
      vault=> {
          this.vault = vault;
    });
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnDestroy() {
    this.vaultSub.unsubscribe();
  }

}
