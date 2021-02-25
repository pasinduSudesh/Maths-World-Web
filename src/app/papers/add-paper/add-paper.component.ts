import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { DateService } from '../../services/util/date.service';
import { UploadService } from '../../services/paper/upload.service';


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

  paperPDF: FileList;

  constructor(private navbar: NavbarComponent, private dateService: DateService, private uploadService: UploadService) { }


  ngOnInit(): void {
    this.date = new Date();
    this.months = this.dateService.getMonths();
    const thisYear = this.date.getUTCFullYear();
    this.currentYear = thisYear;
    this.currentMonth = this.date.getMonth();
    this.years = [thisYear - 2, thisYear - 1, thisYear, thisYear + 1];
    this.weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
    console.log(this.weeks);
    console.log(this.currentMonth);
  }

  upload() {
    const file = this.paperPDF.item(0);
    this.uploadService.uploadPaper(file);
  }

  selectFile(event) {
    this.paperPDF = event.target.files;
  }

}
