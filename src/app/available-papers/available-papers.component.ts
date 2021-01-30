import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {AvailablePapersService } from '../services/available-papers.service';

@Component({
  selector: 'app-available-papers',
  templateUrl: './available-papers.component.html',
  styleUrls: ['./available-papers.component.css']
})
export class AvailablePapersComponent implements OnInit {

  img :String = "https://www.vega.lk/img/evx/ws6.jpg";

  constructor(private navbar: NavbarComponent, private availablePapersService: AvailablePapersService) { }

  ngOnInit(): void {
    this.availablePapersService.gatAvailablePapers("11","22")
    .subscribe(data=>{
      console.log(data);
    })

    
  }

}
