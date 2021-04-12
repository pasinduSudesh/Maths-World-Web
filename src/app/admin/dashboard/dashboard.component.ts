import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(private navbar : NavbarComponent) { }

  ngOnInit(): void {
  }

}
