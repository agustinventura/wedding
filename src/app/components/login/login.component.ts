import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

  }

  googleLogin() {
    this.loginService.googleLogin().first().subscribe(user => {
      if (user) {
        if (user.enabled) {
          this.loginService.user = user;
          if (user.isComplete()) {
            if (user.admin) {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate(['confirm']);
            }
          } else {
            this.router.navigate(['user']);
          }
        } else {
          this.loginService.user = null;
          this.router.navigate(['user-disabled']);
        }
      }
    });
  }

  emailLogin() {
    this.router.navigate(['email-login']);
  }
}
