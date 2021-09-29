import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadService } from '../../../services/paper/upload.service';
import { AlertService } from '../../../util/alert/alert.service';
import { LoadingService } from '../../../util/loading/loading.service';

@Component({
  selector: 'app-upload-schema',
  templateUrl: './upload-schema.component.html',
  styleUrls: ['./upload-schema.component.css']
})
export class UploadSchemaComponent implements OnInit {

  @Input() selectedPaperId;
  @Input() selectedIndex;
  @Output() public uploadEvent = new EventEmitter<any>();
  uploadStatus;
  files;

  constructor(
    private uploadService: UploadService,
    private loadingService: LoadingService, 
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    // console.log("aaaaaaaaaaaaaaaaa")
    // console.log(this.selectedPaperId,"aa")
  }

  async upload(){
    // console.log(this.files)
    if(this.files !== undefined && this.files.length === 1 && this.files[0].progress === 100){
      try{
        this.loadingService.showLoading(true, false, "Loading", null);
        var file = this.files[0];
        var awsReq = await this.uploadService.getSignedRequest(`markinSchemas/${this.selectedPaperId}/${file.name}`, file.type).toPromise();
        // console.log(awsReq);
        var b = await this.uploadService.uploadFile(file,awsReq.payload.signedRequest).toPromise();
        var result = await this.uploadService.setSchema(this.selectedPaperId, `markinSchemas/${this.selectedPaperId}/${file.name}`).toPromise();
        this.loadingService.hideLoading();
        this.files = [];
        this.uploadEvent.emit({paperId:this.selectedPaperId,id:this.selectedIndex,link:`markinSchemas/${this.selectedPaperId}/${file.name}`});
        document.getElementById('closebtn').click();
        this.alertService.clear();
        this.alertService.success("Marking Schema Added Successfuly!")

      }catch(error){
        this.loadingService.hideLoading();
        this.alertService.clear();
        this.alertService.error("An Error has occured! Please Try again");
      }
    }else{
      this.alertService.clear();
      this.alertService.error("Add only one PDF file");
    }
    
  }

}
