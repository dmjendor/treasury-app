import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { RewardPrep } from 'shared/models/reward-prep';
import { Vault } from 'shared/models/vault';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { RewardPrepService } from 'shared/services/reward-prep.service';

declare let ga: Function;

@Component({
  selector: 'app-reward-prep-form',
  templateUrl: './reward-prep-form.component.html',
  styleUrls: ['./reward-prep-form.component.css']
})
export class RewardPrepFormComponent implements OnInit, OnDestroy {
  @Input() vault: Vault;
  id: string;
  rewardprep = new RewardPrep();
  vaultList: Vault[];
  vaultId: string;
  userId: string = sessionStorage.getItem('userId');
  routeSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.routeSub = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        ga('set', 'page', e.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
   }



  ngOnInit() {

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
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
