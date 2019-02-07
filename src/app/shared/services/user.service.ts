import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$:  Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.user$ = this.db.list('/users', c => c.orderByChild('name'))
    .snapshotChanges();
  }


  getAll() {
    return this.user$.pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
  }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  saveChanges(user: AppUser, userId) {
    user.role = user.role ? user.role : 'user';
    this.db.object('/users/' + userId).update({
      theme: user.theme,
      role: user.role
      // necromancer: user.necromancer
    });
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
