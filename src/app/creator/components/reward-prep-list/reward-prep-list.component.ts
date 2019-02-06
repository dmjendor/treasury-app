import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class RewardPrepListComponent implements OnInit, OnDestroy {
  userId: string = sessionStorage.getItem('userId');
  itemCount: number;
  vaultSelected: any[];
  prepSelected: any[];

  vaultSub: Subscription;
  vaultList: Vault[];

  rewardprep: RewardPrep[];
  rewardPrepSub: Subscription;
  selectedPrep: RewardPrep;

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

    vaultName(vaultID) {
      if (vaultID && this.vaultList && this.vaultList.length > 0) {
        for (let i = 0; i < this.vaultList.length; i++) {
          if (this.vaultList[i].key === vaultID) {
            return this.vaultList[i].name;
          }
        }
      }
    }

    editPrep(row) {
      localStorage.setItem('returnUrl', '/vaults');
      this.router.navigate(['/rewardprep/' + row.key]);
    }

    deleteVault(row) {
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

    async ngOnInit() {
      this.vaultService.getVaultByOwner(this.userId)
        .subscribe(vault => {
          this.vaultList = vault as Vault[];
        });

      this.rewardPrepSub = this.rewardPrepService.getRewardPrepsByOwner(this.userId)
      .subscribe(prep => {
        this.rewardprep = prep as RewardPrep[];
      });
    }

    ngOnDestroy() {
      this.rewardPrepSub.unsubscribe();
    }


  }

