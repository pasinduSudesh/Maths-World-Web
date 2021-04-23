import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-svg1',
  templateUrl: './svg1.component.svg',
  styleUrls: ['./svg1.component.css']
})
export class Svg1Component implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  // fillColor = 'rgb(255, 0, 0)';

  // changeColor() {
  //   const r = Math.floor(Math.random() * 256);
  //   const g = Math.floor(Math.random() * 256);
  //   const b = Math.floor(Math.random() * 256);
  //   this.fillColor = `rgb(${r}, ${g}, ${b})`;
  // }
  // changeRoute() {
  //   this.router.navigateByUrl("login");
  // }
}
