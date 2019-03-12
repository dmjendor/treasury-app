import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Bag } from 'shared/models/bag';
import { Currency } from 'shared/models/currency';
import { Edition } from 'shared/models/edition';
import { Permission } from 'shared/models/permission';
import { Theme } from 'shared/models/theme';
import { Vault } from 'shared/models/vault';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { CurrencyService } from 'shared/services/currency.service';
import { EditionService } from 'shared/services/edition.service';
import { ThemeService } from 'shared/services/theme.service';
import { UtilityService } from 'shared/services/utility.service';
import { VaultService } from 'shared/services/vault.service';

@Component({
  selector: 'vault-form',
  templateUrl: './vault-form.component.html',
  styleUrls: ['./vault-form.component.css']
})
export class VaultFormComponent implements OnDestroy {
  vaultList: Vault[];
  vault = new Vault();
  vaultSub: Subscription;
  currencies: Currency[];
  currencySub: Subscription;
  selectedCurrency: Currency;
  editCurrency: boolean = false;
  selectedPermission: Permission;
  editPermission: boolean = false;
  selectedBag: Bag;
  editBags: boolean = false;
  themeList: Theme[];
  themeSub: Subscription;
  editionList: Edition[];
  editionSub: Subscription;
  id: string;
  currentRoute: string;
  rtParams: Object = {};
  xferOutTitle: string = 'Allow users with edit permissions to transfer treasures and valuables out of your treasury.';
  xferInTitle: string = 'Allow users with edit permissions to transfer treasures and valuables into your treasury.';
  splitTitle: string = 'Give treasury a share during coin split.';
  mergeTitle: string = 'Merge Coin Split to Highest Denomination.';
  prepTitle: string = 'Prepare rewards for distribution in advance.';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vaultService: VaultService,
    private themeService: ThemeService,
    private editionService: EditionService,
    private utilityService: UtilityService,
    private currencyService: CurrencyService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.currentRoute = this.route.snapshot.routeConfig.path.substr(0, this.route.snapshot.routeConfig.path.length - 4);
    if (this.currentRoute.includes('admin')) {
      this.currentRoute = 'admin';
      this.rtParams = {queryParams: {tab: 'vaults'}};
    }
    if (this.id) {
      this.vaultService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => {
        this.vault = p as Vault;
        this.themeService.setCurrentTheme(this.vault.theme);
        this.vault.key = this.id;
        this.themeSub = this.themeService.getAll()
        .subscribe(theme => {
          this.themeList = theme as Theme[];
        });
      });
      this.currencySub = this.currencyService.getCurrenciesByVault(this.id)
      .subscribe(currency => {
        this.currencies = currency as Currency[];
        this.currencies.sort((a, b) => (a.multiplier > b.multiplier) ? 1 : ((b.multiplier > a.multiplier) ? -1 : 0));
      });
      this.editionSub = this.editionService.getAll()
      .subscribe(edition => {
        this.editionList =  edition.filter(function(ed: Edition, i) {
          return (ed.user === sessionStorage.getItem('userId') || !ed.hasOwnProperty('user'));
        }) as Edition[];
      });
    }
  }

  toTitleCase(string) {
    return this.utilityService.toTitleCase(string);
  }

  save() {
    if (this.id) {
      this.vaultService.update(this.id, this.vault);
    } else {
      this.vaultService.create(this.vault);
    }
    this.router.navigate([this.currentRoute], this.rtParams);
  }

  cancel() {
    this.router.navigate([this.currentRoute], this.rtParams);
  }

  delete() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete ' + this.vault.name + '?  This action cannot be undone.';
    this.confirmationDialogService.confirm(header, body)
    .then((confirmed) => {
      if (confirmed) {
        this.vaultService.remove(this.id);
        this.router.navigate([this.currentRoute], this.rtParams);
      }
    })
    .catch(() => {
      this.router.navigate([this.currentRoute], this.rtParams);
    });
  }

  themePreview() {
    this.themeService.setCurrentTheme(this.vault.theme);
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
    this.themeSub.unsubscribe();
    this.editionSub.unsubscribe();
  }



}
