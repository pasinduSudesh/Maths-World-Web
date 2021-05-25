import { Component, OnInit } from '@angular/core';
import { ShowPaperService } from '../../../services/paper/show-paper.service';
declare var require: any
const FileSaver = require('file-saver');
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

  async btnClickedHandler() {
    var result = await this.showPaperService.getPdfLink(this.params.data.answerPdf, 600, this.params.myId).toPromise();
    FileSaver.saveAs(result.payload, "test");
  }

  constructor(private showPaperService: ShowPaperService) { }

  ngOnInit(): void {
  }

}
