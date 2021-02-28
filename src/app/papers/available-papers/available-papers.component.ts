import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import {AvailablePapersService } from '../../services/available-papers.service';
import { DateService } from '../../services/util/date.service';


@Component({
  selector: 'app-available-papers',
  templateUrl: './available-papers.component.html',
  styleUrls: ['./available-papers.component.css']
})
export class AvailablePapersComponent implements OnInit {

  img :String = "https://www.vega.lk/img/evx/ws6.jpg";

  papers: any = [];
  monthName: any;
  isPaidForCategory: boolean = false;
  loading: boolean = true;

  constructor(private navbar: NavbarComponent, private availablePapersService: AvailablePapersService, private util:DateService) { }

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
      this.loading = false;
      console.log(this.papers);
      // this.papers = [];
  })
    
  }

  enterToPaper(paper:any){
    console.log(paper);
    
  }

}
