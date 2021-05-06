import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-pdf-student',
  templateUrl: './download-pdf-student.component.html',
  styleUrls: ['./download-pdf-student.component.css']
})
export class DownloadPdfStudentComponent implements OnInit {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    console.log("answerPdf", this.params.data.answerPdf);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
