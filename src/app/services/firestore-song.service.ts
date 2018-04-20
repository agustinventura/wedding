import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Song } from '../model/song';
import { DocumentReference } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { User } from '../model/user';
import { from } from 'rxjs/observable/from';

@Injectable()
export class FirestoreSongService {
  constructor(private firestore: AngularFirestore) {}

  add(song: Song) {
    this.firestore.collection('songs').add({
      userEmail: song.userEmail,
      name: song.name
    });
  }

  getUserSongs(user: User): Observable<Song> {
    const songs = this.firestore
      .collection('songs', ref => ref.where('userEmail', '==', user.email))
      .snapshotChanges();
    return songs.concatMap(firestoreSongs => {
      if (firestoreSongs.length > 0) {
        const userSongs: Song[] = [];
        for (const firestoreSong of firestoreSongs) {
          const firestoreSongData = firestoreSong.payload.doc.data();
          const id = firestoreSong.payload.doc.id;
          userSongs.push(new Song(firestoreSongData.userEmail, firestoreSongData.name));
        }
        return from(userSongs);
      } else {
        return Observable.empty();
      }
    });
  }

  deleteUserSongs(user: User) {
    const songs = this.firestore
      .collection('songs', ref => ref.where('userEmail', '==', user.email))
      .snapshotChanges();
      songs.first().subscribe(firestoreSongs => {
        if (firestoreSongs.length > 0) {
          for (const firestoreSong of firestoreSongs) {
            const id = firestoreSong.payload.doc.id;
            this.firestore.doc('songs/' + id).delete();
          }
        }
      });
  }
}
