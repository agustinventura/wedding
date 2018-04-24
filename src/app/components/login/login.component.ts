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
    this.loginService.login().first().subscribe(user => {
      if (user) {
        this.loginService.user = user;
        if (user.isComplete()) {
          this.router.navigate(['confirm']);
        } else {
          this.router.navigate(['user']);
        }
      }
    });
  }

  emailLogin() {
    this.router.navigate(['email-login']);
  }
}
