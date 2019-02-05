import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';
import { Treasure } from 'shared/models/treasure';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TreasureService {
  treasure$: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    ) {
    this.treasure$ = this.db.list('/treasure', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: Treasure) {
    return this.db.list('/treasure').push(obj);
  }

  update(treasureID: string, obj: Treasure) {
    return this.db.object('/treasure/' + treasureID).update(obj);
  }

  remove(treasureID: string) {
    return this.db.object('/treasure/' + treasureID).remove();
  }

  getAll() {
    return this.treasure$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(treasureID: string) {
    return this.db.object('/treasure/' + treasureID);
  }

  getTreasureByVault(vaultId: string) {
    return this.db.list('/treasure',
      ref => ref.orderByChild('vault')
      .equalTo(vaultId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as Treasure;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }

  checkBagContents(bagId: string) {
    return this.http.get('https://treasury-app.firebaseio.com/treasure.json?orderBy="location"&equalTo="' + bagId + '"');
  }

}
