import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vault } from 'shared/models/vault';

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  vaults$: Observable<any[]>;
  private av = new BehaviorSubject<Vault>(new Vault());
  activeVault$ = this.av.asObservable();

  constructor(private db: AngularFireDatabase) {
    this.vaults$ = this.db.list('/vaults', c => c.orderByChild('name'))
    .snapshotChanges();
   }

   setActiveVault(vault: Vault) {
     this.av.next(vault);
   }

  create(obj: Vault) {
    return this.db.list('/vaults').push(obj);
  }

  update(vaultID: string, obj: Vault) {
    return this.db.object('/vaults/' + vaultID).update(obj);
  }

  remove(vaultID: string) {
    return this.db.object('/vaults/' + vaultID).remove();
  }

  getAll() {
    return this.vaults$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(vaultID: string) {
    return this.db.object('/vaults/' + vaultID);
  }

  getVaultByOwner(userId: string) {
    return this.db.list('/vaults',
      ref => ref.orderByChild('owner')
      .equalTo(userId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as Vault;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }
}
