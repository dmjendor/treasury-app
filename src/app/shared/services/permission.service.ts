import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Permission } from 'shared/models/permission';
import { map } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  permissions$: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private fns: AngularFireFunctions
    ) {
    this.permissions$ = this.db.list('/permissions', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: Permission) {
    return this.db.list('/permissions').push(obj);
  }

  update(permissionsID: string, obj: Permission) {
    return this.db.object('/permissions/' + permissionsID).update(obj);
  }

  remove(permissionsID: string) {
    return this.db.object('/permissions/' + permissionsID).remove();
  }

  getAll() {
    return this.permissions$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(permissionsID: string) {
    return this.db.object('/permissions/' + permissionsID);
  }

  getPermissionsByUser() {
    return this.db.list('/permissions',
      ref => ref.orderByChild('user')
      .equalTo(localStorage.getItem('userId')))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as Permission;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }

  getPermissionsByVault(vaultId: string) {
    return this.db.list('/permissions',
      ref => ref.orderByChild('vault')
      .equalTo(vaultId))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as Permission;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }

  initializeNewTreasury(user: string, vault: string) {
    this.create(
        {
          'view': true,
          'gja': true,
          'coin': true,
          'item': true,
          'vault': vault,
          'user': user
        } as Permission);
  }
}
