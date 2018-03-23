import { Component } from '@angular/core';
import { FirebaseAuthService } from './services/firebaseauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: FirebaseAuthService) {}

  signInWithGoogle() {
    this.authService.signInWithGoogle()
    .then((res) => {
        console.log(res);
      })
    .catch((err) => console.log(err));
  }
}
