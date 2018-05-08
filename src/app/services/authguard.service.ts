import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { LoginService } from './login.service';

@Injectable()
export class AuthguardService implements CanActivate {

  adminUrls = ['admin', 'user-form'];

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.loginService.user) {
      if (this.loginService.user.enabled) {
        const url = route.url[0];
        if (this.adminUrls.includes(url.path) && !this.loginService.user.admin) {
          return false;
        } else {
          return true;
        }
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
