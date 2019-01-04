import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Currency } from 'shared/models/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  currencies$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.currencies$ = this.db.list('/currency', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: Currency) {
    return this.db.list('/currency').push(obj);
  }

  update(currencyID: string, obj: Currency) {
    return this.db.object('/currency/' + currencyID).update(obj);
  }

  remove(currencyID: string) {
    return this.db.object('/currency/' + currencyID).remove();
  }

  getAll() {
    return this.currencies$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(currencyID: string) {
    return this.db.object('/currency/' + currencyID);
  }

  getCurrenciesByVault(vaultId: string) {
    return this.db.list('/currency',
      ref => ref.orderByChild('vault')
      .equalTo(vaultId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as Currency;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }
}
