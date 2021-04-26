import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorage } from '../../util/localStorage.service';
import { DateService } from '../../services/util/date.service';
import { UploadService } from '../../services/paper/upload.service';
import { ShowPaperService } from '../../services/paper/show-paper.service';
import { PdfViewerComponent } from '../../common/pdf-viewer/pdf-viewer.component';
import { FileUploaderComponent } from '../../common/file-uploader/file-uploader.component';
import { NgForm } from "@angular/forms";
import { LoadingComponent } from '../../common/loading/loading.component';
import { Constants } from 'src/app/util/Constants';

@Component({
  selector: 'app-edit-paper-admin',
  templateUrl: './edit-paper-admin.component.html',
  styleUrls: ['./edit-paper-admin.component.css']
})
export class EditPaperAdminComponent implements OnInit {

  paper = {
    test: "test value",
    year: "Year",
    month: "Month",
    week: "Week",
    papername: "Name of the Paper",
    duration: "Duration",
    prize:"Price",
    categoryprize:"Monthly Price",
    paperdescription: "Paper Description",
    ispublished:"false",
    pdflink:"",
    paperid :false,
    subjectid:false,
    categoryid:false
  };

  year = "";
  date:any;
  months:any;
  month:any;
  years= [];
  weeks = [];
  week = "";
  paperName = "";
  duration = "";
  price = "";
  categoryPrice = "";
  ispublished = false;
  paperlink:any;
  publish: any;
  paperId:any;

  loading = "";
  showPdf = true;
  showPdfUploader = false;
  uploadStatus: string = null;
  files=[];

  errDuplicate = "";
  errMsg="";
  errPaperName = "";
  errPaperPrice = "";
  errPaperMonthlyPrice = "";
  errDuration = "";
  description = "";


  constructor(
    private router: Router,
    private dateService: DateService, 
    private uploadService: UploadService,
    private showPaperService: ShowPaperService,
    private pdfView: PdfViewerComponent,
    private fileUploader: FileUploaderComponent,
    private loadind: LoadingComponent,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    let userRoll = localStorage.getItem(LocalStorage.ROLES);
    if(!(Constants.USER_ROLE_ASSIGNMENTS.EditPapers.includes(userRoll))){
      this.router.navigate(['/admin/login']);
    }
    let adminId = localStorage.getItem(LocalStorage.USER_ID);
    if(adminId === "" || adminId === null){
      this.router.navigate(['/login'])
    }else{
      this.loading = "Loading Paper Data";
      this.paper = this.route.snapshot.paramMap['params'];
      console.log(this.paper)
      this.year = this.paper.year;
      this.week = this.paper.week;
      this.paperName = this.paper.papername;
      this.duration = this.paper.duration.slice(0,5);
      this.price = this.paper.prize;
      this.categoryPrice = this.paper.categoryprize;
      this.description = this.paper.paperdescription;
      if(this.paper.ispublished === 'true'){
        this.ispublished = true;
      }
      this.paperId = this.paper.paperid;
      var pdfLinkResult = await this.showPaperService.getPdfLink(this.paper.pdflink, 60, adminId).toPromise()
      this.paperlink = pdfLinkResult.payload;
      this.date = new Date();
      this.months = this.dateService.getMonths();
      const thisYear = this.date.getUTCFullYear();
      this.year = thisYear;
      this.month = this.date.getMonth() + 1;
      this.years = [thisYear - 2, thisYear - 1, thisYear, thisYear + 1];
      this.weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
      this.loading = "";
    }

  }

  async upload(addUserForm: NgForm){
    this.loading = "Saving Changes"
    try{
      if(this.paper.paperid){
        this.validateFormData(this.paperName, this.price, this.categoryPrice, this.duration, this.week);
        if(!(this.hasErrors())){
          var pdfLink = this.paper.pdflink;
          if(this.files.length>0){
            //file is changed
            //delete current file
            this.showPaperService.deletePaper(this.paper.paperid, pdfLink);
            //upload new file
            var file = this.files[0];
            var awsReq = await this.uploadService.getSignedRequest(`papers/${this.paper.paperid}/${file.name}`, file.type).toPromise();
            var b = await this.uploadService.uploadFile(file,awsReq.payload.signedRequest).toPromise();
            pdfLink = `papers/${this.paper.paperid}/${file.name}`;
          }
          var publishNow = false;
          if(addUserForm.value.publish){
            publishNow = true;
          }
          var updateedData = {
            paperId: this.paper.paperid,
            paperName: this.paperName,
            year:this.year,
            month:this.month,
            week:this.week,
            duration:this.duration,
            price: this.price,
            mothlyPrice: this.categoryPrice,
            description: this.description,
            pdfLink:pdfLink,
            isPublished: publishNow,
            subjectId: this.paper.subjectid,
            categoryId: this.paper.categoryid
          }
          await this.uploadService.updatePaperData(updateedData).toPromise();
          this.loading = "";
          this.router.navigate(['/paper-list']);
  
        }
      }else{
        this.loading = "";
        this.router.navigate(['/paper-list']);
      }

    }catch(err){
      // show error
      this.loading = "";
      console.log(err)
    }
    
  }


  onChangeYear(e){
    this.errMsg = "";
    this.errDuplicate = "";
    if(e.toString() !== this.paper.year){
      this.checkDuplicate(e, this.month, this.week);
    }
  }

  onChangeMonth(e){
    this.errMsg = "";
    this.errDuplicate = "";
    if(e.toString() !== this.paper.month){
      this.checkDuplicate(this.year, e, this.week);
    }
  }

  onChangeWeek(e){
    this.errMsg = "";
    this.errDuplicate = "";
    if(e.toString() !== this.paper.week){
      this.checkDuplicate(this.year, this.month, e);
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
      }catch(err){

      }
    }
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
    this.errPaperPrice = "";
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

  isChangePdf(){
    this.showPdf = false;
    this.showPdfUploader = true;
  }

  notChangePdf(){
    this.showPdf = true;
    this.showPdfUploader = false;
    this.files = [];
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

  validateFormData(paperName, price, categoryPrice, duration, week){
    if(paperName.length < 1){
      this.errPaperName = "Paper Name can not be empty";
    }else if(paperName.length < 5){
      this.errPaperName = "Paper Name sholud be proper name";
    }

    if(price===null){
      this.errPaperPrice = "Paper Price can not be empty";
    }
    if(categoryPrice===null){
      this.errPaperPrice = "Paper Price can not be empty";
    }
    
    if(duration.toString().length < 1){
      this.errDuration = "Paper Duration can not be empty";
    }
    
    if(week.toString().length < 1){
      this.errDuplicate = "Week Can not be empty";
    }
  }
}
