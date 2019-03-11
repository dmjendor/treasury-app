import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefaultValuable } from 'shared/models/defaultvaluable';

@Injectable({
  providedIn: 'root'
})
export class DefaultValuablesService {

  defaultvaluables$: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase
    ) {
    this.defaultvaluables$ = this.db.list('/defaultvaluables', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: DefaultValuable) {
    return this.db.list('/defaultvaluables').push(obj);
  }

  update(valuableID: string, obj: DefaultValuable) {
    return this.db.object('/defaultvaluables/' + valuableID).update(obj);
  }

  remove(valuableID: string) {
    return this.db.object('/defaultvaluables/' + valuableID).remove();
  }

  getAll() {
    return this.defaultvaluables$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(valuableID: string) {
    return this.db.object('/defaultvaluables/' + valuableID);
  }

  getValuablesByEdition(editionId: string) {
    return this.db.list('/defaultvaluables',
      ref => ref.orderByChild('edition')
      .equalTo(editionId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as DefaultValuable;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }
}
