import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { DefaultTreasure } from 'shared/models/defaulttreasure';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DefaultTreasureService {

  defaulttreasures$: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase
    ) {
    this.defaulttreasures$ = this.db.list('/defaulttreasures', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: DefaultTreasure) {
    return this.db.list('/defaulttreasures').push(obj);
  }

  update(treasureID: string, obj: DefaultTreasure) {
    return this.db.object('/defaulttreasures/' + treasureID).update(obj);
  }

  remove(treasureID: string) {
    return this.db.object('/defaulttreasures/' + treasureID).remove();
  }

  getAll() {
    return this.defaulttreasures$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(treasureID: string) {
    return this.db.object('/defaulttreasures/' + treasureID);
  }

  getTreasuresByEdition(editionId: string) {
    return this.db.list('/defaulttreasures',
      ref => ref.orderByChild('edition')
      .equalTo(editionId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as DefaultTreasure;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }
}
