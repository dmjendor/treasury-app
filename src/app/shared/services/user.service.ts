import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppUser } from '../models/app-user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$:  Observable<any>;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
  ) {
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

  getSnapshot() {
    return this.http.get('https://treasury-app.firebaseio.com/users.json');
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
