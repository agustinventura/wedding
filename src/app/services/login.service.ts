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
    if (this.user && this.user.enabled) {
      return true;
    } else {
      return false;
    }
  }

  private firebaseGoogleLogin() {
    if (!this.user) {
        return this.firebaseAuthenticationService.googleLogin().first();
    }
    return of(this.user);
  }

  private firebaseMailLogin(email: string, password: string) {
    if (!this.user) {
      return this.firebaseAuthenticationService.mailLogin(email, password).first();
    }
    return of(this.user);
  }

  googleLogout() {
    this.user = null;
    this.firebaseAuthenticationService.googleLogout();
  }

  googleLogin() {
    this.authentication = this.firebaseGoogleLogin()
      .first()
      .concatMap(authenticatedUser =>
        this.firebaseAuthorizationService
          .authorize(authenticatedUser)
          .concatMap(authorizedUser => {
            if (authorizedUser) {
              this.user = authorizedUser;
            }
            return of(this.user);
          })
      );
    return this.authentication;
  }

  mailLogin(email: string, password: string) {
    this.authentication = this.firebaseMailLogin(email, password).first()
    .concatMap(authorizedUser => {
      if (authorizedUser) {
        this.user = authorizedUser;
      }
      return of(this.user);
    });
    return this.authentication;
  }
}
