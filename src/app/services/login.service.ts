import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseAuthenticationService } from './firebase-authentication.service';
import { FirebaseAuthorizationService } from './firebase-authorization.service';

import { User } from '../model/user';
import { of } from 'rxjs/observable/of';
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
      const authentication = this.firebaseAuthenticationService.logIn();
      authentication.subscribe(user => {
        console.log('subscribe de loginWithGoogle');
        if (user) {
          this.user = user;
        } else {
          this.user = null;
        }
      });
      return authentication;
    } else {
      return of(this.user);
    }
  }

  logout() {
    this.user = null;
    this.firebaseAuthenticationService.logOut();
  }

  authorize() {
    const authorization: Observable<User> = this.loginWithGoogle().switchMap(() => this.firebaseAuthorizationService.authorize(this.user));
    authorization.subscribe(user => {
      console.log('subscribe de authorize');
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
    return authorization;
  }
}
