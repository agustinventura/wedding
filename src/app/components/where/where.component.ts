import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-where',
  templateUrl: './where.component.html',
  styleUrls: ['./where.component.css']
})
export class WhereComponent implements OnInit {

  lat = 37.38161;
  lng = -5.997959;

  constructor() {}

  ngOnInit() {

  }
}
