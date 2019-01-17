import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RoutesRecognized, NavigationEnd, NavigationStart } from '@angular/router';
import { VaultService } from 'shared/services/vault.service';
import { take } from 'rxjs/operators';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { ThemeService } from 'shared/services/theme.service';

@Component({
  selector: 'app-treasury-display',
  templateUrl: './treasury-display.component.html',
  styleUrls: ['./treasury-display.component.css']
})
export class TreasuryDisplayComponent implements OnInit, OnDestroy {
  routeSub: Subscription;
  treasuryId: string;
  vault: Vault;

  constructor(
    private router: Router,
    private vaultService: VaultService,
    private themeService: ThemeService
  ) {
    this.routeSub = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.initializeTreasury(e);
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  initializeTreasury(e) {
    if (e.url) {
      this.treasuryId = e.url.replace('/treasury/', '');
      this.vaultService.get(this.treasuryId)
        .valueChanges().pipe(take(1)).subscribe(p => {
          this.vault = p as Vault;
          this.vault.key = this.treasuryId;
          this.themeService.setCurrentTheme(this.vault.theme);
        });
    }

  }

}
