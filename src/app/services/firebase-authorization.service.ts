import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';

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
         fsUser = this.firestoreUserService.getUserByEmail(user.email);
        fsUser.subscribe(firestoreUser => {
          if (firestoreUser) {
            this.user = firestoreUser;
          } else {
            this.firestoreUserService.register(user);
            this.user = firestoreUser;
          }
        });
      }
    }return fsUser;
  }
}
