import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Modifier } from 'shared/models/modifier';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModifierService {
  modifier$: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    ) {
    this.modifier$ = this.db.list('/modifiers', c => c.orderByChild('name'))
    .snapshotChanges();
   }

  create(obj: Modifier) {
    return this.db.list('/modifiers').push(obj);
  }

  update(modifierID: string, obj: Modifier) {
    return this.db.object('/modifiers/' + modifierID).update(obj);
  }

  remove(modifierID: string) {
    return this.db.object('/modifiers/' + modifierID).remove();
  }

  getAll() {
    return this.modifier$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(modifierID: string) {
    return this.db.object('/modifiers/' + modifierID);
  }

}
