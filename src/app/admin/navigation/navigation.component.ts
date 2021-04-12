import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openNavigation(){
    const nav = <HTMLElement>document.querySelector('nav');
    console.log("button pressed on");
    nav.classList.add("menu-btn");
}

closeNavigation(){
  const nav = <HTMLElement>document.querySelector('nav');
  console.log("button pressed on");
  nav.classList.remove("menu-btn");
}

}
