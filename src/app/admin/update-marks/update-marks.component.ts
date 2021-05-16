import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '../../util/localStorage.service';
import { LoadingService } from '../../util/loading/loading.service';
import { Constants } from '../../util/Constants';
import { ShowPaperService } from '../../services/paper/show-paper.service';
import { EvalDetailsService } from '../../services/admin/eval-details.service';
import { ResponseDetailsService } from '../../services/response/response-details.service';
import { UploadService } from '../../services/paper/upload.service';
import { AlertService } from 'src/app/util/alert/alert.service';
import { AlertType } from 'src/app/util/alert/alert.model';


@Component({
  selector: 'app-update-marks',
  templateUrl: './update-marks.component.html',
  styleUrls: ['./update-marks.component.css']
})
export class UpdateMarksComponent implements OnInit {
  paperStatus: string = 'notstart';
  files = [];
  private evaluatorId;
  private courseAdmin;
  private subjectId;
  public currentPaperId;
  public currentResponseId;
  public marks;
  isSubmitted = false;
  papers = []
  students = []

  constructor(
    private router: Router, 
    private loadingService: LoadingService, 
    private showPaperService: ShowPaperService,
    private evalDetailsService: EvalDetailsService,
    private responseDetailsService: ResponseDetailsService,
    private uploadService: UploadService,
    private alertService: AlertService) {
    }
    
  async ngOnInit() {
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

    var adminresult = await this.evalDetailsService.getCourseAdminByEvaluator().toPromise();
    this.courseAdmin = adminresult.payload;
    if (this.courseAdmin === "" || this.courseAdmin === null) {
      this.router.navigate(['/admin/login']);
    }

    var subjectDetails = await this.uploadService.getSubject(this.courseAdmin).toPromise();
    this.subjectId = subjectDetails.payload.subjectid;

    var result = await this.showPaperService.getPapers(this.subjectId, this.evaluatorId).toPromise();
    this.papers = result.payload;
    this.loadingService.hideLoading();
  }

  async onPaperNameChanged() {
    var value = (<HTMLSelectElement>document.getElementById('select-papers'))
      .value;
      this.currentPaperId = value;
    console.log(
      '[UpdateMarksComponent] :: onPaperNameChanged():: currentPaper::' +
        this.currentPaperId
    );
    
    this.loadingService.showLoading(true, false, "Loading", null); 
    await this.loadStudentData();
  }

  async onStudentNameChanged() {
    var value = (<HTMLSelectElement>document.getElementById('select-students'))
      .value;
    this.currentResponseId = value;
    console.log(
      '[UpdateMarksComponent] :: onStudentNameChanged():: currentStudent::' +
        this.currentResponseId
    );
  }

  async loadStudentData(){
    var result = await (await this.responseDetailsService.getUnmarkedResponsesByEvaluator(this.currentPaperId, this.evaluatorId)).toPromise();
    this.students = result.payload;
    this.loadingService.hideLoading();
  }


  async onSubmit() {
    if(this.currentPaperId != undefined && this.currentResponseId != undefined){
      if (this.marks != undefined && this.marks != null && 0 <= this.marks && this.marks <= 100){
        if (this.files.length === 1 && this.files[0].progress === 100 && this.files[0].type === "application/pdf") {    
          this.loadingService.hideLoading();
          this.loadingService.showLoading(true, false, "Loading", null);  
          this.isSubmitted = true;
          console.log(this.files);
          const file = this.files[0];
          console.log(file, "file");
          var awsReq = await this.uploadService.getSignedRequest(`corrections/${this.currentPaperId}/${this.evaluatorId}/${file.name}`, file.type).toPromise();
          console.log(awsReq, "resign URL");
          var b = await this.uploadService.uploadFile(file, awsReq.payload.signedRequest).toPromise();
          console.log("uploaded", b); 

          const data = {
            paperid: this.currentPaperId,
            responseid: this.currentResponseId,
            evaluatorid: this.evaluatorId,
            marks: this.marks,
            pdfLink: `corrections/${this.currentPaperId}/${this.evaluatorId}/${file.name}`
          }

          var uploadResult = (await this.responseDetailsService.uploadCorrectionPdf(data)).toPromise();
          this.loadingService.hideLoading();
          if((await uploadResult).status.code == 200){
            this.alertService.clear();
            // this.alertService.alert("success");
            this.currentPaperId = undefined;
            this.currentResponseId = undefined;
            this.marks = null;
          }else{
            this.alertService.clear();
            this.alertService.error("An Error has occured!");
          }
        } else {
          this.alertService.clear();
          this.alertService.error("Please enter PDF file");
          this.isSubmitted = false;
        }
      }else{
        this.marks = null;
        this.alertService.clear();
        this.alertService.error("Please Enter Marks Again !");
        this.isSubmitted = false;
      }
    }else{
      this.marks = null;
      this.alertService.clear();
      this.alertService.error("Please Select Paper and Student First !");
      this.isSubmitted = false;
    }
  }
  
}
