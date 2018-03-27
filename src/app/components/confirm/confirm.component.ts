import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  user: User = null;
  preferences: FormGroup = null;


  constructor(private loginService: LoginService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.preferences = this.formBuilder.group({
      accompanied: false,
      children: false
    });
  }

  ngOnInit() {
    this.user = this.loginService.user;
  }
}
