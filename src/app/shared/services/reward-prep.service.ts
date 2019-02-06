import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { RewardPrep } from 'shared/models/reward-prep';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RewardPrepService {
  rewardprep$: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    ) {
    this.rewardprep$ = this.db.list('/rewardprep', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: RewardPrep) {
    return this.db.list('/rewardprep').push(obj);
  }

  update(rewardprepID: string, obj: RewardPrep) {
    return this.db.object('/rewardprep/' + rewardprepID).update(obj);
  }

  remove(rewardprepID: string) {
    return this.db.object('/rewardprep/' + rewardprepID).remove();
  }

  getAll() {
    return this.rewardprep$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(rewardprepID: string) {
    return this.db.object('/rewardprep/' + rewardprepID);
  }

  getRewardPrepsByOwner(ownerId: string) {
    return this.db.list('/rewardprep',
      ref => ref.orderByChild('owner')
      .equalTo(ownerId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as RewardPrep;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }
}
