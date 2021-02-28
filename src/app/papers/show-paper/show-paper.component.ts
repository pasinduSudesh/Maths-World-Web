import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Subscription, interval } from 'rxjs';
import { TimerComponent } from '../../common/timer/timer.component';
import { FileUploaderComponent } from '../../common/file-uploader/file-uploader.component';
import { ShowPaperService } from '../../services/paper/show-paper.service';
import { bool } from 'aws-sdk/clients/signer';
import { PdfViewerComponent } from '../../common/pdf-viewer/pdf-viewer.component';

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
    private pdf: PdfViewerComponent
    ) { }

  private subscription: Subscription;

  st = "starttime";
  d = "duration";
  paper = {
    duration: "00:01"
  }
  endTime: number = null;
  isPaperStarted:bool = false;
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  paperStatus:string = 'notstart'; //start, upload, submit
  message = "aaaaaaa"
  ngOnInit(): void {

    var started = localStorage.getItem('paperStatus');
    if(started){
      if(started === 'start'){
        this.isPaperStarted = true;
        this.paperStatus = 'start';
      }
      

    }
    // this.subscription = interval(1000)
    //        .subscribe(x => {  });
  }


  startPaper() {
    let durationTimeStamp = this.showPaperService.getTimeStamp(this.paper.duration);
    if (this.showPaperService.getPaper()) {
      this.isPaperStarted = true;
      let startTime = new Date().getTime();
      let endTime = startTime + durationTimeStamp;
      console.log(endTime);
      localStorage.setItem('endTime', endTime.toString());
      localStorage.setItem('paperStatus', 'start');
    }
  }
}
