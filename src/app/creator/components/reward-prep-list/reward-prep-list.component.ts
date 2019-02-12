import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { RewardPrepService } from 'shared/services/reward-prep.service';
import { VaultService } from 'shared/services/vault.service';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { RewardPrep } from 'shared/models/reward-prep';
import { Router } from '@angular/router';
import { PrepCoinService } from 'app/creator/services/prep-coin.service';
import { PrepValuablesService } from 'app/creator/services/prep-valuables.service';
import { PrepTreasureService } from 'app/creator/services/prep-treasure.service';
import { TreasuryCurrencyService } from 'app/treasury/services/treasury-currency.service';
import { TreasureService } from 'shared/services/treasure.service';
import { ValuablesService } from 'shared/services/valuables.service';
import { Coin } from 'shared/models/coin';
import { PrepCoin } from 'shared/models/prep-coin';
import { PrepValuable } from 'shared/models/prep-valuables';
import { Valuable } from 'shared/models/valuable';
import { PrepTreasure } from 'shared/models/prep-treasure';
import { Treasure } from 'shared/models/treasure';
import { ToastService } from 'shared/services/toast.service';
import { UtilityService } from 'shared/services/utility.service';

@Component({
  selector: 'reward-prep-list',
  templateUrl: './reward-prep-list.component.html',
  styleUrls: ['./reward-prep-list.component.css']
})
export class RewardPrepListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() vault: Vault;
  userId: string = sessionStorage.getItem('userId');
  prepSelected: any[];

  vaultSub: Subscription;
  vaultList: Vault[];

  rewardprep: RewardPrep[] = [];
  rewardPrepSub: Subscription;
  selectedPrep: RewardPrep;
  oldVault: string;
  prepColumns = [
    { prop: 'name' },
    { name: 'Vault'},
    { name: 'Timestamp'}
  ];

    constructor(
      private confirmationDialogService: ConfirmationDialogService,
      private prepValuablesService: PrepValuablesService,
      private prepTreasureService: PrepTreasureService,
      private coinService: TreasuryCurrencyService,
      private rewardPrepService: RewardPrepService,
      private valuablesService: ValuablesService,
      private treasureService: TreasureService,
      private prepCoinService: PrepCoinService,
      private utilityService: UtilityService,
      private vaultService: VaultService,
      private toast: ToastService,
      private router: Router
    ) {
    }


    async ngOnInit() {
      this.createSubscriptions();
    }

    ngOnChanges() {
      if (this.vault && this.oldVault && this.vault.key  && (this.vault.key !== this.oldVault)) {
        this.destroySubscriptions().then((init) => {
          this.createSubscriptions();
        });
      }
    }
    ngOnDestroy() {
      this.destroySubscriptions();
    }

    createSubscriptions() {
      this.vaultSub = this.vaultService.getVaultByOwner(this.userId)
      .subscribe(vlt => {
        this.vaultList = vlt as Vault[];
        this.rewardPrepSub = this.rewardPrepService.getRewardPrepsByOwner(this.userId)
        .subscribe(prep => {
          this.rewardprep = prep as RewardPrep[];
          for (let i = this.rewardprep.length - 1; i >= 0; --i) {
            if (this.rewardprep[i].archived || this.rewardprep[i].vault !== this.vault.key) {
              this.rewardprep.splice(i, 1);
            }
          }
          this.oldVault = this.vault.key;
        });
      });
    }

    destroySubscriptions() {
      const rewardPrepPromise  = new Promise((resolve, reject) => {
        this.rewardPrepSub.unsubscribe();
        resolve();
        reject();
      });

      return rewardPrepPromise.then((a) => {
        return true;
      });
    }

    vaultName(vaultID) {
      if (vaultID && this.vaultList && this.vaultList.length > 0) {
        for (let i = 0; i < this.vaultList.length; i++) {
          if (this.vaultList[i].key === vaultID) {
            return this.vaultList[i].name;
          }
        }
      }
    }

    convertTimestamp(time) {
      return this.utilityService.formatDate(time);
    }

    transferPrep(row) {
      // get snapshot of coins from database
      this.prepCoinService.getSnapshot(row.key).toPromise().then((tCoin) => {
        // convert JSON object received into individual objects
        Object.entries(tCoin).forEach(([key, value]) => {
          // for each object, create a copy for coin transfer
          const coin = Object.assign({}, value) as PrepCoin;
          coin.timestamp = Date.now(); // change timestamp to now
          delete coin.reward; // delete invalid reward value
          this.coinService.create(coin as Coin); // create new coin record
          value.archived = true; // archive prepcoin value
          if (!value.archived) { // just a safeguard against multiple submits
            this.prepCoinService.update(key, value as PrepCoin); // archive prep coin
          }
        });
      });
      // get snapshot of valuables from database
      this.prepValuablesService.getSnapshot(row.key).toPromise().then((tVal) => {
        // convert JSON object received into individual objects
        Object.entries(tVal).forEach(([key, value]) => {
          // for each object, create a copy for valuable transfer
          const val = Object.assign({}, value) as PrepValuable;
          val.timestamp = Date.now(); // change timestamp to now
          delete val.reward; // delete invalid reward value
          this.valuablesService.create(val as Valuable); // create new valuable record
          value.archived = true; // archive prepvaluable value
          if (!value.archived) { // just a safeguard against multiple submits
            this.prepValuablesService.update(key, value as PrepValuable); // archive prep valuable
          }
        });
      });
      // get snapshot of treasures from database
      this.prepTreasureService.getSnapshot(row.key).toPromise().then((iVal) => {
        // convert JSON object received into individual objects
        Object.entries(iVal).forEach(([key, value]) => {
          // for each object, create a copy for treasure transfer
          const item = Object.assign({}, value) as PrepTreasure;
          item.timestamp = Date.now(); // change timestamp to now
          delete item.reward; // delete invalid reward value
          this.treasureService.create(item as Treasure); // create new treasure record
          value.archived = true; // archive prep treasure value
          if (!value.archived) { // just a safeguard against multiple submits
            this.prepTreasureService.update(key, value as PrepTreasure); // archive prep treasure
          }
        });
      });

      row.archived = true;
      this.rewardPrepService.update(row.key, row as RewardPrep);
      this.toast.addToast('success', 'Success', row.name + ' transfered successfully.');

    }

    editPrep(row) {
      localStorage.setItem('returnUrl', '/vaults');
      this.router.navigate(['/rewardprep/' + row.key]);
    }

    deletePrep(row) {
      const header: string = 'Please confirm..';
      const body: string = 'Are you sure you wish to delete ' + row.name + '?  This action cannot be undone.';
      this.confirmationDialogService.confirm(header, body)
      .then((confirmed) => {
        if (confirmed) {
          this.rewardPrepService.remove(row.key);        }
      })
      .catch(() => {
      });

    }

    onPrepSelect(event) {
      console.log(event);
      this.selectedPrep = this.prepSelected[0];
    }

    filter(query: string) {
       const filteredProducts = (query) ?
        this.rewardprep.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
        this.rewardprep;
    }

    reloadItems(params) {
    }

    transform(source: RewardPrep[]) {
      const dest: RewardPrep[] = [];

      for (const sourceItem of source) {
        const destItem = {...sourceItem};
        dest.push(destItem);
      }
    }



  }

