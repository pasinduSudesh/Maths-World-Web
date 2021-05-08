import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../../../util/localStorage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ShowPaperService } from '../../../services/paper/show-paper.service';
import { PaymentDetailsService } from '../../../services/payment/payment-details.service';
import { DateService } from '../../../services/util/date.service';
import { LoadingComponent } from '../../../common/loading/loading.component';
import { Constants } from '../../../util/Constants';
import { LoadingService } from '../../../util/loading/loading.service';

@Component({
  selector: 'app-payed-papers',
  templateUrl: './payed-papers.component.html',
  styleUrls: ['./payed-papers.component.css']
})
export class PayedPapersComponent implements OnInit {

  loading = "";
  papers = [];
  selectedSubjectId: any;
  userId: string;
  subjectList = [];

  constructor(
    private router: Router,
    private showPaperService: ShowPaperService,
    private paymentService: PaymentDetailsService,
    private dateService: DateService,
    private loadingService: LoadingService
  ) { }

  async ngOnInit() {
    this.loadingService.showLoading(true, true, "Loading", 10)
    let userRoll = localStorage.getItem(LocalStorage.ROLES);
    if (!(Constants.USER_ROLE_ASSIGNMENTS_STUDENT.All.includes(userRoll))) {
      this.router.navigate(['/login']);
    }

    this.loading = "Loading Papers";

    const subscribedSubjects = localStorage.getItem(LocalStorage.SUBSCRIPTION);
    if (subscribedSubjects === null || subscribedSubjects === "") {
      this.loading = "";
      this.router.navigate(['/login']);
    }
    let userid = localStorage.getItem(LocalStorage.USER_ID);
    this.userId = userid;
    if (userid === "" || userid === null) {
      this.loading = "";
      this.router.navigate(['/login'])
    }

    this.subjectList = JSON.parse(subscribedSubjects);
    this.selectedSubjectId = this.subjectList[0]['subjectid'];
    this.papers = await this.getPaidpapers(userid, this.selectedSubjectId);
    console.log("papers:: ", this.papers);
    this.loading = "";
    this.loadingService.hideLoading();

  }

  private async getPaidpapers(userId, subjectId) {
    const papers = await this.showPaperService.getPaidPapers(userId, subjectId).toPromise();
    return papers.payload;
  }

  async changeSubject(subject) {
    console.log("changeSubject():: ", subject)
    if (this.selectedSubjectId !== subject.subjectid) {
      this.loading = "Loading Papers"
      this.papers = await this.getPaidpapers(this.userId, subject.subjectid);
      this.selectedSubjectId = subject.subjectid;
      this.loading = "";
    }
  }

  async enterToPaper(paper) {
    console.log(paper);
    let state = await this.getPaperState(paper.paperid, this.userId);
    if (state.length === 0) {
      this.paymentService.paper = paper;
      console.log(this.paymentService.paper)
      this.router.navigate(['/paper/view'])
    } else if (state[0].submitstate === 'submited') {
      this.showPaperService.paperId = paper.paperid;
      this.router.navigate(['paper/result'])
    } else {
      this.paymentService.paper = paper;
      console.log(this.paymentService.paper)
      this.router.navigate(['/paper/view'])
    }
    
  }

  getMonth(i) {
    return this.dateService.getMonthName(parseInt(i) - 1);
  }

  async getPaperState(paperid, userid) {
    var result = await this.showPaperService.getPaperState(paperid, userid).toPromise();
    return result.payload;
  }

}
