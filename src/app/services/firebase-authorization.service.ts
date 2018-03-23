import { Injectable } from '@angular/core';

import { FirebaseAuthenticationService } from './firebase-authentication.service';

@Injectable()
export class FirebaseAuthorizationService {

  constructor(private firebaseAuthenticationService: FirebaseAuthenticationService) { }

}
