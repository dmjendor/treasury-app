import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { PrepTreasure } from 'shared/models/prep-treasure';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrepTreasureService {

  preptreasure$: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
    ) {
    this.preptreasure$ = this.db.list('/preptreasure', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: PrepTreasure) {
    return this.db.list('/preptreasures').push(obj);
  }

  update(itemID: string, obj: PrepTreasure) {
    return this.db.object('/preptreasures/' + itemID).update(obj);
  }

  remove(itemID: string) {
    return this.db.object('/preptreasures/' + itemID).remove();
  }

  getAll() {
    return this.preptreasure$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(itemID: string) {
    return this.db.object('/preptreasures/' + itemID);
  }

  getSnapshot(rewardId) {
    return this.http.get('https://treasury-app.firebaseio.com/preptreasures.json?orderBy="reward"&equalTo="' + rewardId + '"');
  }

  getPrepTreasureByReward(rewardId: string) {
    return this.db.list('/preptreasure',
      ref => ref.orderByChild('reward')
      .equalTo(rewardId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as PrepTreasure;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }
}
