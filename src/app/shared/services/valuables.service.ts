import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Valuable } from 'shared/models/valuable';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValuablesService {
  valuables$: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    ) {
    this.valuables$ = this.db.list('/valuables', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: Valuable) {
    return this.db.list('/valuables').push(obj);
  }

  update(valuablesID: string, obj: Valuable) {
    return this.db.object('/valuables/' + valuablesID).update(obj);
  }

  remove(valuablesID: string) {
    return this.db.object('/valuables/' + valuablesID).remove();
  }

  getAll() {
    return this.valuables$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(valuablesID: string) {
    return this.db.object('/valuables/' + valuablesID);
  }

  getValuablesByVault(vaultId: string) {
    return this.db.list('/valuables',
      ref => ref.orderByChild('vault')
      .equalTo(vaultId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as Valuable;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }

  checkBagContents(bagId: string) {
    return this.http.get('https://treasury-app.firebaseio.com/valuables.json?orderBy="location"&equalTo="' + bagId + '"');
  }
}
