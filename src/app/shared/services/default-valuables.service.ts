import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { DefaultValuable } from 'shared/models/defaultvaluable';
import { map } from 'rxjs/operators';

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

}
