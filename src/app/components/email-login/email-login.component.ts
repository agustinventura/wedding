import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from '../../services/firebase-authentication.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.css']
})
export class EmailLoginComponent implements OnInit {

  email = '';
  password = '';
  passwordError = false;
  passwordResetSend = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    if (this.passwordError) {
      this.passwordError = false;
    }
    if (this.passwordResetSend) {
      this.passwordResetSend = false;
    }
    this.loginService.mailLogin(this.email, this.password).subscribe(user => {
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
    },
    error => {
      this.passwordError = true;
    });
  }

  forgotPassword() {
    this.loginService.forgotPassword(this.email).subscribe(result => {
      this.passwordResetSend = true;
      this.passwordError = false;
    });
  }
}
