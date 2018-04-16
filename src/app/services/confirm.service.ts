import { Injectable } from '@angular/core';
import { FirestoreUserService } from './firestore-user.service';

@Injectable()
export class ConfirmService {

  constructor(private firestoreUserService: FirestoreUserService) { }

}
