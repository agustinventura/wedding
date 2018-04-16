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

  ngOnInit() {
    this.user = this.loginService.user;
    this.createForm(this.user.preferences);
  }

  createForm(userPreferences: UserPreferences) {
    this.preferences = this.formBuilder.group({
      accompanied: userPreferences.accompanied,
      children: userPreferences.numberOfChildren > 0,
      numberOfChildren: userPreferences.numberOfChildren,
      specialNeeds: userPreferences.specialNeeds,
      songs: this.formBuilder.array([this.initSong()])
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
    this.user.preferences.accompanied = this.preferences.get('accompanied').value;
    this.user.preferences.numberOfChildren = this.preferences.get('numberOfChildren').value;
    this.user.preferences.specialNeeds = this.preferences.get('specialNeeds').value;
    this.firestoreUserService
      .update(this.user)
      .first()
      .subscribe(user => {
        if (user) {
          this.loginService.user = user;
          this.user = user;
          this.router.navigate(['acknowledge']);
        }
      });
  }
}
