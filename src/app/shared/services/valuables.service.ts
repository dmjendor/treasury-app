import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Valuable } from 'shared/models/valuable';

import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class ValuablesService {
  valuables$: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private loggingService: LoggingService
    ) {
    this.valuables$ = this.db.list('/valuables', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: Valuable) {
    this.loggingService.logChanges('valuables', obj, {});
    return this.db.list('/valuables').push(obj);
  }

  update(valuablesID: string, obj: Valuable, baseObj: Valuable) {
    this.loggingService.logChanges('treasure', obj, baseObj);
    return this.db.object('/valuables/' + valuablesID).update(obj);
  }

  remove(valuablesID: string, obj: Valuable) {
    this.loggingService.logChanges('treasure', {}, obj);
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
