import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../../util/localStorage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AvailablePapersService } from '../../services/available-papers.service';
import { UserDetailsService } from '../../services/user/user-details.service';
import { DateService } from '../../services/util/date.service';
import { PaymentDetailsService } from '../../services/payment/payment-details.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Constants } from '../../util/Constants';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  pageLimit = 5;
  subjectList = [];
  selectedSubjectId = null;
  showingPapers = [];
  showingIndex = 0;
  year = null;
  month = null;
  nextPageData = {
    year: null,
    month: null
  };
  previousPageData = {
    year: null,
    month: null
  };
  hasNextPage = false;
  hasPreviousPage = false;
  pageNo = 1;
  subjectName = "";
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private availablePapersService: AvailablePapersService,
    private userService: UserDetailsService,
    private dateService: DateService,
    private paymentService: PaymentDetailsService
  ) {

  }

  async ngOnInit() {

    let userRoll = localStorage.getItem(LocalStorage.ROLES);
    if(!(Constants.USER_ROLE_ASSIGNMENTS_STUDENT.All.includes(userRoll))){
      this.router.navigate(['/login']);
    }

    let userId = localStorage.getItem(LocalStorage.USER_ID);
    if (userId === "" || userId === null) {
      this.router.navigate(['/login']);
    }

    let subscriptions = localStorage.getItem(LocalStorage.SUBSCRIPTION);
    console.log(subscriptions, "subscriptions")
    if(subscriptions === "" || subscriptions === null){
      this.router.navigate(['/login']);
    }
   
    this.subjectList = JSON.parse(subscriptions);
    console.log(this.subjectList);
    //geting subscribed papers
    // var subscriptionResult = await this.userService.getSubscribedSubjects(userId).toPromise();
    // var subscribedSubjects = JSON.stringify(subscriptionResult.payload);
    this.hasNextPage = false;
    this.hasPreviousPage = false;
    if (this.subjectList.length > 0) {

      this.activatedRouter.queryParams.subscribe(async p => {
        if (p.page !== undefined) {
          
          this.showingPapers = [];
          this.pageNo = p.page;
          this.selectedSubjectId = p.subject ? p.subject : this.subjectList[0].subjectid;
          this.subjectName = this.getSubjectName(this.selectedSubjectId);
          await this.getPapers(p.y, p.m, userId, this.selectedSubjectId);

        } else {
          this.pageNo = 1;
          this.selectedSubjectId = p.subject ? p.subject : this.subjectList[0].subjectid;
          this.subjectName = this.getSubjectName(this.selectedSubjectId);
          this.showingPapers = [];
          let today = new Date();
          this.month = today.getMonth() + 1;
          this.year = today.getFullYear();

          await this.getPapers(this.year, this.month, userId, this.selectedSubjectId);
          console.log(this.showingPapers);

        }
      })

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

  getNextMonth(year, month){
    let thisMonth = parseInt(month);
    let thisYear = parseInt(year);
    if(thisMonth + this.pageLimit > 13){
      return { year: thisYear+1, month: thisMonth + this.pageLimit - 12 }
    }else{ 
      return { year: thisYear, month: thisMonth + this.pageLimit }
    }
  }


  async getPapers(year, month, userid, subjectid) {
    let monthNeed = month;
    let yearNeed = year;
    // let showingPapers = []
    let i = 0;
    let nextMonth = this.getNextMonth(yearNeed, monthNeed);
    while (i < this.pageLimit) {
      let paperdet = await this.availablePapersService.gatAvailablePapers(yearNeed.toString(), monthNeed.toString(), userid, subjectid).toPromise();
      let papersForMonth = paperdet.payload;
      if (papersForMonth.papers.length > 0) {
        papersForMonth['month'] = monthNeed;
        papersForMonth['year'] = yearNeed;
        console.log(papersForMonth)
        this.showingPapers.push(papersForMonth);
       
      }
      i++;
      let previousMonth = this.getPreviousMonth(yearNeed, monthNeed);
      monthNeed = previousMonth.month;
      yearNeed = previousMonth.year;
      this.nextPageData = previousMonth;

    }
    let nextPaper = await this.availablePapersService.gatAvailablePapers(this.nextPageData.year.toString(), this.nextPageData.month.toString(), userid, subjectid).toPromise();
    if (nextPaper.payload.papers.length > 0) {
      this.hasNextPage = true;
    }else{
      this.hasNextPage = false;
    }
    let previousPaper = await this.availablePapersService.gatAvailablePapers(nextMonth.year.toString(), nextMonth.month.toString(), userid, subjectid).toPromise();
    // console.log(previousPaper,"prevois paper");
    if(previousPaper.payload.papers.length > 0){
      this.hasPreviousPage = true;
      this.previousPageData = nextMonth;
    }else{
      this.hasPreviousPage = false;
    }
    // return showingPapers;

    console.log(this.hasNextPage)
    console.log(this.hasPreviousPage)
  }

  toggle(i) {
    if (i === this.showingIndex) {
      this.showingIndex = -1;
    } else {
      this.showingIndex = i;
    }
  }

  getMonthName(monthName) {
    return this.dateService.getMonthName(monthName);
  }

  enterToPaper(paper) {
    console.log(paper);
    this.paymentService.paper = paper;
    if (paper.isPaidForPaper) {
      this.router.navigate(['/paper/view'])
    } else {
      this.router.navigate(['/payment']);
    }
  }

  previousPage() {
    this.pageNo = parseInt(this.pageNo.toString());
    this.pageNo -=1;
    this.router.navigate(['/paper/list'], { queryParams: { page: this.pageNo, y: this.previousPageData.year, m: this.previousPageData.month, subject:this.selectedSubjectId } });
  }

  nextPage() {
    this.pageNo = parseInt(this.pageNo.toString());
    this.pageNo +=1;
    this.router.navigate(['/paper/list'], { queryParams: { page: this.pageNo, y: this.nextPageData.year, m: this.nextPageData.month, subject:this.selectedSubjectId } });
  }

  getSubjectName(id){
    if (this.subjectList.length>0){
       for(let i=0; i<this.subjectList.length; i++){
         if(this.subjectList[i].subjectid === id){
           return this.subjectList[i].subjectname;
         }
       }  
    }else{
      return "";
    }
  }



}

// PsD@1997MW12354!@#

