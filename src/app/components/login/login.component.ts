import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService, LoginMethod } from '../../services/login.service';

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
    this.loginService.login(LoginMethod.GOOGLE).first().subscribe(user => {
      if (user) {
        this.loginService.user = user;
        if (user.enabled) {
          if (user.isComplete()) {
            this.router.navigate(['confirm']);
          } else {
            this.router.navigate(['user']);
          }
        } else {
          this.router.navigate(['user-disabled']);
        }
      }
    });
  }

  emailLogin() {
    this.router.navigate(['email-login']);
  }
}
