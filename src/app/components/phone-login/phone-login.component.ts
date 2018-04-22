import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { FirebaseAuth, RecaptchaVerifier } from '@firebase/auth-types';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.css']
})
export class PhoneLoginComponent implements OnInit {
  windowRef: any;

  phoneNumber = '';

  verificationCode: string;

  user: any;

  constructor(private win: WindowService, private firebaseAuth: FirebaseAuth) {}

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.firebaseAuth.languageCode = 'es';
    this.windowRef.recaptchaVerifier = new  RecaptchaVerifier(
      'recaptcha-container'
    );

    this.windowRef.recaptchaVerifier.render().then(widgetId => {
      this.windowRef.recaptchaWidgetId = widgetId;
    });
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;

    this.firebaseAuth
      .signInWithPhoneNumber(this.phoneNumber, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch(error => console.log(error));
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        this.user = result.user;
      })
      .catch(error => console.log(error, 'Incorrect code entered?'));
  }
}
