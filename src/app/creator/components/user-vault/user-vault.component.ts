import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vault } from 'shared/models/vault';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { Router, ActivatedRoute } from '@angular/router';
import { VaultService } from 'shared/services/vault.service';
import { Theme } from 'shared/models/theme';
import { ThemeService } from 'shared/services/theme.service';
import { forEach } from '@angular/router/src/utils/collection';
import { CurrencyService } from 'shared/services/currency.service';
import { Currency } from 'shared/models/currency';

@Component({
  selector: 'user-vault',
  templateUrl: './user-vault.component.html',
  styleUrls: ['./user-vault.component.css']
})
export class UserVaultComponent implements OnInit, OnDestroy {
  itemCount: number;
  selected: any[];
  appUser: AppUser;
  vault$;
  vault: Vault[];
  vaultSub: Subscription;
  selectedVault: Vault;
  themeList: Theme[];
  themeSub: Subscription;
  currencyList: Currency[];
  currencySub: Subscription;
  userId: string;
  userSubscription: Subscription;

    columns = [
      { prop: 'name' },
      { name: 'Theme'},
      { name: 'Active' }
    ];

    constructor(
      private currencyService: CurrencyService,
      private vaultService: VaultService,
      private themeService: ThemeService,
      private authService: AuthService,
      private router: Router
    ) {
    }

    themeName(themeID) {
      if (themeID && this.themeList.length > 0) {
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

    editVault(row) {
      localStorage.setItem('returnUrl', '/vaults');
      this.router.navigate(['/vaults/' + row.key]);
    }

    deleteVault(row) {
      this.vaultService.remove(row.key);
    }

    onSelect({ selected }) {
      this.selectedVault = this.selected[0];
    }

    onActivate(event) {
      // console.log('Activate Event', event);
    }

    filter(query: string) {
       const filteredProducts = (query) ?
        this.vault.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
        this.vault;
    }

    reloadItems(params) {
    }

    transform(source: Vault[]) {
      const dest: Vault[] = [];

      for (const sourceItem of source) {
        const destItem = {...sourceItem};
        dest.push(destItem);
      }
    }

    async ngOnInit() {

      this.userSubscription = this.authService.user$.subscribe(user => {
        this.userId = user.uid;
        this.vaultService.getVaultByOwner(this.userId)
        .subscribe(vault => {
          this.vault = vault as Vault[];
          this.selected = [vault[0]];
          this.selectedVault = vault[0] as Vault;
        });
      });

      this.themeSub = this.themeService.getAll()
      .subscribe(theme => {
        this.themeList = theme as Theme[];
      });

      this.currencySub = this.currencyService.getAll()
      .subscribe(currency => {
        this.currencyList = currency as Currency[];
      });

      this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
    }

    ngOnDestroy() {
      this.userSubscription.unsubscribe();
      this.themeSub.unsubscribe();
      this.currencySub.unsubscribe();
    }


  }

