import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Song } from '../../model/song';
import { FirestoreSongService } from '../../services/firestore-song.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  songs: Observable<Song[]> = null;
  user: User = null;

  constructor(private loginService: LoginService, private firestoreSongService: FirestoreSongService, private router: Router) { }

  ngOnInit() {
    this.user = this.loginService.user;
    this.songs = this.firestoreSongService.getSongs();
  }
}
