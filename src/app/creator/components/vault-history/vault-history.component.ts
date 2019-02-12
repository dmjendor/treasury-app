import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BagService } from 'shared/services/bag.service';
import { TreasuryCurrencyService } from 'app/treasury/services/treasury-currency.service';
import { ValuablesService } from 'shared/services/valuables.service';
import { TreasureService } from 'shared/services/treasure.service';
import { Subscription } from 'rxjs';
import { Coin } from 'shared/models/coin';
import { Bag } from 'shared/models/bag';
import { Valuable } from 'shared/models/valuable';
import { Treasure } from 'shared/models/treasure';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from 'shared/services/currency.service';
import { UtilityService } from 'shared/services/utility.service';
import { Currency } from 'shared/models/currency';
import { UserService } from 'shared/services/user.service';
import { VaultService } from 'shared/services/vault.service';
import { Vault } from 'shared/models/vault';
import { take } from 'rxjs/operators';
import { AppUser } from 'shared/models/app-user';
import { Page } from 'shared/models/page';

@Component({
  selector: 'app-vault-history',
  templateUrl: './vault-history.component.html',
  styleUrls: ['./vault-history.component.css']
})
export class VaultHistoryComponent implements OnInit, OnDestroy {
  id: string;
  bagSub: Subscription;
  bagList: Bag[] = [];
  coinSub: Subscription;
  coinList: Coin[] = [];
  valuableSub: Subscription;
  valuablesList: Valuable[] = [];
  treasureSub: Subscription;
  treasureList: Treasure[] = [];
  currencySub: Subscription;
  currencyList: Currency[] = [];
  userSub: Subscription;
  userList: AppUser[] = [];
  vault: Vault;
  @ViewChild('coinTable') cTable;
  cPage = new Page();
  cIsLoading: boolean = false;


  coinColumns = [
    { name: 'Value' },
    { name: 'Currency' },
    { name: 'ChangeBy' },
    { name: 'Timestamp' },
    { name: 'Archived'}
  ];

  valuablesColumns = [
    { name: 'Name' },
    { name: 'Value' },
    { name: 'Quantity' },
    { name: 'Location' },
    { name: 'ChangeBy' },
    { name: 'Timestamp' },
    { name: 'Archived'}
  ];

  treasureColumns = [
    { name: 'Name' },
    { name: 'Value' },
    { name: 'Quantity' },
    { name: 'Location' },
    { name: 'ChangeBy' },
    { name: 'Timestamp' },
    { name: 'Archived'}
  ];

  constructor(
    private route: ActivatedRoute,
    private bagService: BagService,
    private userService: UserService,
    private vaultService: VaultService,
    private utilityService: UtilityService,
    private currencyService: CurrencyService,
    private treasureService: TreasureService,
    private valuablesService: ValuablesService,
    private coinService: TreasuryCurrencyService,

  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.vaultService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => {
        this.vault = p as Vault;
        this.vault.key = this.id;
      });
  }

  ngOnInit() {
    this.bagSub = this.bagService.getBagsByVault(this.id)
      .subscribe((bag) => this.bagList = bag);

    this.coinService.getCoinRecordsByVault(this.id)
      .subscribe((coin) => {
        this.coinList = coin as Coin[];
        this.coinList.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0));
      });

    this.treasureSub = this.treasureService.getTreasureByVault(this.id)
      .subscribe((item) => {
        this.treasureList = item as Treasure[];
        this.treasureList.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0));
      });

    this.valuableSub = this.valuablesService.getValuablesByVault(this.id)
      .subscribe((val) => {
        this.valuablesList = val as Valuable[];
        this.valuablesList.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0));
      });

    this.currencySub = this.currencyService.getCurrenciesByVault(this.id)
      .subscribe((curr) => {
        this.currencyList = curr;
      });

    this.userSub = this.userService.getAll()
      .subscribe((usr) => this.userList = usr as AppUser[]);
  }

  ngOnDestroy() {
    this.bagSub.unsubscribe();
    this.coinSub.unsubscribe();
    this.userSub.unsubscribe();
    this.valuableSub.unsubscribe();
    this.treasureSub.unsubscribe();
    this.currencySub.unsubscribe();
  }

  getName(name: string) {
    if (name && this.userList && this.userList.length > 0) {
      for (let u = 0; u < this.userList.length; u++) {
        if (this.userList[u].key === name) {
          return this.userList[u].name;
        }
      }
    }
  }

  getCurrency(currency: string, retVal: string) {
    if (currency && this.currencyList && this.currencyList.length > 0) {
      for (let c = 0; c < this.currencyList.length; c++) {
        if (this.currencyList[c].key === currency) {
          let request;
          switch (retVal) {
            case 'name':
              request = this.currencyList[c].name;
              break;
            case 'abbr':
              request = this.currencyList[c].abbreviation;
              break;
            default:
              request = this.currencyList[c].name;
              break;
          }
          return request;
        }
      }
    }
  }

  getLocation(bag: string) {
    if (bag && this.bagList && this.bagList.length > 0) {
      for (let c = 0; c < this.bagList.length; c++) {
        if (this.bagList[c].key === bag) {
          return this.bagList[c].name;
        }
      }
    }
  }

  formatDate(date: string) {
    return this.utilityService.formatDate(date);
  }

  formatNumber(input: number) {
    const retVal = input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return  retVal;
  }

}
