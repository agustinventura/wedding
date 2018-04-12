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
    private formBuilder: FormBuilder,
    private router: Router
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
    console.log('saving preferences');
    const userPreferences: UserPreferences = new UserPreferences(
      preferences.controls['accompanied'].value,
      preferences.controls['numberOfChildren'].value,
      preferences.controls['specialNeeds'].value
    );
    if (!preferences.controls['children'].value && userPreferences.numberOfChildren > 0) {
      userPreferences.numberOfChildren = 0;
    }
    this.user.preferences = userPreferences;
    console.log('preferences to be saved');
    console.log(this.user);
    this.firestoreUserService
      .update(this.user)
      .subscribe(user => {
        if (user) {
          this.loginService.user = user;
          this.user = user;
          this.router.navigate(['acknowledge']);
        }});
  }
}
