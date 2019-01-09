import { Component, OnInit, EventEmitter, Input, Output, OnChanges, OnDestroy } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from 'shared/services/currency.service';
import { VaultService } from 'shared/services/vault.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Currency } from 'shared/models/currency';
import { ThemeService } from 'shared/services/theme.service';
import { Theme } from 'shared/models/theme';

@Component({
  selector: 'treasury-form',
  templateUrl: './treasury-form.component.html',
  styleUrls: ['./treasury-form.component.css']
})
export class TreasuryFormComponent implements OnChanges, OnDestroy {
  @Input('vault') vault: Vault;
  @Output('vaultChange') emitter1: EventEmitter<object> = new EventEmitter<object>();
  id: string;
  currencySub: Subscription;
  currencies: Currency[];
  themeSub: Subscription;
  themeList: Theme[];

  constructor(
    private route: ActivatedRoute,
    private currencyService: CurrencyService,
    private themeService: ThemeService,
    private vaultService: VaultService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.vaultService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => {
        this.vault = p as Vault;
        this.vault.key = this.id;
      });
      this.currencySub = this.currencyService.getCurrenciesByVault(this.id)
      .subscribe(currency => {
        this.currencies = currency as Currency[];
      });
    }

    this.themeSub = this.themeService.getAll()
      .subscribe(theme => {
        this.themeList = theme as Theme[];
      });
  }

  ngOnChanges() {
    this.emitter1.emit(this.vault);
  }

  ngOnDestroy() {
    if (this.currencySub) {
      this.currencySub.unsubscribe();
    }
    this.themeSub.unsubscribe();
  }
}
