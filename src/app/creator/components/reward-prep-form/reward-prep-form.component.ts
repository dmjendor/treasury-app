import { Component, OnInit } from '@angular/core';
import { RewardPrep } from 'shared/models/reward-prep';
import { ActivatedRoute } from '@angular/router';
import { RewardPrepService } from 'shared/services/reward-prep.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-reward-prep-form',
  templateUrl: './reward-prep-form.component.html',
  styleUrls: ['./reward-prep-form.component.css']
})
export class RewardPrepFormComponent implements OnInit {
id: string;
rewardprep = new RewardPrep();

  constructor(
    private route: ActivatedRoute,
    private rewardPrepService: RewardPrepService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
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

  create() {

  }

  save() {

  }

  delete() {

  }

  cancel() {

  }

}
