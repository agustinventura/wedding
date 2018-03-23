import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { FirebaseAuthService } from './firebaseauth.service';

@Injectable()
export class AuthguardService implements CanActivate {

  constructor(private firebaseAuthService: FirebaseAuthService, private router: Router) { }

  canActivate() {
    if (this.firebaseAuthService.isLogged()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
