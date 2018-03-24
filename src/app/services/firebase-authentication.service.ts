import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';

import { User } from '../model/user';

@Injectable()
export class FirebaseAuthenticationService {
  private user: User = null;
  private firebaseUser: Observable<firebase.User> = null;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.firebaseUser = this.firebaseAuth.authState;
    this.firebaseUser.subscribe(user => {
      if (user) {
        this.user = new User(user.displayName, user.email);
      } else {
        this.user = null;
      }
    });
  }

  logIn() {
    if (this.user) {
      return of(this.user);
    } else {
      this.newLogIn();
      return this.firebaseUser.switchMap(() => of(this.user));
    }
  }

  private newLogIn() {
    this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logOut() {
    this.user = null;
    return this.firebaseAuth.auth.signOut();
  }
}
