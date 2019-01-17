import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { take } from 'rxjs/operators';
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
  treasuryId: string;
  vault: Vault;
  routeSub: Subscription;

  constructor(
    private vaultService: VaultService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isTreasury = window.location.pathname.includes('treasury');
    this.routeSub = this.router.events.subscribe(params => {
      if ((params instanceof RoutesRecognized) && this.isTreasury) {
        this.treasuryId = params.state.root.firstChild.params['id'];
        this.vaultService.get(this.treasuryId)
          .valueChanges().pipe(take(1)).subscribe(p => {
            this.vault = p as Vault;
          });
      }
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
    this.routeSub.unsubscribe();
  }

}
