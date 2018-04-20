import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { LoginService } from '../../services/login.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators
} from '@angular/forms';
import { UserPreferences } from '../../model/user-preferences';
import { FirestoreUserService } from '../../services/firestore-user.service';
import { Router } from '@angular/router';
import { DocumentReference } from '@firebase/firestore-types';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from 'angularfire2/firestore';
import { Song } from '../../model/song';
import { FirestoreSongService } from '../../services/firestore-song.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  user: User = null;
  preferences: FormGroup = null;
  songsSubscription: Subscription = null;

  constructor(
    private loginService: LoginService,
    private firestoreUserService: FirestoreUserService,
    private firestoreSongService: FirestoreSongService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.loginService.user;
    this.createForm(this.user.preferences);
    this.songsSubscription = this.firestoreSongService
      .getUserSongs(this.user)
      .subscribe(song => {
        const songControl: FormArray = <FormArray>this.preferences.controls[
          'songs'
        ];
        const songGroup = this.formBuilder.group({
          songName: song.name
        });
        if (!songControl.controls.includes(songGroup)) {
          songControl.insert(songControl.length - 1, songGroup);
        }
      });
    this.addSong();
  }

  createForm(userPreferences: UserPreferences) {
    this.preferences = this.formBuilder.group({
      accompanied: userPreferences.accompanied,
      children: userPreferences.numberOfChildren > 0,
      numberOfChildren: userPreferences.numberOfChildren,
      specialNeeds: userPreferences.specialNeeds,
      songs: this.formBuilder.array([])
    });
  }

  initSong() {
    return this.formBuilder.group({
      songName: ''
    });
  }

  resetNumberOfChildren() {
    this.preferences.get('numberOfChildren').setValue(0);
  }

  addSong() {
    const songControl: FormArray = <FormArray>this.preferences.controls[
      'songs'
    ];
    songControl.push(this.initSong());
  }

  removeSong(position: number) {
    const songControl: FormArray = <FormArray>this.preferences.controls[
      'songs'
    ];
    songControl.removeAt(position);
  }

  save(preferences: FormGroup) {
    this.user.preferences.accompanied = this.preferences.get(
      'accompanied'
    ).value;
    this.user.preferences.numberOfChildren = this.preferences.get(
      'numberOfChildren'
    ).value;
    this.user.preferences.specialNeeds = this.preferences.get(
      'specialNeeds'
    ).value;
    this.firestoreUserService
      .update(this.user)
      .first()
      .subscribe(user => {
        if (user) {
          this.loginService.user = user;
          this.user = user;
        }
      });
    this.firestoreSongService.deleteUserSongs(this.user);
    for (const song of this.preferences.get('songs').value) {
      if (song.songName.length > 0) {
        const newSong: Song = new Song(this.user.email, song.songName);
        this.firestoreSongService.add(newSong);
      }
    }
    this.songsSubscription.unsubscribe();
    this.router.navigate(['acknowledge']);
  }
}
