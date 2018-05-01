import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-user-disabled',
  templateUrl: './user-disabled.component.html',
  styleUrls: ['./user-disabled.component.css']
})
export class UserDisabledComponent implements OnInit {

  user: User;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.user = this.loginService.user;
  }

}
