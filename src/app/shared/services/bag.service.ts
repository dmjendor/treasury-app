import { Injectable } from '@angular/core';
import { Bag } from 'shared/models/bag';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BagService {

  bags$: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
    ) {
    this.bags$ = this.db.list('/bags', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: Bag) {
    return this.db.list('/bags').push(obj);
  }

  update(bagID: string, obj: Bag) {
    return this.db.object('/bags/' + bagID).update(obj);
  }

  remove(bagID: string) {
    return this.db.object('/bags/' + bagID).remove();
  }

  getAll() {
    return this.bags$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(bagID: string) {
    return this.db.object('/bags/' + bagID);
  }

  getSnapshot(vaultId) {
    return this.http.get('https://treasury-app.firebaseio.com/bags.json?orderBy="vault"&equalTo="' + vaultId + '"');
  }

  getBagsByVault(vaultId: string) {
    return this.db.list('/bags',
      ref => ref.orderByChild('vault')
      .equalTo(vaultId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as Bag;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }
}
