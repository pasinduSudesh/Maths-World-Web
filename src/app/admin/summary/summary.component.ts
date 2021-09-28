import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getUrlScheme } from '@angular/compiler';
import { Router } from '@angular/router';
import { AlertService } from '../../util/alert/alert.service';
import { LocalStorage } from '../../util/localStorage.service';
import { LoadingService } from '../../util/loading/loading.service';
import {ShowPaperService} from '../../services/paper/show-paper.service';
import {EvalDetailsService} from "../../services/admin/eval-details.service";
import { Constants } from '../../util/Constants';

import { environment } from '../../../environments/environment';
import { DownloadPdfComponent } from './download-pdf/download-pdf.component';
import { DownloadPdfStudentComponent } from './download-pdf-student/download-pdf-student.component';
import { UpdateMarkButtonComponent } from './update-mark-button/update-mark-button.component';
declare var require: any
const FileSaver = require('file-saver');
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  server_url = environment.SERVER_URL;
  public summary;
  private currentAnswersType;
  public currentPaperId;
  private evalId;
  private subjectId;
  private gridApi;
  private responseDetails;
  public isRowSelectable;
  public paperDetails;
  private gridColumnApi;
  public noRowsTemplate;
  public loadingTemplate;
  public paginationPageSize;
  public frameworkComponents;
  public isButtonsDisabled;
  public clickedRow;
  rowData: Array<any> = [];

  constructor(
    private alertService: AlertService, 
    private http: HttpClient, 
    private loadingService: LoadingService, 
    private showPaperService: ShowPaperService,
    private evalDetailsService: EvalDetailsService,
    private router: Router, 
    ){
    this.summary = {"total": 0, "selected": 0, "pending": 0, "finished": 0}
    this.paginationPageSize = 10;
    this.currentAnswersType = 'all';
    this.isButtonsDisabled = false;
    this.loadingTemplate =
      '<span class="ag-overlay-loading-center">data is loading...</span>';
    this.noRowsTemplate = '<span>No Response received</span>'; 
    this.frameworkComponents = {
      downloadPdf: DownloadPdfComponent,
      downloadPdfStudent: DownloadPdfStudentComponent,
      updateResult: UpdateMarkButtonComponent,
    };
    this.isRowSelectable = function (rowNode) {
      return rowNode.data.evaluatorId == "" ? true : false;
    };
  }

  async ngOnInit() {
    this.loadingService.showLoading(true, false, "Loading", null); 

    let userRoll = localStorage.getItem(LocalStorage.ROLES);
    if(!(Constants.USER_ROLE_ASSIGNMENTS_ADMIN.ViewPapers.includes(userRoll))){
      this.router.navigate(['/admin/login']);
    }

    let userid = localStorage.getItem(LocalStorage.USER_ID);
    if (userid === "" || userid === null) {
      this.router.navigate(['/admin/login']);
    }
    this.evalId = userid;
    var result = await this.evalDetailsService.getSubjectIdByEvaluator().toPromise();
    this.subjectId = result.payload[0].subjectid;

    await this.loadPapersData();

    this.loadingService.hideLoading();
  }

  columnDefs = [
    {
      headerName: 'Student Name',
      resizable: true,
      checkboxSelection: true,
      width: 150,
      field: 'studentName',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Status',
      resizable: true,
      cellRenderer: (nodeData) => {
        if(nodeData.data.marks != ""){
          return '<img src="../../../assets/images/checkbox-checked.svg" alt="Finished" style="width: 20px; height: 20px">'
        }else if(nodeData.data.evaluatorId != ""){
          return '<img src="../../../assets/images/checkbox-indeterminate.svg" alt="on Progress" style="width: 20px; height: 20px">'
        }else{
          return '<img src="../../../assets/images/checkbox-unchecked.svg" alt="Pending" style="width: 20px; height: 20px">'
        }
      },
      width: 80,
      field: 'status',
      filter: false,
    },
    {
      headerName: 'Evaluator Name',
      resizable: true,
      width: 150,
      field: 'evaluatorName',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Marks',
      resizable: true,
      width: 150,
      field: 'marks',
      filter: 'agTextColumnFilter',
    },
    {
      field: "Student PDF",
      resizable: true,
      cellRenderer: "downloadPdfStudent",
      filter: false,
      cellRendererParams: {
        type: 'answerPdf',
        myId: localStorage.getItem(LocalStorage.USER_ID)
      },
      Width: 80,
    },
    {
      field: "Correction PDF",
      resizable: true,
      cellRenderer: "downloadPdf",
      filter: false,
      cellRendererParams: {
        type: 'evaluatorPdf',
        myId: localStorage.getItem(LocalStorage.USER_ID)
      },
      Width: 80
    },
    {
      field: "Update Results",
      resizable: true,
      cellRenderer: "updateResult",
      filter: false,
      cellRendererParams: {
        type: 'update',
        myId: localStorage.getItem(LocalStorage.USER_ID)
      },
      Width: 80
    },
  ];

  gridOptions = {
    defaultColDef: { sortable: true, filter: true},
    rowData: null,
    pagination: true,
    paginationPageSize: 10,
    floatingFilter: true,
    animateRows: true,
    enableSorting: true,
    checkboxSelection: true,
    enableCellChangeFlash: true,
    suppressColumnVirtualization: true,
    onGridReady: (params) => {
      this.gridApi = params.api;
      let headers: HttpHeaders = new HttpHeaders();
      this.loadResponsesData();

      this.gridColumnApi = params.columnApi;
      params.api.setColumnDefs(this.columnDefs);
      window.addEventListener('resize', function () {
        setTimeout(function () {
          if (window.innerWidth >= 1000) {
            params.api.sizeColumnsToFit();
          }
        });
        
      });
      // if (window.innerWidth >= 1000) {
      //   params.api.sizeColumnsToFit();
      // }
    },
  };

  async onRowSelected(event) {
    if(event.node.isSelected()){
      let result = confirm("Are you sure to select this paper for evaluation ?");
      if(result){
        let headers: HttpHeaders = new HttpHeaders()
        headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
        await this.http
          .post<any>(
              environment.SERVER_URL + '/v1/response/selectOne',{"evaluatorId": localStorage.getItem(LocalStorage.USER_ID), "responseId": event.data.responseId},
              {
                  headers: headers
              }
          ).subscribe((responseData) => {
            if(responseData.status.code == 200){
              this.loadResponsesData();
            }
            else if(responseData.status.code == 403){
              this.alertService.clear();
              this.alertService.error(responseData.status.message);
            }
          });
      }else{
        event.node.setSelected(false);
      }
    }
  }

  async onRowClicked(event: any) { 
    this.clickedRow = event.data
  }

  async loadPapersData() {
    this.loadingService.showLoading(true, false, "Loading", null); 
    
    if( this.subjectId != undefined){
      var results = await this.showPaperService.getLatestPapers(this.subjectId, this.evalId).toPromise();
      this.paperDetails = results.payload;
      if(results.payload.length > 0){
        this.currentPaperId = results.payload[0].paperid;
        this.loadResponsesData();
      }else{
        this.currentPaperId = undefined;
      }
    }
    this.loadingService.hideLoading();
  }

  async loadResponsesData() {
    this.loadingService.showLoading(true, false, "Loading", null);
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    await this.http
      .get<any>(
        environment.SERVER_URL + this.getUrl(this.currentAnswersType),
        {
          headers: headers
        }
      )
      .subscribe((responseData) => {
        this.rowData = [];
        this.summary = {"total": 0, "selected": 0, "pending": 0, "finished": 0};
        if (responseData.payload != null) {
          this.responseDetails = responseData.payload;
          this.summary["total"] = this.responseDetails.length;
          for (const res of this.responseDetails) {

            if(res.marks != null){
              this.summary["finished"]++
            }
            
            if(res.evaluatorid != null){
              this.summary["selected"]++
            }else{
              this.summary["pending"]++
            }

            this.rowData.push({
              studentId: res.userid != null ? res.userid : "",
              studentName: res.stufirst != null ? res.stufirst + ' ' + res.stulast : "",
              paperId: res.paperid ? res.paperid : "",
              responseId: res.responseid != null ? res.responseid : "",
              answerPdf: res.link_pdf != null ? res.link_pdf : "",
              evaluatorId: res.evaluatorid != null ? res.evaluatorid : "",
              evaluatorName: res.evalfirst != null ? res.evalfirst + ' ' + res.evallast : "",
              marks: res.marks != null ? res.marks : "",
              evaluatedPdf: res.evaluated_link_pdf !== null ? res.evaluated_link_pdf : "",
            });
          }
          this.gridApi.setRowData(this.rowData);
        }
      });
      this.loadingService.hideLoading();
  }

  onAnswersTypeChanged() {
    var value = (<HTMLSelectElement>document.getElementById('select-answers'))
      .value;
    this.currentAnswersType = value;
    this.loadResponsesData();
  }

  onPaperNameChanged() {
    var value = (<HTMLSelectElement>document.getElementById('select-papers'))
      .value;
    this.currentPaperId = value;
    this.loadResponsesData();
  }

  onPageSizeChanged() {
    var value = (<HTMLSelectElement>document.getElementById('page-size')).value;
    this.paginationPageSize = Number(value);
    this.gridApi.paginationSetPageSize(this.paginationPageSize);
  }

  refreshData(){
    this.loadResponsesData();
  }

  getUrl(currentAnswersType) {
    if (currentAnswersType == 'selected') {
      return '/v1/response/selected/' + this.currentPaperId;
    } else if (currentAnswersType == 'unselected') {
      return '/v1/response/pending/' + this.currentPaperId;
    } else if (currentAnswersType == 'finished') {
      return '/v1/response/evaluated/' + this.currentPaperId;
    } else if (currentAnswersType == 'mine') {
      return '/v1/response/myselection/'+ this.currentPaperId + '/' + localStorage.getItem(LocalStorage.USER_ID);
    } else {
      return '/v1/response/' + this.currentPaperId;
    }
  }

  async DownloadPaper(){
    if(this.currentPaperId != undefined){
      const data = await this.getPaperById();
      if(data.pdflink != null){
        var result = await this.showPaperService.getPdfLink(data.pdflink, 600, localStorage.getItem(LocalStorage.USER_ID)).toPromise();
        FileSaver.saveAs(result.payload, data.papername + "_paper");
      }else{
        this.alertService.clear();
        this.alertService.error("Paper is not available !");
      }
      this.isButtonsDisabled = false;
    }else{
      this.isButtonsDisabled = true;
    }
    this.loadingService.hideLoading();
  }

  async DownloadSchema(){
    if(this.currentPaperId != undefined){
      const data = await this.getPaperById();
      if(data.markingschema != null){
        var result = await this.showPaperService.getPdfLink(data.markingschema, 600, localStorage.getItem(LocalStorage.USER_ID)).toPromise();
        FileSaver.saveAs(result.payload, data.papername + "_scheme");
      }else{
        this.alertService.clear();
        this.alertService.error("Marking Scheme is not available !");
      }
      this.isButtonsDisabled = false;
    }else{
      this.isButtonsDisabled = true;
    }

    this.loadingService.hideLoading();
  }

  async getPaperById(){
    this.loadingService.showLoading(true, false, "Loading", null); 
    var result = await this.showPaperService.getPaperById(this.currentPaperId, localStorage.getItem(LocalStorage.USER_ID)).toPromise();
    if(result.status.code == 200){
      return result.payload;
    }else{
      this.alertService.clear();
      this.alertService.error("Please select paper first !");
    }
  }

}
