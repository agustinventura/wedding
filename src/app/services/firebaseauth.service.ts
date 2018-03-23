import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirebaseAuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User;

  constructor(private firebaseAuth: AngularFireAuth) {

  }

  setupAuthentication() {
    this.user = this.firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  signInWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  isLogged() {
    if (this.userDetails) {
      return true;
    } else {
      return false;
    }
  }
}
