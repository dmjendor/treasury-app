import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'shared/services/utility.service';
import { VaultService } from 'shared/services/vault.service';
import { take } from 'rxjs/operators';
import { Currency } from 'shared/models/currency';
import { CurrencyService } from 'shared/services/currency.service';
import { ThemeService } from 'shared/services/theme.service';
import { Theme } from 'shared/models/theme';

@Component({
  selector: 'vault-form',
  templateUrl: './vault-form.component.html',
  styleUrls: ['./vault-form.component.css']
})
export class VaultFormComponent implements OnInit, OnDestroy {
  vaultList: Vault[];
  vault = new Vault();
  vaultSub: Subscription;
  currencies: Currency[];
  currencySub: Subscription;
  selectedCurrency: Currency;
  editCurrency: boolean = false;
  themeList: Theme[];
  themeSub: Subscription;
  id: string;
  currentRoute: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private currencyService: CurrencyService,
    private vaultService: VaultService,
    private themeService: ThemeService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.currentRoute = this.route.snapshot.routeConfig.path.substr(0, this.route.snapshot.routeConfig.path.length - 4);

    console.log(this.currentRoute);
    if (this.id) {
      this.vaultService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => {
        this.vault = p as Vault;
        this.vault.key = this.id;
      });
      this.currencySub = this.currencyService.getCurrenciesByVault(this.id)
      .subscribe(currency => {
        this.currencies = currency as Currency[];
        this.currencies.sort((a, b) => (a.multiplier > b.multiplier) ? 1 : ((b.multiplier > a.multiplier) ? -1 : 0));

      });

      this.themeSub = this.themeService.getAll()
      .subscribe(theme => {
        this.themeList = theme as Theme[];
      });
    }
  }

  toTitleCase(string) {
    return this.utilityService.toTitleCase(string);
  }

  save(charVault) {
    if (this.id) {
      this.vaultService.update(this.id, charVault);
    } else {
      this.vaultService.create(charVault);
    }
    this.router.navigate([this.currentRoute]);
  }

  cancel() {
    this.router.navigate([this.currentRoute]);
  }

  delete() {
    if (confirm('Are you sure you wish to delete this vault?')) {
      this.vaultService.remove(this.id);
      this.router.navigate([this.currentRoute]);
    }
  }

  async ngOnInit() {

  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
    this.themeSub.unsubscribe();
  }



}
