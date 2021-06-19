import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '../../util/localStorage.service';
import { LoadingService } from '../../util/loading/loading.service';
import { Constants } from '../../util/Constants';
import { ShowPaperService } from '../../services/paper/show-paper.service';
import { ResponseDetailsService } from '../../services/response/response-details.service';
import { UploadService } from '../../services/paper/upload.service';
import { AlertService } from 'src/app/util/alert/alert.service';
import { AlertType } from 'src/app/util/alert/alert.model';


@Component({
  selector: 'app-update-marks',
  templateUrl: './update-marks.component.html',
  styleUrls: ['./update-marks.component.css']
})
export class UpdateMarksComponent implements OnInit, OnChanges {
  paperStatus: string = 'notstart';
  files = [];
  private evaluatorId;
  public marks;
  isSubmitted = false;
  paper;
  @Input() currentRow;

  constructor(
    private router: Router, 
    private loadingService: LoadingService, 
    private showPaperService: ShowPaperService,
    private responseDetailsService: ResponseDetailsService,
    private uploadService: UploadService,
    private alertService: AlertService) {
      this.paper = {papername:""}
    }
    

  async loadData(){
    let userRoll = localStorage.getItem(LocalStorage.ROLES);
    if(!(Constants.USER_ROLE_ASSIGNMENTS_ADMIN.ViewPapers.includes(userRoll))){
      this.router.navigate(['/admin/login']);
    }

    let userid = localStorage.getItem(LocalStorage.USER_ID);
    if (userid === "" || userid === null) {
      this.router.navigate(['/admin/login']);
    }
    this.loadingService.showLoading(true, false, "Loading", null);
    this.evaluatorId = userid;

    if(this.currentRow != undefined || this.currentRow != null){
      var result = await this.showPaperService.getPaperById(this.currentRow.paperId, this.evaluatorId).toPromise();
      this.paper = result.payload;
    }
    this.loadingService.hideLoading();
  }

  async ngOnInit() {}

  async ngOnChanges(){
    await this.loadData();
  }


  async onSubmit() {
    if(this.currentRow != undefined || this.currentRow != null){
      await this.updateStudentData();
    }else{
      this.marks = null;
      this.alertService.clear();
      this.alertService.error("Please Select Paper and Student First !");
      this.isSubmitted = false;
    }
  }

  async updateStudentData(){
    if (this.marks != undefined && this.marks != null && 0 <= this.marks && this.marks <= 100){
      if (this.files.length === 1 && this.files[0].progress === 100 && this.files[0].type === "application/pdf") {
        this.loadingService.showLoading(true, false, "Loading", null);  
        this.isSubmitted = true;
        const file = this.files[0];
        var awsReq = await this.uploadService.getSignedRequest(`corrections/${this.currentRow.paperId}/${this.evaluatorId}/${file.name}`, file.type).toPromise();
        var b = await this.uploadService.uploadFile(file, awsReq.payload.signedRequest).toPromise();

        const data = {
          paperid: this.currentRow.paperId,
          responseid: this.currentRow.responseId,
          evaluatorid: this.evaluatorId,
          marks: this.marks,
          pdfLink: `corrections/${this.currentRow.paperId}/${this.evaluatorId}/${file.name}`
        }

        var uploadResult = (await this.responseDetailsService.uploadCorrectionPdf(data)).toPromise();
        this.loadingService.hideLoading();
        if((await uploadResult).status.code == 200){
          document.getElementById('closebtn').click();
        }else{
          this.alertService.clear();
          this.alertService.error("An Error has occured!");
        }
      } else {
        this.alertService.clear();
        this.alertService.error("Please enter PDF file");
      }
    }else{
      this.marks = null;
      this.alertService.clear();
      this.alertService.error("Please Enter Marks Again !");
    }
    this.isSubmitted = false;
  }

  
}
