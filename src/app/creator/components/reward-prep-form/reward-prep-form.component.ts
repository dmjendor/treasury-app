import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RewardPrep } from 'shared/models/reward-prep';
import { ActivatedRoute, Router } from '@angular/router';
import { RewardPrepService } from 'shared/services/reward-prep.service';
import { take } from 'rxjs/operators';
import { VaultService } from 'shared/services/vault.service';
import { Subscription } from 'rxjs';
import { Vault } from 'shared/models/vault';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';

@Component({
  selector: 'app-reward-prep-form',
  templateUrl: './reward-prep-form.component.html',
  styleUrls: ['./reward-prep-form.component.css']
})
export class RewardPrepFormComponent implements OnInit, OnDestroy {
  @Input() vault: Vault;
  id: string;
  rewardprep = new RewardPrep();
  vaultSub: Subscription;
  vaultList: Vault[];
  vaultId: string;
  userId: string = sessionStorage.getItem('userId');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vaultService: VaultService,
    private rewardPrepService: RewardPrepService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.vaultId = this.route.snapshot.paramMap.get('vaultid');
    if (this.id) {
      this.rewardPrepService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => {
        this.rewardprep = p as RewardPrep;
        this.rewardprep.key = this.id;
      });
    }
   }



  ngOnInit() {

  }

  ngOnDestroy() {

  }

  create() {
    this.rewardprep.timestamp = Date.now();
    this.rewardprep.vault = this.vaultId;
    this.rewardprep.owner = sessionStorage.getItem('userId');
    this.rewardPrepService.create(this.rewardprep).then((reward) => {
      this.router.navigate(['/rewardprep/' + reward.key]);
    });
  }

  save() {
    this.rewardprep.timestamp = Date.now();
    this.rewardPrepService.update(this.rewardprep.key, this.rewardprep).then((reward) => {
      this.router.navigate(['/rewardprep/']);
    });
  }

  delete() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete the reward prep-work for ' + this.rewardprep.name + '?  This action cannot be undone.';
    this.confirmationDialogService.confirm(header, body)
    .then((confirmed) => {
      if (confirmed) {
        this.rewardPrepService.remove(this.id);
        this.router.navigate(['/rewardprep']);
      }
    })
    .catch(() => {

    });
  }

  cancel() {
    this.router.navigate(['/rewardprep']);
  }

}
