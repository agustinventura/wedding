import { Component, OnInit, EventEmitter } from '@angular/core';

import { LoginService } from '../../../services/login.service';

import { User } from '../../../model/user';

export interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sideNavActions: EventEmitter<any>;
  sideNavParams: any[];
  menuItems: MenuItem[];
  user: User = null;

  constructor(private loginService: LoginService) {
    this.sideNavActions = new EventEmitter<any>();
    this.sideNavParams = [];
  }

  ngOnInit() {
    this.menuItems = [
      { name: 'Dónde', route: '/where' },
      { name: 'Vestuario', route: '/dresscode' },
      { name: 'Regalo', route: '/gift' },
      { name: 'Me apunto', route: '/confirm' }
    ];
  }

  close() {
    this.sideNavActions.emit({ action: 'sideNav', params: ['hide'] });
  }

  isLoggedIn() {
    if (this.loginService.isLogged()) {
      if (this.user == null) {
        this.user = this.loginService.user;
      }
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.loginService.logout();
  }
}
