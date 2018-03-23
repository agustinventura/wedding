import { Injectable } from '@angular/core';

import { FirebaseAuthenticationService } from './firebase-authentication.service';

import { User } from '../model/user';
@Injectable()
export class LoginService {
  user: User;
  constructor(
    private firebaseAuthenticationService: FirebaseAuthenticationService
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
      this.firebaseAuthenticationService
      .logIn().then(res => this.authorize(res));
    }
  }

  public logout() {
    this.user = null;
    this.firebaseAuthenticationService.logOut();
  }

  private authorize(user: User) {
    this.user = user;
  }
}
