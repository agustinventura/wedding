import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { switchMap } from 'rxjs/operators';

import { User } from '../model/user';
@Injectable()
export class FirestoreUserService {
  usersCol: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  user: User;

  constructor(private firestore: AngularFirestore) {}

  register(user: User) {
    console.log('Registering');
    console.log(user);
    this.firestore.collection('users').add({
      name: user.name,
      email: user.email ? user.email : null,
      phone: user.phone ? user.phone : null
    });
  }

  getUserByEmail(email: string) {
    this.usersCol = this.firestore.collection('users', ref =>
      ref.where('email', '==', email)
    );
    this.users = this.usersCol.valueChanges();
    this.users.subscribe(users => {
      this.user = users[0];
    });
    return this.users.switchMap(() => of(this.user));
  }
}
