import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { LoginService } from './login.service';

@Injectable()
export class AuthguardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate() {
    if (this.loginService.user) {
      if (this.loginService.user.enabled) {
        return true;
      } else {
        this.router.navigate(['user-disabled']);
        return false;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
