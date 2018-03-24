import { Injectable } from '@angular/core';

import { FirebaseAuthenticationService } from './firebase-authentication.service';
import { FirebaseAuthorizationService } from './firebase-authorization.service';

import { User } from '../model/user';
@Injectable()
export class LoginService {
  user: User;
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
      this.firebaseAuthenticationService.logIn().subscribe(user => {
        if (user) {
          this.authorize(user);
        }
      });
    }
  }

  public logout() {
    this.user = null;
    this.firebaseAuthenticationService.logOut();
  }

  private authorize(authenticatedUser: User) {
    this.firebaseAuthorizationService.authorize(authenticatedUser).subscribe(user => {
      this.user = user;
    });
  }
}
