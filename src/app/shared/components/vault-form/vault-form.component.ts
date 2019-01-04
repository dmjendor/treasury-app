import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'shared/services/utility.service';
import { VaultService } from 'shared/services/vault.service';
import { take } from 'rxjs/operators';
import { Currency } from 'shared/models/currency';
import { CurrencyService } from 'shared/services/currency.service';

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
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private currencyService: CurrencyService,
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
    this.router.navigate(['/admin/vaults']);
  }

  cancel() {
    this.router.navigate(['/admin/vaults']);
  }

  delete() {
    if (confirm('Are you sure you wish to delete this vault?')) {
      this.vaultService.remove(this.id);
      this.router.navigate(['/admin/vaults']);
    }
  }

  async ngOnInit() {

  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }



}
