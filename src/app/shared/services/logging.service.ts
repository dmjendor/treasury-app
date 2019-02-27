import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Differences } from 'shared/models/differences';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
    logs$: Observable<any[]>;

    constructor(
      private db: AngularFireDatabase,
      private fns: AngularFireFunctions
    ) {
      this.logs$ = this.db.list('/logs', c => c.orderByChild('timestamp'))
      .snapshotChanges();
    }

    create(obj: Differences) {
      return this.db.list('/logs').push(obj);
    }

    update(logsID: string, obj: Differences) {
      return this.db.object('/logs/' + logsID).update(obj);
    }

    remove(logsID: string) {
      return this.db.object('/logs/' + logsID).remove();
    }

    getAll() {
      return this.logs$.pipe(map(changes => {
        return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
      }));
    }

    get(logsID: string) {
      return this.db.object('/logs/' + logsID);
    }

    getLogsByUser(user: string) {
      return this.db.list('/logs',
        ref => ref.orderByChild('changeby')
        .equalTo(user))
        .snapshotChanges()
        .pipe(map(items => {            // <== new way of chaining
          return items.map(a => {
            const data = a.payload.val() as Differences;
            const key = a.payload.key;
            data.key  = key;
            return data;
          });
        }));
    }

    getLogsByVault(vaultId: string) {
      return this.db.list('/logs',
        ref => ref.orderByChild('vault')
        .equalTo(vaultId))
        .snapshotChanges()
        .pipe(map(items => {            // <== new way of chaining
          return items.map(a => {
            const data = a.payload.val() as Differences;
            const key = a.payload.key;
            data.key  = key;
            return data;
          });
        }));
    }

  directLog(source, id: string) {
    const diff = new Differences();

  }

  private deleteUnchanged(obj) {
    for (const key in obj) {
        if (obj[key].type === 'unchanged') { delete obj[key]; }
    }
    return obj;
  }

  logChanges(source: string, newVal: any, oldVal: any) {
    const result = this.deepDiffMapper().map(newVal, oldVal) as Differences;
    result.changes = this.deleteUnchanged(result.changes);
    result.source = source;
    if (result.changes.vault &&
      result.changes.vault.type === 'updated' &&
      (result.changes.vault.oldValue && result.changes.vault.newValue)) {
        // If the vault was changed create an entry in the log for both vaults
        const resultA = JSON.parse(JSON.stringify(result));
        resultA.vault = resultA.changes.vault.oldValue;
        this.create(resultA);
        resultA.vault = resultA.changes.vault.newValue;
        this.create(resultA);
      } else {
        this.create(result);
      }

  }

  private deepDiffMapper() {
    return {
        VALUE_CREATED: 'created',
        VALUE_UPDATED: 'updated',
        VALUE_DELETED: 'deleted',
        VALUE_UNCHANGED: 'unchanged',
        map: function(obj1, obj2) {
            if (this.isFunction(obj1) || this.isFunction(obj2)) {
                throw new Error('Invalid argument. Function given, object expected.');
            }
            if (this.isValue(obj1) || this.isValue(obj2)) {
                return {
                    type: this.compareValues(obj1, obj2),
                    newValue: obj1 ? obj1 : null,
                    oldValue: obj2 ? obj2 : null
                };
            }

            const diff = new Differences();
            if (obj1.key || obj2.key) {
              diff.key = obj1.key ? obj1.key : obj2.key;
            }
            diff.itemkey = obj1.key ? obj1.key : (obj2.key ? obj2.key : null);
            diff.vault = obj1.vault ? obj1.vault : obj2.vault;
            diff.changeby = obj1.changeby ? obj1.changeby : obj2.changeby;
            diff.timestamp = Date.now();
            diff.changes = {};

            for (const key in obj1) {
                if (this.isFunction(obj1[key])) {
                    continue;
                }

                let value2;
                if ('undefined' !== typeof(obj2[key])) {
                    value2 = obj2[key];
                }

                diff.changes[key] = this.map(obj1[key], value2);
            }
            for (const key in obj2) {
                if (this.isFunction(obj2[key]) || ('undefined' !== typeof(diff.changes[key]))) {
                    continue;
                }

                diff.changes[key] = this.map(undefined, obj2[key]);
            }

            return diff;

        },
        compareValues: function(value1, value2) {
            if (value1 === value2) {
                return this.VALUE_UNCHANGED;
            }
            if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
                return this.VALUE_UNCHANGED;
            }
            if ('undefined' === typeof(value1)) {
                return this.VALUE_CREATED;
            }
            if ('undefined' === typeof(value2)) {
                return this.VALUE_DELETED;
            }

            return this.VALUE_UPDATED;
        },
        isFunction: function(obj) {
            return {}.toString.apply(obj) === '[object Function]';
        },
        isArray: function(obj) {
            return {}.toString.apply(obj) === '[object Array]';
        },
        isDate: function(obj) {
            return {}.toString.apply(obj) === '[object Date]';
        },
        isObject: function(obj) {
            return {}.toString.apply(obj) === '[object Object]';
        },
        isValue: function(obj) {
            return !this.isObject(obj) && !this.isArray(obj);
        }
    };
  }



}
