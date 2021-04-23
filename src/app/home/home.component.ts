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
  firstCollege: string;
  secondCollege: string;
  thirdCollege: string;
  firstDistrict: string;
  secondDistrict: string;
  thirdDistrict: string;
  constructor( private navbar: NavbarComponent) { }

  ngOnInit() {

    this.firstPlace = "Nimal Perera"
    this.firstCollege = "H/Thopawewa college"
    this.firstDistrict = "Hambantota"
    this.secondPlace = "kamal Perera"
    this.secondCollege = "Anuradhapura central"
    this.secondDistrict = "Anuradhapura"
    this.thirdPlace = "Sunil Perera"
    this.thirdCollege = "Kurunegala maliyadewa college"
    this.thirdDistrict = "Kurunegala"
    this.winnerList = [
      { id: 11, name: 'Dr Niceeeeeeeeeeee eeeeeeeeeeeee' , college: 'Richmond College', District: 'Galle'},
      { id: 12, name: 'Narco cccccccccccc ccccccccccccc', college: 'Mahinda College' , District: 'Galle'},
      { id: 13, name: 'Bombasto', college: 'Sangamitta Balika Vidyalaya', District: 'Gampaha' }
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
