import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/first';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { User } from '../model/user';

@Injectable()
export class FirebaseAuthenticationService {
  private user: User = null;
  private firebaseUser: Observable<firebase.User> = null;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.firebaseUser = this.firebaseAuth.authState;
  }

  googleLogin(): Observable<User> {
    if (this.user) {
      return of(this.user);
    } else {
      this.newLogIn();
      return this.firebaseUser.concatMap(user => {
        if (user) {
          this.user = new User('', user.displayName, user.email, false);
          return of(this.user);
        } else {
          return Observable.empty<User>();
        }
      });
    }
  }

  private newLogIn() {
    this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  googleLogout() {
    this.user = null;
    return this.firebaseAuth.auth.signOut();
  }

  emailPasswordLogin(email: string, password: string) {
    fromPromise(
      this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
    ).subscribe(something => console.log(something));
  }
}
