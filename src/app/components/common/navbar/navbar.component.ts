import { Component, OnInit, EventEmitter } from '@angular/core';

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

  constructor() {
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
}
