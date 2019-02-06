import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { VaultService } from 'shared/services/vault.service';
import { take } from 'rxjs/operators';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { ThemeService } from 'shared/services/theme.service';

@Component({
  selector: 'treasury-display',
  templateUrl: './treasury-display.component.html',
  styleUrls: ['./treasury-display.component.css']
})
export class TreasuryDisplayComponent implements OnInit, OnDestroy, OnChanges {
  routeSub: Subscription;
  splitTreasure: boolean = false;
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

  ngOnChanges() {
    console.log(this.splitTreasure);
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
          console.log('Nav: ' + this.vault.key);
          this.themeService.setCurrentTheme(this.vault.theme);
        });
    }

  }

}
