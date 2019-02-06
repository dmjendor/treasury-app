import { Injectable } from '@angular/core';
import { PrepValuable } from 'shared/models/prep-valuables';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PrepValuablesService {

  prepvaluables$: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
    ) {
    this.prepvaluables$ = this.db.list('/prepvaluables', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: PrepValuable) {
    return this.db.list('/prepvaluables').push(obj);
  }

  update(valID: string, obj: PrepValuable) {
    return this.db.object('/prepvaluables/' + valID).update(obj);
  }

  remove(valID: string) {
    return this.db.object('/prepvaluables/' + valID).remove();
  }

  getAll() {
    return this.prepvaluables$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(valID: string) {
    return this.db.object('/prepvaluables/' + valID);
  }

  getSnapshot(rewardId) {
    return this.http.get('https://treasury-app.firebaseio.com/prepvaluables.json?orderBy="reward"&equalTo="' + rewardId + '"');
  }

  getPrepValuablesByReward(rewardId: string) {
    return this.db.list('/prepvaluables',
      ref => ref.orderByChild('reward')
      .equalTo(rewardId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as PrepValuable;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }
}
