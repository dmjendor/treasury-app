import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { Currency } from 'shared/models/currency';
import { Theme } from 'shared/models/theme';
import { Vault } from 'shared/models/vault';
import { AuthService } from 'shared/services/auth.service';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { CurrencyService } from 'shared/services/currency.service';
import { ThemeService } from 'shared/services/theme.service';
import { VaultService } from 'shared/services/vault.service';

declare let ga: Function;

@Component({
  selector: 'user-vault',
  templateUrl: './user-vault.component.html',
  styleUrls: ['./user-vault.component.css']
})
export class UserVaultComponent implements OnInit, OnDestroy {
  userId: string = sessionStorage.getItem('userId');
  itemCount: number;
  vaultSelected: any[];
  prepSelected: any[];
  appUser: AppUser;
  showGS: boolean = false;
  vault$;
  vault: Vault[] = [];
  vaultSub: Subscription;
  selectedVault: Vault;

  themeList: Theme[];
  themeSub: Subscription;
  currencyList: Currency[];
  currencySub: Subscription;
  routeSub: Subscription;

  userSubscription: Subscription;

    vaultColumns = [
      { prop: 'name' },
      { name: 'Theme'},
      { name: 'Active'}
    ];

    constructor(
      private confirmationDialogService: ConfirmationDialogService,
      private currencyService: CurrencyService,
      private vaultService: VaultService,
      private themeService: ThemeService,
      private authService: AuthService,
      private router: Router
    ) {
      this.routeSub = this.router.events.subscribe(e => {
        if (e instanceof NavigationEnd) {
          ga('set', 'page', e.urlAfterRedirects);
          ga('send', 'pageview');
        }
      });
    }


    themeName(themeID) {
      if (themeID && this.themeList && this.themeList.length > 0) {
        for (let i = 0; i < this.themeList.length; i++) {
          if (this.themeList[i].key === themeID) {
            return this.themeList[i].name;
          }
        }
      }
    }

    currencyName(currencyID) {
      if (currencyID && this.currencyList && this.currencyList.length > 0) {
        for (let i = 0; i < this.currencyList.length; i++) {
          if (this.currencyList[i].key === currencyID) {
            return this.currencyList[i].name;
          }
        }
      }
    }

    editVault(row: Vault) {
      localStorage.setItem('returnUrl', '/vaults');
      this.router.navigate(['/vaults/' + row.key]);
    }

    deleteVault(row: Vault) {
      const header: string = 'Please confirm..';
      const body: string = 'Are you sure you wish to delete ' + row.name + '?  This action cannot be undone.';
      this.confirmationDialogService.confirm(header, body)
      .then((confirmed) => {
        if (confirmed) {
          this.vaultService.remove(row.key);        }
      })
      .catch(() => {
      });
    }

    vaultHistory(row: Vault) {
      localStorage.setItem('returnUrl', '/vaults');
      this.router.navigate(['/vaults/' + row.key + '/history']);
    }

    onVaultSelect({ selected }) {
      this.selectedVault = this.vaultSelected[0];
    }

    onVaultActivate(event) {
      // console.log('Activate Event', event);
    }

    filter(query: string) {
       const filteredProducts = (query) ?
        this.vault.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
        this.vault;
    }

    transform(source: Vault[]) {
      const dest: Vault[] = [];

      for (const sourceItem of source) {
        const destItem = {...sourceItem};
        dest.push(destItem);
      }
    }

    toggleGS() {
      this.showGS = !this.showGS;
    }

    async ngOnInit() {

      this.authService.appUser$.subscribe(appUser => {
        this.appUser = appUser;
        this.themeService.setCurrentTheme(this.appUser.theme);
      });

      this.vaultSub = this.vaultService.getVaultByOwner(this.userId)
      .subscribe(vault => {
        this.vault = vault as Vault[];
        this.vaultSelected = [vault[0]];
        this.selectedVault = vault[0] as Vault;
      });

      this.themeSub = this.themeService.getAll()
      .subscribe(theme => {
        this.themeList = theme as Theme[];
      });

      this.currencySub = this.currencyService.getAll()
      .subscribe(currency => {
        this.currencyList = currency as Currency[];
      });
    }

    ngOnDestroy() {
      this.vaultSub.unsubscribe();
      this.themeSub.unsubscribe();
      this.currencySub.unsubscribe();
      this.routeSub.unsubscribe();
    }


  }

