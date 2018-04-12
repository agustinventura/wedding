import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-acknowledge',
  templateUrl: './acknowledge.component.html',
  styleUrls: ['./acknowledge.component.css']
})
export class AcknowledgeComponent implements OnInit {

  user: User;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.user = this.loginService.user;
  }

}
