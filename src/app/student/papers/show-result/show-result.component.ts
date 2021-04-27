import { Component, OnInit } from '@angular/core';
import { ShowPaperService } from '../../../services/paper/show-paper.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorage } from '../../../util/localStorage.service';
import { DateService } from '../../../services/util/date.service';
import { PdfViewerComponent } from '../../../common/pdf-viewer/pdf-viewer.component';
import { LoadingComponent } from '../../../common/loading/loading.component';


@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css']
})
export class ShowResultComponent implements OnInit {

  loading = "";
  paperId:any;
  userId:any;
  paperLink="https://ceb.lk/front_img/img_reports/1532506088Supply_Services_Code_DD1.pdf";
  answerLink="https://ceb.lk/front_img/img_reports/1532506088Supply_Services_Code_DD1.pdf";
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
    year:false,
    month:false,
    week:false
  }

  constructor(
    private showPaperService: ShowPaperService,
    private router: Router,
    private pdf: PdfViewerComponent,
    private dateService: DateService,
  ) { }

  async ngOnInit() {

    let userid = localStorage.getItem(LocalStorage.USER_ID);
    if (userid === "" || userid === null) {
      this.router.navigate(['/login']);
    }

    if(this.showPaperService.paperId === null){
      this.router.navigate(['/paper/list']);
    }

    this.loading = "Loading your result"
    this.paperId = this.showPaperService.paperId;
    this.userId = userid;

    console.log(this.userId, "userid");
    console.log(this.paperId);

    this.paper = await this.getPaper(this.paperId, this.userId);
    this.result = await this.getPaperResult(this.userId, this.paperId);
    console.log(this.paper)

    var paperlinkPath = "paperLink";//asign paper link here
    var answerlinkPath = "answerLink";//asign answer link here

    console.log(this.result);

    this.paperLink = await this.getPdfLink(paperlinkPath, 60, this.userId);
    this.answerLink = await this.getPdfLink(answerlinkPath, 60, this.userId);

    this.loading = "";

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
    return {
      paperName:result.payload.papername,
      year:result.payload.year,
      month:result.payload.month,
      week:result.payload.week
    }
  }

  getMonthName(i){
    return this.dateService.getMonthName(i);
  }
}
