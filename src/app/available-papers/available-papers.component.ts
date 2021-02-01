import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {AvailablePapersService } from '../services/available-papers.service';
import { UtilService } from '../services/util.service';


@Component({
  selector: 'app-available-papers',
  templateUrl: './available-papers.component.html',
  styleUrls: ['./available-papers.component.css']
})
export class AvailablePapersComponent implements OnInit {

  img :String = "https://www.vega.lk/img/evx/ws6.jpg";

  papers: any;
  monthName: any;
  isPaidForCategory: boolean = false;

  constructor(private navbar: NavbarComponent, private availablePapersService: AvailablePapersService, private util:UtilService) { }

  ngOnInit(): void {
    const date = new Date();
    const month = (date.getMonth()+1).toString();
    const year = (date.getUTCFullYear()).toString();
    const monthIndex = date.getMonth();
    this.monthName = this.util.getMonthName(Number(monthIndex));

    this.availablePapersService.gatAvailablePapers(year, month).subscribe((data: any)=>{
      console.log(data.payload);
      this.papers = data.payload.papers;
      this.isPaidForCategory = data.payload.isCategoryPaid;
      console.log(this.papers);
      // this.papers = [];
  })
    
  }

}
