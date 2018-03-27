import { Component, OnInit } from '@angular/core';

import { User } from '../../model/user';
import { LoginService } from '../../services/login.service';
import { FirestoreUserService } from '../../services/firestore-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = null;

  constructor(
    private loginService: LoginService,
    private userService: FirestoreUserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.loginService.user;
    console.log(this.user);
  }

  submit() {
    this.userService.update(this.user).subscribe(user => {
      if (user) {
        this.loginService.user = user;
        this.router.navigate(['confirm']);
      }
    });
  }
}
