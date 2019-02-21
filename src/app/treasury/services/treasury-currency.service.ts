import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coin } from 'shared/models/coin';
import { Page } from 'shared/models/page';
import { PagedData } from 'shared/models/paged-data';

@Injectable({
  providedIn: 'root'
})
export class TreasuryCurrencyService {

  coins$: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
    ) {
    this.coins$ = this.db.list('/coin', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: Coin) {
    this.db.list('/coin').push(obj);
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

  getPagedCoinRecordsByVault(vault: string, page: Page) {
    this.getCoinRecordsByVault(vault).toPromise().then((cn) => {
      const pagedData = new PagedData<Coin>();
      page.totalElements = cn.length;
      page.totalPages = page.totalElements / page.size;
      const start = page.pageNumber * page.size;
      const end = Math.min((start + page.size), page.totalElements);
      for (let i = start; i < end; i++) {
          const jsonObj = cn[i];
          jsonObj.value = Math.floor(jsonObj.value);
          const coin = new Coin(jsonObj.archived, jsonObj.changeby, jsonObj.currency, jsonObj.key, jsonObj.timestamp, jsonObj.value, jsonObj.vault);
          pagedData.data.push(coin);
      }
      pagedData.page = page;
      return pagedData;
    });
  }

  getSnapShot(vaultId) {
    return this.http.get('https://treasury-app.firebaseio.com/coin.json?orderBy="vault"&equalTo="' + vaultId + '"');
  }

  getSnapShotByCurrency(currencyId) {
    return this.http.get('https://treasury-app.firebaseio.com/coin.json?orderBy="currency"&equalTo="' + currencyId + '"');
  }

  createTreasurySplit(coins: Coin[]) {
    coins.forEach((coin, index) => {
        this.db.list('/coin/').push(coin);
    });
  }

  archiveCoin(coins: Coin[]) {
    return new Promise((resolve, reject) => {
      for (let r = 0; r < coins.length; r++) {
        coins[r].archived = true;
        this.update(coins[r].key, coins[r]);
      }
      resolve((a) => {
        return true;
      });
      reject((c) => {
        return false;
      });
    });
  }
}
