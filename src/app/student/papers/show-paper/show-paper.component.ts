import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { Subscription, interval } from 'rxjs';
import { TimerComponent } from '../../../common/timer/timer.component';
import { FileUploaderComponent } from '../../../common/file-uploader/file-uploader.component';
import { ShowPaperService } from '../../../services/paper/show-paper.service';
import { UploadService } from '../../../services/paper/upload.service';
import { PaymentDetailsService } from '../../../services/payment/payment-details.service';
import { bool } from 'aws-sdk/clients/signer';
import { PdfViewerComponent } from '../../../common/pdf-viewer/pdf-viewer.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorage } from '../../../util/localStorage.service';
import { Constants } from '../../../util/Constants';

@Component({
  selector: 'app-show-paper',
  templateUrl: './show-paper.component.html',
  styleUrls: ['./show-paper.component.css']
})
export class ShowPaperComponent implements OnInit {

  constructor(
    private navbar: NavbarComponent,
    private timer: TimerComponent,
    private showPaperService: ShowPaperService,
    private fleUploader: FileUploaderComponent,
    private pdf: PdfViewerComponent,
    private paymentService: PaymentDetailsService,
    private router: Router,
    private uploadService: UploadService
  ) { }

  private subscription: Subscription;

  st = "starttime";
  d = "duration";
  paper;
  endTime: number = null;
  isPaperStarted: bool = false;
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  paperStatus: string = 'notstart'; //start, upload, submit
  message = "aaaaaaa"
  paperTitle = "Title of the paper";
  files = [];
  paperid;
  userid;
  loading = "";

  link = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  async ngOnInit() {
    let userRoll = localStorage.getItem(LocalStorage.ROLES);
    if(!(Constants.USER_ROLE_ASSIGNMENTS_STUDENT.All.includes(userRoll))){
      this.router.navigate(['/login']);
    }
    
    this.loading = "Loading Paper Data";
    let userid = localStorage.getItem(LocalStorage.USER_ID);
    if (userid === "" || userid === null) {
      this.loading = "";
      this.router.navigate(['/login'])
    }
    this.userid = userid;
    if (this.paymentService.paper !== null) {
      console.log("has paper");
      this.paper = this.paymentService.paper;
      this.paperid = this.paper.paperid;
      var paperState = await this.getPaperState(this.paper.paperid, userid);
      console.log(paperState)
      if (paperState.length === 0) {
        console.log("no record")
        // new paper started
        localStorage.setItem(LocalStorage.CURRENT_PAPER_ID, this.paper.paperid);
        localStorage.setItem(LocalStorage.PAPER_STATUS, "notstart");
        this.paperStatus = "notstart";
        this.isPaperStarted = false;
        this.loading = "";
      } else {
        console.log("has logg", this.paper);
        if (paperState[0].submitstate === "not-submited") {

          let endTimeString = paperState[0].endingtime;
          let endTimeObj = new Date(endTimeString);
          let endTimeStamp = endTimeObj.getTime();
          localStorage.setItem(LocalStorage.PAPER_END_TIME, endTimeStamp.toString());
          this.isPaperStarted = true;
          this.paperStatus = "start";

          let durationTimeStamp = this.showPaperService.getTimeStamp(this.paper.duration);
          this.link = await this.getPaperPdfLink(this.paper.pdflink, (durationTimeStamp / 1000) + 60 * 60, this.userid);
          console.log(this.link)

          var nowTimeStamp = new Date().getTime();

          if (nowTimeStamp > endTimeStamp) {
            this.paperStatus = "overdue"
          }
          this.loading = "";
        } else {
          // paper is submited
          this.loading = "";
          this.showPaperService.paperId = this.paperid;
          this.router.navigate(['paper/result']);
        }
        //paper opened previouslly
        // *************have impleme
        // get the paper status and set values
      }

    } else {
      console.log("no paper")
      var paperid = localStorage.getItem(LocalStorage.CURRENT_PAPER_ID);
      if (paperid === null || paperid === "") {
        this.loading = "";
        this.router.navigate(['/paper/list']);
      } else {
        this.paperid = paperid;
        this.paperStatus = localStorage.getItem(LocalStorage.PAPER_STATUS);
        var paperState = await this.getPaperState(paperid, userid);
        this.paper = await this.getPaper(paperid, userid);
        console.log(paperState);
        if (paperState.length === 0) {
          localStorage.setItem(LocalStorage.PAPER_STATUS, "notstart");
          this.paperStatus = "notstart";
          this.isPaperStarted = false;
          this.loading = "";
        } else {
          console.log("has logg", this.paper);
          if (paperState[0].submitstate === "not-submited") {

            let endTimeString = paperState[0].endingtime;
            let endTimeObj = new Date(endTimeString);
            console.log(endTimeObj);
            let endTimeStamp = endTimeObj.getTime();
            console.log(endTimeStamp);
            console.log(new Date().getTime());
            console.log(new Date());
            localStorage.setItem(LocalStorage.PAPER_END_TIME, endTimeStamp.toString());
            this.isPaperStarted = true;
            this.paperStatus = "start";

            let durationTimeStamp = this.showPaperService.getTimeStamp(this.paper.duration);
            this.link = await this.getPaperPdfLink(this.paper.pdflink, (durationTimeStamp / 1000) + 60 * 60, this.userid);

            var nowTimeStamp = new Date().getTime();

            if (nowTimeStamp > endTimeStamp) {
              this.paperStatus = "overdue"
            }
            this.loading = "";
          } else {
            this.loading = "";
            this.showPaperService.paperId = this.paperid;
            this.router.navigate(['paper/result']);
          }
          //paper opened previouslly
          // *************have impleme
          // get the paper status and set values
        }
      }
    }




    console.log(this.link, "link");











  }


  async startPaper() {
    this.loading = " ";
    let durationTimeStamp = this.showPaperService.getTimeStamp(this.paper.duration);
    this.link = await this.getPaperPdfLink(this.paper.pdflink, durationTimeStamp / 1000, localStorage.getItem(LocalStorage.USER_ID));
    console.log(this.link);
    let now = new Date();
    let endingTime = new Date();

    // console.log(this.showPaperService.getHoursOfDuration(this.paper.duration))
    endingTime.setHours(endingTime.getHours() + this.showPaperService.getHoursOfDuration1(this.paper.duration));
    endingTime.setMinutes(endingTime.getMinutes() + this.showPaperService.getMinutesOfDuration1(this.paper.duration));
    let startTime = now.getTime();
    let endTime = startTime + durationTimeStamp;

    localStorage.setItem(LocalStorage.PAPER_END_TIME, endTime.toString());
    await this.showPaperService.addExamInstance({
      userid: localStorage.getItem(LocalStorage.USER_ID),
      paperid: this.paper.paperid,
      startedTime: now,
      endingTime: endingTime,
      submissionState: "not-submited"
    }).toPromise();

    localStorage.setItem(LocalStorage.PAPER_STATUS, "start");
    this.paperStatus = "start";
    this.isPaperStarted = true;
    this.loading = "";
  }

  async onSubmit() {
    if (this.files.length === 1 && this.files[0].progress === 100 && this.files[0].type === "application/pdf") {
      console.log(this.files);
      const file = this.files[0];
      console.log(file, "file");
      var awsReq = await this.uploadService.getSignedRequest(`answers/${this.paper.paperid}/${this.userid}/${file.name}`, file.type).toPromise();
      console.log(awsReq, "resign URL");
      var b = await this.uploadService.uploadFile(file, awsReq.payload.signedRequest).toPromise();
      console.log("uploaded", b);
      await this.uploadService.updateExamInstanceDetails({
        userid: this.userid,
        paperid: this.paper.paperid,
        uploadedTime: new Date(),
        state: "submited"
      }).toPromise();
      this.isPaperStarted = true;
      this.paperStatus = "submit";
      localStorage.removeItem(LocalStorage.CURRENT_PAPER_ID);
      localStorage.removeItem(LocalStorage.PAPER_END_TIME);
      localStorage.removeItem(LocalStorage.PAPER_STATUS);

      const studentAnswers = {
        paperid: this.paper.paperid,
        userid: this.userid,
        pdfLink: `answers/${this.paper.paperid}/${this.userid}/${file.name}`
      }

      const upload = await this.uploadService.addStudentAnswer(studentAnswers).toPromise();
      this.showPaperService.paperId = this.paperid;
      this.router.navigate(['paper/result']);
    } else {

    }
  }

  async getPaperState(paperid, userid) {
    var result = await this.showPaperService.getPaperState(paperid, userid).toPromise();
    return result.payload;
  }

  async getPaper(paperid, userid) {
    var result = await this.showPaperService.getPaperById(paperid, userid).toPromise();
    console.log(result.payload);
    return result.payload;
  }

  async getPaperPdfLink(pdfLink: string, duration: number, userId: string) {
    var result = await this.showPaperService.getPdfLink(pdfLink, duration, userId).toPromise();
    return result.payload;
  }
}
