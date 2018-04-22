import { Component, OnInit } from '@angular/core';
import { FirestoreUserService } from '../../services/firestore-user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: Observable<User> = null;

  constructor(private firestoreUserService: FirestoreUserService) { }

  ngOnInit() {
    this.users = this.firestoreUserService.getUsers();
  }

}
