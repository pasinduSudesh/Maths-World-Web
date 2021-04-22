import { Component, OnInit } from '@angular/core';
import { ShowPaperService } from '../../services/paper/show-paper.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorage } from '../../util/localStorage.service';
import { PdfViewerComponent } from '../../common/pdf-viewer/pdf-viewer.component';


@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css']
})
export class ShowResultComponent implements OnInit {

  loading = "";
  paperId:any;
  userId:any;
  paperLink="";
  answerLink="";
  result:any;

  constructor(
    private showPaperService: ShowPaperService,
    private router: Router,
    private pdf: PdfViewerComponent,
  ) { }

  async ngOnInit() {

    let userid = localStorage.getItem(LocalStorage.USER_ID);
    if (userid === "" || userid === null) {
      this.router.navigate(['/login']);
    }

    if(this.showPaperService.paperId === null){
      this.router.navigate(['/landing']);
    }

    this.paperId = this.showPaperService.paperId;
    this.userId = userid;

    this.result = await this.getPaperResult(this.userId, this.paperId);

    var paperlinkPath = "paperLink";//asign paper link here
    var answerlinkPath = "answerLink";//asign answer link here

    this.paperLink = await this.getPdfLink(paperlinkPath, 60, this.userId);
    this.answerLink = await this.getPdfLink(answerlinkPath, 60, this.userId);

  }

  async getPaperResult(userId, paperId){
    const result = await this.showPaperService.getPaperResult(userId, paperId).toPromise();
    return result.payload;
  }

  async getPdfLink(pdfLink: string, duration: number, userId:string) {
    var result = await this.showPaperService.getPdfLink(pdfLink, duration, userId).toPromise();
    return result.payload;
  }
}
