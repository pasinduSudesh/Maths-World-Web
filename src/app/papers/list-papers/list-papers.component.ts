import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ShowPaperService } from '../../services/paper/show-paper.service';
import { LoadingComponent } from '../../common/loading/loading.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorage } from '../../util/localStorage.service';
import { UploadService } from '../../services/paper/upload.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'node:constants';
@Component({
  selector: 'app-list-papers',
  templateUrl: './list-papers.component.html',
  styleUrls: ['./list-papers.component.css']
})
export class ListPapersComponent implements OnInit {

  papers: any;
  loading = "";
  showingPapers = [];
  subjectId="";
  canDelete = true;

  constructor(
    private navbar: NavbarComponent,
    private showPaperService: ShowPaperService,
    private loadingComponent: LoadingComponent,
    private router: Router,
    private uploadService: UploadService
  ) { }

  async ngOnInit() {
    let adminId = localStorage.getItem(LocalStorage.ADMIN_ID);

    adminId = "saa"; //should have change
    if(adminId === "" || adminId === null){
      this.router.navigate(['/login'])
    }else{
      this.loading = "Getting Paper Details";
      var subjectDetails = await this.uploadService.getSubject(adminId).toPromise();
      this.subjectId = subjectDetails.payload.subjectid;
      var result = await this.showPaperService.getPapers(this.subjectId, adminId).toPromise();
      this.papers = result.payload;
      this.loading = "";
      // console.log(this.papers);
      if(this.papers.length > 0){
        var data = {
          month: this.papers[0].month,
          year: this.papers[0].year,
          categoryprize: this.papers[0].categoryprize,
          isCategory: true
        }
        this.showingPapers.push(data);
        for (let i = 0; i < this.papers.length; i++) {
          let categoryId = this.papers[i].categoryid;
          if (i > 0 && categoryId !== this.papers[i - 1].categoryid) {
            this.showingPapers.push({
              month: this.papers[i].month,
              year: this.papers[i].year,
              categoryprize: this.papers[i].categoryprize,
              isCategory: true
            })
          }
          this.papers[i].isCategory = false;
    
          this.showingPapers.push(this.papers[i]); 
        }
        console.log(this.showingPapers);
      }
    }
  }

  addpaper() {
    this.router.navigate(['/add-papers', { data: "hello" }]);
  }

  async publishPaper(paperId){
    if (confirm("Are you sure to publish this paper. After publishing paper you cannot Edit or Delete it")) {
      try {
        this.loading = "Publishing paper"
        await this.uploadService.publishPaperById(paperId).toPromise();
        this.showingPapers.forEach(paper => {
          if (paper.paperid === paperId) {
            paper.ispublished = true;
          }
        });
        this.loading = "";
      } catch (err) {
        this.loading = "";
      }
    }
  }

  viewPaper(paper){
    this.router.navigate(['/admin-view-paper',paper])
  }

  async deletePaper(paper){
    // if(confirm("Are you sure to delete ")) {}
    if(confirm("Are you sure to delete this paper")){
      var deleteResult = await this.showPaperService.deletePaper(paper.paperid, paper.pdflink).toPromise();
      let index = 0;
      for(var i=0; i<this.showingPapers.length; i++){
        if(this.showingPapers[i].paperid === paper.paperid){
          index = i;
        }
      }
      this.showingPapers.splice(index,1);
      console.log(this.showingPapers)
      console.log(deleteResult);
    }
  }

  cancelDelete(){
    this.canDelete = false;
  }

  confirmDelete(){
    this.canDelete = true
  }

  editPaper(paper){
    this.router.navigate(['/admin-edit-paper',paper])
  }

}
