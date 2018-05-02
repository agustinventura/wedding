import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from '../../services/firebase-authentication.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.css']
})
export class EmailLoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  submit() {
    this.loginService.mailLogin(this.email, this.password).subscribe(result => {
      console.log(result);
    });
  }
}
