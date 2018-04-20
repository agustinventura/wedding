import { DocumentReference } from '@firebase/firestore-types';

export class Song {
  constructor(public userEmail: string, public name: string) {}
}
