import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  toggled: boolean = false;
  scrolled: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e) {
    let element = document.querySelector('.navbar');
    if (window.pageYOffset > element.clientHeight) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }

  onNavbarToggle () {
    this.toggled = !this.toggled;
  }
}
