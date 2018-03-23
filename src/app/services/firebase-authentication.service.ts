import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../model/user';

@Injectable()
export class FirebaseAuthenticationService {
  private user: User = null;

  constructor(private firebaseAuth: AngularFireAuth) {
  }


  logIn(): Promise<User> {
    if (this.user) {
      return this.getUserPromise();
    } else {
      return this.newLogIn();
    }
  }

  private getUserPromise() {
    return new Promise<User>((resolve, reject) => {
      resolve(this.user);
    });
  }

  private newLogIn(): Promise<User> {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(res => {
      this.user = new User(res.user.displayName, res.user.email);
      return this.getUserPromise();
    });
  }

  logOut() {
    this.user = null;
    return this.firebaseAuth.auth.signOut();
  }
}
