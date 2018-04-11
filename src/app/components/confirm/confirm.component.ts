import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  user: User = null;
  preferences: FormGroup = null;


  constructor(private loginService: LoginService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.preferences = this.formBuilder.group({
      accompanied: false,
      children: false,
      numberOfChildren: 0,
      specialNeeds: '',
      songs: this.formBuilder.array([
        this.initSong(),
    ])
    });
  }

  initSong() {
    return this.formBuilder.group({
      songName: ''
    });
  }

  addSong() {
    const songControl: FormArray = <FormArray>this.preferences.controls['songs'];
    songControl.push(this.initSong());
  }

  removeSong(position: number) {
    const songControl: FormArray = <FormArray>this.preferences.controls['songs'];
    songControl.removeAt(position);
  }

  ngOnInit() {
    this.user = this.loginService.user;
  }
}
