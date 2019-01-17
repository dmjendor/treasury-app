import { Injectable, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Coin } from 'shared/models/coin';
import { map } from 'rxjs/operators';
import { CurrencyService } from 'shared/services/currency.service';
import { Currency } from 'shared/models/currency';

@Injectable({
  providedIn: 'root'
})
export class TreasuryCurrencyService {

  coins$: Observable<any[]>;

  constructor(
    private currencyService: CurrencyService,
    private db: AngularFireDatabase
    ) {
    this.coins$ = this.db.list('/coin', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: Coin) {
    return this.db.list('/coin').push(obj);
  }

  update(coinID: string, obj: Coin) {
    return this.db.object('/coin/' + coinID).update(obj);
  }

  remove(coinID: string) {
    return this.db.object('/coin/' + coinID).remove();
  }

  getAll() {
    return this.coins$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(coinID: string) {
    return this.db.object('/coin/' + coinID);
  }

  getCoinRecordsByVault(vaultId: string) {
    return this.db.list('/coin',
      ref => ref.orderByChild('vault')
      .equalTo(vaultId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as Coin;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }
}
