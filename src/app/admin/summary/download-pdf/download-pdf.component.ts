import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-pdf',
  templateUrl: './download-pdf.component.html',
  styleUrls: ['./download-pdf.component.css']
})
export class DownloadPdfComponent implements OnInit {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    console.log("evaluatorPdf",this.params.data.evaluatedPdf);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
