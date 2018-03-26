import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import 'rxjs/operator/concatMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from '../model/user';
import { error } from 'util';
@Injectable()
export class FirestoreUserService {

  constructor(private firestore: AngularFirestore) {}

  register(user: User): Observable<User> {
    this.firestore.collection('users').add({
      name: user.name ? user.name : null,
      email: user.email ? user.email : null,
      phone: user.phone ? user.phone : null
    });
    return of(user);
  }

  getUserByEmail(email: string): Observable<User> {
    const usersCol = this.firestore.collection('users', ref =>
      ref.where('email', '==', email)
    );
    const users = usersCol.valueChanges();
    return users.concatMap(firebaseUsers => {
      console.log('subscribe de getUserByEmail');
      if (firebaseUsers.length > 0) {
        const user = <any>firebaseUsers[0];
        return of(new User(user.name, user.email, user.phone));
      } else {
        return Observable.throw('User ' + email + ' not registered');
      }
    });
  }
}
