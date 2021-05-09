import { Component, OnInit } from '@angular/core';
import { ShowPaperService } from '../../../services/paper/show-paper.service';
declare var require: any
const FileSaver = require('file-saver');
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

  async btnClickedHandler() {
    var result = await this.showPaperService.getPdfLink(this.params.data.evaluatedPdf, 600, this.params.evaluatorId).toPromise();
    FileSaver.saveAs(result.payload, "test");
  }

  constructor(private showPaperService: ShowPaperService) { }

  ngOnInit(): void {
  }

}
