import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { DefaultBag } from 'shared/models/defaultbag';

@Injectable({
  providedIn: 'root'
})
export class DefaultBagService {

  defaultbags$: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase
    ) {
    this.defaultbags$ = this.db.list('/defaultbags', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: DefaultBag) {
    return this.db.list('/defaultbags').push(obj);
  }

  update(bagID: string, obj: DefaultBag) {
    return this.db.object('/defaultbags/' + bagID).update(obj);
  }

  remove(bagID: string) {
    return this.db.object('/defaultbags/' + bagID).remove();
  }

  getAll() {
    return this.defaultbags$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(bagID: string) {
    return this.db.object('/defaultbags/' + bagID);
  }

  // getBagsByVault(vaultId: string) {
  //   return this.db.list('/bags',
  //     ref => ref.orderByChild('vault')
  //     .equalTo(vaultId))
  //     .snapshotChanges()
  //     .pipe(map(items => {            // <== new way of chaining
  //       return items.map(a => {
  //         const data = a.payload.val() as Bag;
  //         const key = a.payload.key;
  //         data.key  = key;
  //         return data;
  //       });
  //     }));
  // }
}
