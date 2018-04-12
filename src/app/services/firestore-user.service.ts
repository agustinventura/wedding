import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { from } from 'rxjs/observable/from';
import 'rxjs/operator/concatMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from '../model/user';
import { UserPreferences } from '../model/user-preferences';

@Injectable()
export class FirestoreUserService {
  constructor(private firestore: AngularFirestore) {}

  register(user: User): Observable<User> {
    return fromPromise(
      this.firestore.collection('users').add({
        name: user.name ? user.name : null,
        email: user.email ? user.email : null,
        admin: false,
        phone: user.phone ? user.phone : null
      })
    ).concatMap(docReference => {
      user.id = docReference.id;
      return of(user);
    });
  }

  getUserByEmail(email: string): Observable<User> {
    console.log('getUserByEmail');
    const usersCol = this.firestore.collection('users', ref =>
      ref.where('email', '==', email)
    );
    const users = usersCol.snapshotChanges();
    return users.concatMap(firebaseUsers => {
      console.log('concat de getUserByEmail');
      if (firebaseUsers.length > 0) {
        const firebaseUser = firebaseUsers[0].payload.doc.data();
        const id = firebaseUsers[0].payload.doc.id;
        console.log(id);
        return of(
          new User(
            id,
            firebaseUser.name,
            firebaseUser.email,
            firebaseUser.admin,
            firebaseUser.phone,
            firebaseUser.preferences
          )
        );
      } else {
        return Observable.throw('User ' + email + ' not registered');
      }
    });
  }

  update(user: User): Observable<User> {
    if (user.id) {
      fromPromise(
        this.firestore.doc('users/' + user.id).update({
          name: user.name,
          email: user.email,
          admin: user.admin,
          phone: user.phone,
          preferences: user.preferences ? user.preferences.toObject() : null
        })
      ).concatMap(() => {
        return of(user);
      });
    }
    return of(user);
  }
}
