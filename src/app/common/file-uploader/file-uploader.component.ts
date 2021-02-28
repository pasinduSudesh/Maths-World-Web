import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { UploadService } from '../../services/paper/upload.service';



@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  @Input() public hideUploadButton: boolean = false;
  @Output() public uploadEvent = new EventEmitter();

  constructor(
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
  }
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  uploadFiles(){

    this.uploadEvent.emit('submit');
    if(this.files.length === 1){

    }    
    this.files.forEach(file=>{
      // if(file.type === 'application/pdf'){
          this.uploadService.getSignedRequest(file.name, file.type).subscribe(
            (data:any)=>{
              console.log(data);
              var url = data.payload.signedRequest;
              console.log(url);
              this.uploadService.uploadFile(file, url).subscribe(
                (aa:any)=>{
                  console.log(aa)
                  // 
                }
              )
            } 
          )
      // }else{
        // console.log("veradi file ekak");
      // }
    });
  }
}
