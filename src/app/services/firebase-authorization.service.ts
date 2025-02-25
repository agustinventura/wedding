import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import { User } from '../model/user';

import { FirestoreUserService } from './firestore-user.service';

@Injectable()
export class FirebaseAuthorizationService {
  user: User;

  constructor(private firestoreUserService: FirestoreUserService) {}

  authorize(user: User) {
    let fsUser: Observable<User> = Observable.empty<User>();
    if (user) {
      if (user.email) {
        fsUser = this.firestoreUserService
          .getUserByEmail(user.email)
          .concatMap(storedUser => {
            if (storedUser) {
              return of(storedUser);
            }
          }).catch(err => {
            return this.firestoreUserService.register(user);
          });
      }
    }
    return fsUser;
  }
}
