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

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  user: User = null;
  preferences: FormGroup = null;

  constructor(
    private loginService: LoginService,
    private firestoreUserService: FirestoreUserService,
    private formBuilder: FormBuilder
  ) {}

  initSong() {
    return this.formBuilder.group({
      songName: ''
    });
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

  ngOnInit() {
    this.user = this.loginService.user;
    this.createForm(this.user.preferences);
  }

  createForm(userPreferences: UserPreferences) {
    if (userPreferences) {
      this.preferences = this.formBuilder.group({
        accompanied: userPreferences.accompanied,
        children: userPreferences.numberOfChildren > 0,
        numberOfChildren: userPreferences.numberOfChildren,
        specialNeeds: userPreferences.specialNeeds,
        songs: this.formBuilder.array([this.initSong()])
      });
    } else {
      this.preferences = this.formBuilder.group({
        accompanied: false,
        children: false,
        numberOfChildren: 0,
        specialNeeds: '',
        songs: this.formBuilder.array([this.initSong()])
      });
    }
  }

  save(preferences: FormGroup) {
    const userPreferences: UserPreferences = new UserPreferences(
      preferences.controls['accompanied'].value,
      preferences.controls['numberOfChildren'].value,
      preferences.controls['specialNeeds'].value
    );
    console.log(userPreferences);
    this.user.preferences = userPreferences;
    this.firestoreUserService
      .update(this.user)
      .subscribe(user => (this.user = user));
  }
}
