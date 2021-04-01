import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isDisplay: boolean = false;
  winnerList: any[];
  firstPlace: string;
  secondPlace: string;
  thirdPlace: string;
  constructor( private navbar: NavbarComponent) { }

  ngOnInit() {

    this.firstPlace = "Nimal Perera"
    this.secondPlace = "kamal Perera"
    this.thirdPlace = "Sunil Perera"
    this.winnerList = [
      { id: 11, name: 'Dr Niceeeeeeeeeeee eeeeeeeeeeeee' },
      { id: 12, name: 'Narco cccccccccccc ccccccccccccc' },
      { id: 13, name: 'Bombasto' }
    ]
  }

  show() {
    this.isDisplay = ! this.isDisplay;
  }

  changeDirection() {
    var element = document.getElementById("page");
  element.classList.toggle("no-filter");
  this.isDisplay = ! this.isDisplay;
  }


}
