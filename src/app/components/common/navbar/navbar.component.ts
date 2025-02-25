import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private loginService: LoginService, private router: Router) {
    this.sideNavActions = new EventEmitter<any>();
    this.sideNavParams = [];
  }

  ngOnInit() {
    this.user = this.loginService.user;
    this.menuItems = [
      { name: 'Dónde', route: '/where'},
      { name: 'Cómo', route: '/how'},
      { name: 'Regalo', route: '/gift'},
      { name: 'Me apunto', route: '/confirm'},
    ];
  }

  close() {
    this.sideNavActions.emit({ action: 'sideNav', params: ['hide'] });
  }

  isLoggedIn() {
    if (this.loginService.user && this.loginService.user.enabled) {
      this.user = this.loginService.user;
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.close();
    this.loginService.logout();
    this.router.navigate(['/logout', this.user.name]);
    this.user = null;
  }
}
