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
      console.log('subscribe de googleLogin');
      if (user) {
        if (user.isComplete()) {
          this.router.navigate(['confirm']);
        } else {
          this.router.navigate(['user']);
        }
      } else {
        console.log('uops');
      }
    });
  }

  emailLogin() {
    this.router.navigate(['email-login']);
  }
}
