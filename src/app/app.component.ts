import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService) {}

  signInWithGoogle() {
    this.authService.signInWithGoogle()
    .then((res) => {
        console.log(res);
      })
    .catch((err) => console.log(err));
  }
}
