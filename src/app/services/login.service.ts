import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseAuthenticationService } from './firebase-authentication.service';
import { FirebaseAuthorizationService } from './firebase-authorization.service';

import { User } from '../model/user';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/concat';

@Injectable()
export class LoginService {
  user: User;
  authentication: Observable<User>;

  constructor(
    private firebaseAuthenticationService: FirebaseAuthenticationService,
    private firebaseAuthorizationService: FirebaseAuthorizationService
  ) {}

  isLogged() {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }

  loginWithGoogle() {
    if (!this.user) {
      return this.firebaseAuthenticationService.logIn();
    }
    return of(this.user);
  }

  logout() {
    this.user = null;
    this.firebaseAuthenticationService.logOut();
  }

  authorize() {
    this.authentication = this.loginWithGoogle().concatMap(user => this.firebaseAuthorizationService.authorize(user)).concatMap(user => {
      if (user) {
        this.user = user;
      }
      return of(this.user);
    });
    return this.authentication;
  }
}
