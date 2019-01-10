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

  createDefaults(vaultId) {
    const copper: Currency = {
        key: null,
        abbreviation: 'cp',
        multiplier: 1,
        name: 'Copper',
        vault: vaultId
      };
      const silver: Currency = {
        key: null,
        abbreviation: 'sp',
        multiplier: 10,
        name: 'Silver',
        vault: vaultId
      };
      const gold: Currency = {
        key: null,
        abbreviation: 'gp',
        multiplier: 100,
        name: 'Gold',
        vault: vaultId
      };
      const platinum: Currency = {
        key: null,
        abbreviation: 'pp',
        multiplier: 1000,
        name: 'Platinum',
        vault: vaultId
      };

    this.db.list('/currency').push(copper);
    this.db.list('/currency').push(silver);
    this.db.list('/currency').push(gold);
    return this.db.list('/currency').push(platinum);
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
