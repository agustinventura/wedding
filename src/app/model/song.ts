import { DocumentReference } from '@firebase/firestore-types';

export class Song {
  constructor(public user: DocumentReference, public name: string) {}
}
