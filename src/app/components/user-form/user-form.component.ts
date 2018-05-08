import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { FirestoreUserService } from '../../services/firestore-user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: User = new User('', '', '', false, true);
  title: string;

  constructor(private firestoreUserService: FirestoreUserService) { }

  ngOnInit() {
    this.title = 'Nuevo usuario';
  }

  submit() {
    this.firestoreUserService.register(this.user);
  }
}
