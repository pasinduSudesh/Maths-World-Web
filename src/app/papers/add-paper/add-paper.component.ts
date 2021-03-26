import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { DateService } from '../../services/util/date.service';
import { UploadService } from '../../services/paper/upload.service';
import { FileUploaderComponent } from '../../common/file-uploader/file-uploader.component';
import { LoadingComponent } from '../../common/loading/loading.component';
import { AlertsComponent } from '../../common/alerts/alerts.component';
import { NgForm } from "@angular/forms";
import { CompileShallowModuleMetadata } from '@angular/compiler';


@Component({
  selector: 'app-add-paper',
  templateUrl: './add-paper.component.html',
  styleUrls: ['./add-paper.component.css']
})
export class AddPaperComponent implements OnInit {

  date: any;
  months: any[] = [];
  years: any = [];
  weeks: any = [];
  currentMonth: any;
  currentYear: any;
  week="";
  files=[];
  uploadStatus: string = null;
  errMsg = "";
  errDuplicate = "";
  errDuration = "";
  categoryPrice = "";
  errPaperName = "";
  errPaperPrice = "";
  errPaperMonthlyPrice = "";
  publishLater = "";
  publishNow = "";
  loading = "";


  // paperPDF: FileList;

  constructor(
    private navbar: NavbarComponent, 
    private dateService: DateService, 
    private uploadService: UploadService,
    private fileUploaderComponent: FileUploaderComponent,
    private loadingComponent: LoadingComponent,
    private alertsComponent: AlertsComponent
    ) { }


  ngOnInit(): void {
    this.date = new Date();
    this.months = this.dateService.getMonths();
    const thisYear = this.date.getUTCFullYear();
    this.currentYear = thisYear;
    this.currentMonth = this.date.getMonth() + 1;
    this.years = [thisYear - 2, thisYear - 1, thisYear, thisYear + 1];
    this.weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
    console.log(this.weeks);
    console.log(this.currentMonth, "current month");
    // this.addUserForm.value.year=thisYear
  }

  onChange(e){

    console.log(e);
  }
  async upload(addUserForm: NgForm) {
    this.loading = "Saving Paper Details";
    if(this.files.length === 1){
      let file = this.files[0];
      console.log(file);  
      console.log(addUserForm.value);  
      this.validateFormData(addUserForm);
      if(!(this.hasErrors())) {        
        try{
          console.log(file);
          var paperIdRequest = await this.uploadService.getPaperId().toPromise();
          const paperId = paperIdRequest.payload;
          console.log("paperId: ", paperId);
          var awsReq = await this.uploadService.getSignedRequest(`papers/${paperId}/${file.name}`, file.type).toPromise();
          console.log(awsReq);
          var b = await this.uploadService.uploadFile(file,awsReq.payload.signedRequest).toPromise();
          console.log("aws request",b);
          console.log(addUserForm.value,"year")
          var isPublish = false;
          if( addUserForm.value.publish === "publishNow"){
            isPublish = true;
          }
          var c = await this.uploadService.savePaperData(
                      paperId,
                      addUserForm.value.paperName, 
                      awsReq.payload.url, 
                      awsReq.payload.url,
                      addUserForm.value.price,
                      addUserForm.value.duration,
                      addUserForm.value.paperDescription,
                      addUserForm.value.year,
                      addUserForm.value.month,
                      addUserForm.value.week,
                      isPublish,
                      addUserForm.value.categoryPrice
                    ).toPromise();
          this.loading = "";
        }catch(err){
          this.loading = "";
          console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrrrr!!!1")
          console.log(err.message)
        }
      }
    }else if(this.files.length > 1){
      this.loading = "";
      this.errMsg = "Please upload only one paper";
      console.log(this.errMsg);
    }else{
      this.loading = "";
      this.errMsg = "Please upload paper PDF before submit";
      console.log(this.errMsg);
    }
  }

  selectFile(event) {
    // this.paperPDF = event.target.files;
  }

  onChangeYear(e){
    this.errMsg = "";
    this.checkDuplicate(e, this.currentMonth, this.week);
  }

  onChangeMonth(e){
    this.errMsg = "";
    this.checkDuplicate(this.currentYear, e, this.week);
  }

  onChangeWeek(e){
    this.errMsg = "";
    this.checkDuplicate(this.currentYear, this.currentMonth, e);
  }

  onChangePaperName(e){
    this.errMsg = "";
    this.errPaperName = "";
  }

  onChangePaperPrice(e){
    this.errMsg = "";
    this.errPaperPrice = "";
  }

  onChangePaperMonthlyPrice(e){
    this.errMsg = "";
    this.errPaperMonthlyPrice = "";
  }

  onChangeDuration(e){
    this.errMsg = "";
    this.errDuration = "";
    if (e.length > 1){
      if(e.length > 5){
        this.errDuration = "Please follow HH:MM";
      }else if(e.includes(":")){
        var splits = e.split(":");
        splits.forEach(el => {
          if( !(/^\d+$/.test(el))){
            this.errDuration = "Only add Numbers";
          }
        });
       
      }
    }
  }

  async checkDuplicate(year: any, month: any, week: any){
    if (week !== "" && month !== "" && year !== ""){
      try{
        var category = await this.uploadService.getCategoryData(year, month).toPromise();
        this.errDuplicate = "";
        category.payload.forEach(element => {
          if(element.week.toString() === week.toString()){
            this.errDuplicate = "Already Has Paper"
            console.log(this.errDuplicate);
          }
        });

        if(category.payload.length > 0 && this.errDuplicate === ""){
          this.categoryPrice = category.payload[0].categoryprize
          console.log(this.categoryPrice, "werdasa")
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  hasErrors(){
    if( 
      this.errDuplicate !== "" ||
      this.errPaperName !== "" ||
      this.errPaperPrice !== "" ||
      this.errPaperMonthlyPrice !== "" ||
      this.errDuration !== ""
    ){
      return true;
    }else{
      return false;
    }
  }

  validateFormData(data){
    if(data.value.paperName.length < 1){
      this.errPaperName = "Paper Name can not be empty";
    }else if(data.value.paperName.length < 5){
      this.errPaperName = "Paper Name sholud be proper name";
    }

    if(data.value.price.toString().length < 1){
      this.errPaperPrice = "Paper Price can not be empty";
    }
    
    if(data.value.duration.toString().length < 1){
      this.errDuration = "Paper Duration can not be empty";
    }
    
    if(data.value.week.toString().length < 1){
      this.errDuplicate = "Week Can not be empty";
    }
  }
}

