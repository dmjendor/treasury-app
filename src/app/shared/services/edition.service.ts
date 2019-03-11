import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Edition } from 'shared/models/edition';

@Injectable({
  providedIn: 'root'
})
export class EditionService {
  edition$: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    ) {
    this.edition$ = this.db.list('/editions', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: Edition) {
    return this.db.list('/editions').push(obj);
  }

  update(editionID: string, obj: Edition) {
    return this.db.object('/editions/' + editionID).update(obj);
  }

  remove(editionID: string) {
    return this.db.object('/editions/' + editionID).remove();
  }

  getAll() {
    return this.edition$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(editionID: string) {
    return this.db.object('/editions/' + editionID);
  }

  getEditionsByUser(userId: string) {
    return this.db.list('/editions',
      ref => ref.orderByChild('user')
      .equalTo(userId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as Edition;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }

}
