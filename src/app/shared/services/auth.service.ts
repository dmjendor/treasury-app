import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(switchMap(user => {
        if (user) {
          localStorage.setItem('userId', user.uid);
          return this.userService.get(user.uid).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  login(provider) {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      localStorage.setItem('returnUrl', returnUrl);
      switch (provider) {
        case 'google':
         this.signInWithGoogle();
        break;
        case 'facebook':
         this.signInWithFacebook();
        break;
        case 'twitter':
         this.signInWithTwitter();
        break;
      }
      // this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  signInWithTwitter() {
    return this.afAuth.auth.signInWithRedirect(
      new firebase.auth.TwitterAuthProvider()
    );
  }
  signInWithFacebook() {
    return this.afAuth.auth.signInWithRedirect(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  signInWithGoogle() {
    return this.afAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  signInWithGithub() {
    return this.afAuth.auth.signInWithRedirect(
      new firebase.auth.GithubAuthProvider()
    );
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }


  logout() {
    this.afAuth.auth.signOut();
  }

}
