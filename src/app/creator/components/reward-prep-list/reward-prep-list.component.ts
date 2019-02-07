import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { RewardPrepService } from 'shared/services/reward-prep.service';
import { VaultService } from 'shared/services/vault.service';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { RewardPrep } from 'shared/models/reward-prep';
import { Router } from '@angular/router';

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

  rewardprep: RewardPrep[];
  rewardPrepSub: Subscription;
  selectedPrep: RewardPrep;
  oldVault: string;
  prepColumns = [
    { prop: 'name' },
    { name: 'Vault'}
  ];

    constructor(
      private confirmationDialogService: ConfirmationDialogService,
      private rewardPrepService: RewardPrepService,
      private vaultService: VaultService,
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

    applyPrep(row) {

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
          this.vaultService.remove(row.key);        }
      })
      .catch(() => {
      });

    }

    onPrepSelect({ selected }) {
      this.selectedPrep = this.prepSelected[0];
    }

    onPrepActivate(event) {
      // console.log('Activate Event', event);
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

