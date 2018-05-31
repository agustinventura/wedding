import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-flying-list',
  templateUrl: './flying-list.component.html',
  styleUrls: ['./flying-list.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide',   style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})
export class FlyingListComponent implements OnInit {

  state = 'hide';

  constructor(public el: ElementRef) {}

  ngOnInit() {}

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    const tenPercentPosition = (componentPosition * 60) / 100;

    if (scrollPosition >= tenPercentPosition) {
      this.state = 'show';
    } else {
      this.state = 'hide';
    }
  }

}
