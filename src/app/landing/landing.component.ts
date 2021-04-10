import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../util/localStorage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AvailablePapersService } from '../services/available-papers.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private router: Router,
    private availablePapersService: AvailablePapersService
  ) { 

   

  }

  async ngOnInit(){
    let userId = localStorage.getItem(LocalStorage.USER_ID);
    if(userId === "" || userId === null){
      this.router.navigate(['/login'])
    }
    let today = new Date();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    console.log(month, year); 
    let papers = await this.availablePapersService.gatAvailablePapers(year.toString(), month.toString(), userId).toPromise();
  }

}

// PsD@1997MW12354!@#
