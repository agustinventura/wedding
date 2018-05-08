import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { FirestoreUserService } from '../../services/firestore-user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  id;
  user: User = new User('', '', '', false, true);
  title: string;

  constructor(
    private firestoreUserService: FirestoreUserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      });
      if (!this.id) {
        this.title = 'Nuevo usuario';
      } else {
        this.title = 'Editar usuario';
        this.firestoreUserService.getUser(this.id).subscribe(user => {
          if (user) {
            this.user = user;
          }
        });
      }
  }

  submit() {
    this.firestoreUserService.register(this.user);
  }
}
