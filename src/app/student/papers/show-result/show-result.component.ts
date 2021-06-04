import { Component, OnInit } from '@angular/core';
import { ShowPaperService } from '../../../services/paper/show-paper.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorage } from '../../../util/localStorage.service';
import { DateService } from '../../../services/util/date.service';
import { PdfViewerComponent } from '../../../common/pdf-viewer/pdf-viewer.component';
import { LoadingComponent } from '../../../common/loading/loading.component';
import { Constants } from '../../../util/Constants';
import { LoadingService } from '../../../util/loading/loading.service';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css']
})
export class ShowResultComponent implements OnInit {


  paperId:any;
  userId:any;
  paperLink="";
  answerLink="";
  result:any = {
    graded:false,
    rank:{
      rank:false,
      marks:false,
      total:false
    },
    answer:{
      pdf_link:false
    }
  };
  paper:any={
    paperName:false,
    paperLink:false,
    year:false,
    month:false,
    week:false
  }

  isShowPaper = true;
  isShowAnswer = false;
  isShowSchema = false;

  constructor(
    private showPaperService: ShowPaperService,
    private router: Router,
    private pdf: PdfViewerComponent,
    private dateService: DateService,
    private loadingService: LoadingService
  ) { }

  async ngOnInit() {

    let userRoll = localStorage.getItem(LocalStorage.ROLES);
    if(!(Constants.USER_ROLE_ASSIGNMENTS_STUDENT.All.includes(userRoll))){
      this.router.navigate(['/login']);
    }

    let userid = localStorage.getItem(LocalStorage.USER_ID);
    if (userid === "" || userid === null) {
      this.router.navigate(['/login']);
    }

    if(this.showPaperService.paperId === null){
      this.router.navigate(['/paper/list']);
    }

    this.loadingService.showLoading(true, false, "Loading", null);
    this.paperId = this.showPaperService.paperId;
    this.userId = userid;

    console.log(this.userId, "userid");
    console.log(this.paperId);

    this.paper = await this.getPaper(this.paperId, this.userId);
    this.result = await this.getPaperResult(this.userId, this.paperId);
    // console.log(this.paper)

    var paperlinkPath = this.paper.paperLink;//asign paper link here
    var answerlinkPath = this.result.answer.evaluated_link_pdf;//asign answer link here

    console.log(this.result);

    this.paperLink = await this.getPdfLink(paperlinkPath, 60*30, this.userId);
    this.answerLink = await this.getPdfLink(answerlinkPath, 60*30, this.userId);

    this.loadingService.hideLoading();

  }

  async getPaperResult(userId, paperId){
    const result = await this.showPaperService.getPaperResult(userId, paperId).toPromise();
    return result.payload;
  }

  async getPdfLink(pdfLink: string, duration: number, userId:string) {
    var result = await this.showPaperService.getPdfLink(pdfLink, duration, userId).toPromise();
    return result.payload;
  }

  async getPaper(paperId, userId){
    var result = await this.showPaperService.getPaperById(paperId, userId).toPromise();
    console.log(result.payload,"payload")
    return {
      paperName:result.payload.papername,
      paperLink:result.payload.pdflink,
      year:result.payload.year,
      month:result.payload.month,
      week:result.payload.week
    }
  }

  getMonthName(i){
    return this.dateService.getMonthName(parseInt(i)-1);
  }

  showPaper(){
    this.isShowPaper = true;
    this.isShowAnswer = false;
    this.isShowSchema = false;
  }

  showAnswer(){
    this.isShowPaper = false;
    this.isShowAnswer = true;
    this.isShowSchema = false;
  }

  showSchema(){
    this.isShowPaper = false;
    this.isShowAnswer = false;
    this.isShowSchema = true;

  }
}
