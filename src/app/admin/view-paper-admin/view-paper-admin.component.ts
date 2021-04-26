import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorage } from '../../util/localStorage.service';
import { ShowPaperService } from '../../services/paper/show-paper.service';
import { PdfViewerComponent } from '../../common/pdf-viewer/pdf-viewer.component';
import { Constants } from 'src/app/util/Constants';

@Component({
  selector: 'app-view-paper-admin',
  templateUrl: './view-paper-admin.component.html',
  styleUrls: ['./view-paper-admin.component.css']
})
export class ViewPaperAdminComponent implements OnInit {

  paper = {
    test: "test value",
    year: "Year",
    month: "Month",
    week: "Week",
    papername: "Name of the Paper",
    duration: "Duration",
    prize:"Price",
    categoryprize:"Monthly Price",
    paperdescription: "Paper Description",
    ispublished:"false",
    pdflink:""
  };

  link = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private showPaperService: ShowPaperService,
    private pdfViewver: PdfViewerComponent
  ) { }

  async ngOnInit() {
    let userRoll = localStorage.getItem(LocalStorage.ROLES);
    if(!(Constants.USER_ROLE_ASSIGNMENTS.ViewPapers.includes(userRoll))){
      this.router.navigate(['/admin/login']);
    }
    let adminId = localStorage.getItem(LocalStorage.USER_ID);
    if(adminId === "" || adminId === null){
      this.router.navigate(['/admin/login'])
    }else{
      this.paper = this.route.snapshot.paramMap['params'];
      console.log(this.paper);
      var pdfLinkResult = await this.showPaperService.getPdfLink(this.paper.pdflink, 60, adminId).toPromise()
      this.link = pdfLinkResult.payload;
    }
  }

  backToList(){
    this.router.navigate(['/admin/paper/list']);
  }

}
