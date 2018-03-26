import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/first';

import { User } from '../model/user';

@Injectable()
export class FirebaseAuthenticationService {
  private user: User = null;
  private firebaseUser: Observable<firebase.User> = null;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.firebaseUser = this.firebaseAuth.authState;
  }

  logIn(): Observable<User> {
    if (this.user) {
      return of(this.user);
    } else {
      this.newLogIn();
      return this.firebaseUser.concatMap(user => {
        console.log('concat map de logIn');
        this.user = new User(user.displayName, user.email);
        return of(this.user);
      }).first();
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
