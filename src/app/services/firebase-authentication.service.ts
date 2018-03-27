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

  googleLogin(): Observable<User> {
    console.log('googleLogin');
    if (this.user) {
      return of(this.user);
    } else {
      this.newLogIn();
      return this.firebaseUser.concatMap(user => {
        console.log('concatMap de googleLogin');
        if (user) {
          this.user = new User('', user.displayName, user.email);
          return of(this.user);
        } else {
          return Observable.empty<User>();
        }
      });
    }
  }

  private newLogIn() {
    this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  googleLogout() {
    console.log('googleLogout');
    this.user = null;
    return this.firebaseAuth.auth.signOut();
  }
}
