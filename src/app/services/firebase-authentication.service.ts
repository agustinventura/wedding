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
          this.user = new User('', user.displayName, user.email, false, true);
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

  logout() {
    this.user = null;
    return this.firebaseAuth.auth.signOut();
  }

  mailLogin(mail, password): Observable<User> {
    let user: Observable<User>;
    if (this.user) {
      user = of(this.user);
    } else {
      user = fromPromise(
        this.firebaseAuth.auth.signInWithEmailAndPassword(mail, password)
      )
        .concatMap(result => {
          this.user = new User(
            '',
            result['user']['displayName'],
            result['user']['email'],
            false,
            true
          );
          return of(this.user);
        })
        .catch(reason => {
          if (reason.code === 'auth/user-not-found') {
            user = fromPromise(
              this.firebaseAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(
                mail,
                password
              )
            ).concatMap(result => {
              this.user = new User(
                '',
                result['user']['displayName'],
                result['user']['email'],
                false,
                true
              );
              return of(this.user);
            });
          } else if (reason.code === 'auth/wrong-password') {
            user = Observable.throw('Wrong password');
          }
          return user;
        });
    }
    return user;
  }

  forgotPassword(email: string) {
    return fromPromise(this.firebaseAuth.auth.sendPasswordResetEmail(email));
  }
}
