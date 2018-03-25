import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  googleLogin() {
    this.loginService.authorize().subscribe(user => {
      console.log('subscribe de googleLogin');
      if (user) {
        console.log('ok');
      } else {
        console.log('uops');
      }
    });
  }
}
