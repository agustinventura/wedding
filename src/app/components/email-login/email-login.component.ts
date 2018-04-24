import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from '../../services/firebase-authentication.service';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.css']
})
export class EmailLoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(private authenticationService: FirebaseAuthenticationService) { }

  ngOnInit() {
  }

}
