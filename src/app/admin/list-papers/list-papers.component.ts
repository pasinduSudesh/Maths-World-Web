import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ShowPaperService } from '../../services/paper/show-paper.service';
import { LoadingService } from '../../util/loading/loading.service';
import { AlertService } from '../../util/alert/alert.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UploadService } from '../../services/paper/upload.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'node:constants';
import { Constants } from 'src/app/util/Constants';
import { LocalStorage } from '../../util/localStorage.service';

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
  adminId=""
  selectedpaperId = null;
  selectedIndex = null;
  loadingData = false;


  constructor(
    private navbar: NavbarComponent,
    private showPaperService: ShowPaperService,
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private uploadService: UploadService
  ) { }

  async ngOnInit() {
    let userRoll = localStorage.getItem(LocalStorage.ROLES);
    console.log("in list");
    console.log(userRoll,"in list");
    console.log(Constants.USER_ROLE_ASSIGNMENTS_ADMIN.ViewPapers,"list of roles")
    console.log(Constants.USER_ROLE_ASSIGNMENTS_ADMIN.ViewPapers.includes(userRoll.toString()),"asasasas")

    if(!(Constants.USER_ROLE_ASSIGNMENTS_ADMIN.ViewPapers.includes(userRoll))){
      console.log('Constants.USER_ROLE_ASSIGNMENTS_ADMIN.ViewPapers')
      this.router.navigate(['/admin/login']);
    }
    
    let adminId = localStorage.getItem(LocalStorage.USER_ID);
    if(adminId === "" || adminId === null){
      this.router.navigate(['/admin/login'])
    }else{

      this.loadingData = true;
      this.loadingService.showLoading(true, false, "Loading Paper Data", null);
      this.adminId = adminId;
      this.loading = "Getting Paper Details";
      var subjectDetails = await this.uploadService.getSubject(adminId).toPromise();
      this.subjectId = subjectDetails.payload.subjectid;
      await this.loadPaperData();
      this.loadingService.hideLoading();
      this.loadingData = false;

    }
  }

  async loadPaperData(){
    var result = await this.showPaperService.getPapers(this.subjectId, this.adminId).toPromise();
      this.papers = result.payload;
      this.loading = "";
      if(this.papers.length > 0){
        var data = {
          month: this.papers[0].month,
          year: this.papers[0].year,
          categoryprize: this.papers[0].categoryprize,
          isCategory: true
        }
        this.showingPapers = []
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
        console.log(this.showingPapers,"showing paperssssss");
      }
  }

  addpaper() {
    this.router.navigate(['/admin/paper/add']);
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
    this.router.navigate(['/admin/paper/view',paper])
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
    this.router.navigate(['/admin/paper/edit',paper])
  }

  async updateStatus(paper){
    try{
      if(paper.released){
        if(confirm("Are you sure to stop releasing this paper results ? ")){
          this.loadingService.showLoading(true, false, "Loading", null);
          await this.showPaperService.updateStatus(paper.paperid, false).toPromise();
        }
      }else{
        if(confirm("Are you sure to release this paper results ? ")){
          this.loadingService.showLoading(true, false, "Loading", null);
          await this.showPaperService.updateStatus(paper.paperid, true).toPromise();
        }
      }
      await this.loadPaperData();
    }
    catch(err){
      if(err.status == 406){
        this.alertService.clear();
        this.alertService.error("Paper Marking is not finished yet !");
      }else{
        this.alertService.clear();
        this.alertService.error("Something is not right! ");
      }
    }
    this.loadingService.hideLoading();
  }

  onClickedUploadShema(paperId, i){
    this.selectedpaperId = paperId;
    this.selectedIndex = i;
  }

  onFinishUpload(event){
    this.showingPapers[event.id].markingschema = event.link;
    this.router.navigateByUrl("/admin/paper/list", { skipLocationChange: true });
  }

  async onDeleteSchema(paperId, i, schemaLink){
    if(confirm("Are you sure to delete this Marking Scheme?")){
      try{
        this.loadingService.showLoading(true, false, "Deleting Marking Scheme", null);
        await this.uploadService.deleteFromS3(schemaLink).toPromise();
        await this.uploadService.setSchema(paperId, null).toPromise();
        this.showingPapers[i].markingschema = null;
        this.loadingService.hideLoading();
      }catch(err){
        this.loadingService.hideLoading();
        this.alertService.clear();
        this.alertService.error(err.message)
      }
    }
  }
}
