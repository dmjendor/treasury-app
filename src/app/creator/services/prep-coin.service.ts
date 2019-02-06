import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { PrepCoin } from 'shared/models/prep-coin';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrepCoinService {

  prepcoins$: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
    ) {
    this.prepcoins$ = this.db.list('/prepcoins', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: PrepCoin) {
    return this.db.list('/prepcoins').push(obj);
  }

  update(coinID: string, obj: PrepCoin) {
    return this.db.object('/prepcoins/' + coinID).update(obj);
  }

  remove(coinID: string) {
    return this.db.object('/prepcoins/' + coinID).remove();
  }

  getAll() {
    return this.prepcoins$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(coinID: string) {
    return this.db.object('/prepcoins/' + coinID);
  }

  getSnapshot(rewardId) {
    return this.http.get('https://treasury-app.firebaseio.com/prepcoins.json?orderBy="reward"&equalTo="' + rewardId + '"');
  }

  getPrepCoinsByReward(rewardId: string) {
    return this.db.list('/prepcoins',
      ref => ref.orderByChild('reward')
      .equalTo(rewardId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as PrepCoin;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }
}
