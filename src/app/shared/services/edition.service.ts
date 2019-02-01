import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Edition } from 'shared/models/edition';
import { map } from 'rxjs/operators';

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

}
