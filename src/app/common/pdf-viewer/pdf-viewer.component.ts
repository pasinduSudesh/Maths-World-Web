import { Component, Input, OnInit } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {

  @Input() src:string;
  @Input() name:string;

  constructor() { }

  url = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  zoom = 1;
  zoomScale = 0.25;
  ngOnInit(): void {
  }

  zoomIn(){
    if(this.zoom < 2){
      this.zoom += this.zoomScale;
    }    
  }

  zoomOut(){
    if(this.zoom >0){
      this.zoom -= this.zoomScale;
    }
  }

  download(){
    // console.log(this.src)
    FileSaver.saveAs(this.src, this.name);
  }
}
