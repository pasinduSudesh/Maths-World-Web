import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../util/localStorage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AvailablePapersService } from '../services/available-papers.service';
import { UserDetailsService } from '../services/user/user-details.service';
import { DateService } from '../services/util/date.service';
import { PaymentDetailsService } from '../services/payment/payment-details.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  subjectList = [];
  selectedSubjectId = null;
  showingPapers = [];
  showingIndex = 0;
  year = null;
  month = null;
  constructor(
    private router: Router,
    private availablePapersService: AvailablePapersService,
    private userService: UserDetailsService,
    private dateService: DateService,
    private paymentService: PaymentDetailsService
  ) {
  }

  async ngOnInit() {
    let userId = localStorage.getItem(LocalStorage.USER_ID);
    if (userId === "" || userId === null) {
      this.router.navigate(['/login'])
    }

    //geting subscribed papers
    var subscriptionResult = await this.userService.getSubscribedSubjects(userId).toPromise();
    var subscribedSubjects = JSON.stringify(subscriptionResult.payload);
    this.subjectList = subscriptionResult.payload;
    if (this.subjectList.length > 0) {
      this.selectedSubjectId = this.subjectList[0].subjectid;
      localStorage.setItem(LocalStorage.SUBSCRIPTION, subscribedSubjects);

      let today = new Date();
      this.month = today.getMonth() + 1 - 1;
      this.year = today.getFullYear();

      this.showingPapers = await this.getPapers(this.year, this.month, userId, this.selectedSubjectId);
      console.log(this.showingPapers);

    }
  }


  loadPapers(subjectDet) {
    console.log(subjectDet);
  }

  getPreviousMonth(year, month) {
    let thisMonth = parseInt(month);
    let thisYear = parseInt(year);
    if (thisMonth - 1 === 0) {
      return { year: thisYear - 1, month: 12 }
    } else {
      return { year: thisYear, month: thisMonth - 1 }
    }
  }

  async getPapers(year, month, userid, subjectid) {
    let monthNeed = month;
    let yearNeed = year;
    let showingPapers = []
    for (let i = 0; i < 2; i++) {
      let paperdet = await this.availablePapersService.gatAvailablePapers(yearNeed.toString(), monthNeed.toString(), userid, subjectid).toPromise();
      let papersForMonth = paperdet.payload;
      papersForMonth['month'] = monthNeed;
      papersForMonth['year'] = yearNeed;
      showingPapers.push(papersForMonth);
      let previousMonth = this.getPreviousMonth(yearNeed, monthNeed);
      monthNeed = previousMonth.month;
      yearNeed = previousMonth.year;
    }
    return showingPapers;
  }

  toggle(i){
    this.showingIndex = i;
  }

  getMonthName(monthName){
    return this.dateService.getMonthName(monthName);
  }

  enterToPaper(paper){
    console.log(paper);
    this.paymentService.paper = paper;
    if(!paper.isPaidForPaper){
      this.router.navigate(['/show-paper'])
    }else{
      this.router.navigate(['/payment']);
    }
  }

}

// PsD@1997MW12354!@#
