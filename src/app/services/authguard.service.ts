import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { LoginService } from './login.service';

@Injectable()
export class AuthguardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate() {
    if (this.loginService.isLogged()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
