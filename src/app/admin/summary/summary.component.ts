import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getUrlScheme } from '@angular/compiler';
import { AlertService } from '../../util/alert/alert.service';
import { LocalStorage } from '../../util/localStorage.service';

import { environment } from '../../../environments/environment';
import {DownloadPdfComponent} from './download-pdf/download-pdf.component';
import {DownloadPdfStudentComponent} from './download-pdf-student/download-pdf-student.component';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  server_url = environment.SERVER_URL;
  public summary;
  private currentAnswersType;
  private currentPaperId;
  private gridApi;
  private responseDetails;
  public isRowSelectable;
  public paperDetails;
  private gridColumnApi;
  public noRowsTemplate;
  public loadingTemplate;
  public paginationPageSize;
  public frameworkComponents;
  rowData: Array<any> = [];

  constructor(private alertService: AlertService, private http: HttpClient) {
    this.summary = {"total": 0, "selected": 0, "pending": 0, "finished": 0}
    this.paginationPageSize = 10;
    this.currentAnswersType = 'all';
    this.loadingTemplate =
      '<span class="ag-overlay-loading-center">data is loading...</span>';
    this.noRowsTemplate = '<span>No Response received</span>';
    this.loadPapersData();
    this.frameworkComponents = {
      downloadPdf: DownloadPdfComponent,
      downloadPdfStudent: DownloadPdfStudentComponent,
    };
    this.isRowSelectable = function (rowNode) {
      return rowNode.data.evaluatorId == "" ? true : false;
    };
  }

  ngOnInit(): void {}

  columnDefs = [
    {
      headerName: 'Student Name',
      checkboxSelection: true,
      width: 150,
      field: 'studentName',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Status',
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
      width: 150,
      field: 'evaluatorName',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Marks',
      width: 150,
      field: 'marks',
      filter: 'agTextColumnFilter',
    },
    {
      field: "Student PDF",
      cellRenderer: "downloadPdfStudent",
      filter: false,
      cellRendererParams: {
        type: 'answerPdf'
      },
      Width: 100,
    },
    {
      field: "Correction PDF",
      cellRenderer: "downloadPdf",
      filter: false,
      cellRendererParams: {
        type: 'evaluatorPdf'
      },
      Width: 100
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
      params.api.sizeColumnsToFit();
      window.addEventListener('resize', function () {
        setTimeout(function () {
          params.api.sizeColumnsToFit();
        });
      });
      window.addEventListener('click', function () {
        setTimeout(function () {
          params.api.sizeColumnsToFit();
        });
      });
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
              environment.SERVER_URL + '/v1/response/selectOne',{"evaluatorId": LocalStorage.USER_ID, "responseId": event.data.responseId},
              {
                  headers: headers
              }
          ).subscribe((responseData) => {
            console.log("status : ", responseData.status.code);
            if(responseData.status.code == 403){
              this.alertService.clear();
              this.alertService.error(responseData.status.message);
            }
          });
          await this.loadResponsesData();
      }else{
        event.node.setSelected(false);
      }
    }
  }

  async loadPapersData() {
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    await this.http
      .get<any>(
        environment.SERVER_URL + '/v1/papers/getLatestPapers/5', //3 - limit of papers
        {
          headers: headers
        }
      )
      .subscribe((responseData) => {
        console.log('ResponseData' + responseData.status.code);
        console.log(responseData.payload);
        if (responseData.payload != null) {
          this.paperDetails = responseData.payload;
          this.currentPaperId = this.paperDetails[0].paperid;
        }
      });
  }

  async loadResponsesData() {
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
        console.log('ResponseData' + responseData.status.code);
        console.log(responseData.payload);
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
          console.log('[SummaryComponent] :: rowData=>' + this.gridApi);
        }
      });
  }

  onAnswersTypeChanged() {
    var value = (<HTMLSelectElement>document.getElementById('select-answers'))
      .value;
    this.currentAnswersType = value;
    console.log(
      '[SummaryComponent] :: onAnswersTypeChanged():: currentAnswersType::' +
        this.currentAnswersType
    );
    this.loadResponsesData();
  }

  onPaperNameChanged() {
    var value = (<HTMLSelectElement>document.getElementById('select-papers'))
      .value;
    this.currentPaperId = value.split(' ')[1];
    console.log(
      '[SummaryComponent] :: onPaperNameChanged():: currentPaper::' +
        this.currentPaperId
    );
    this.loadResponsesData();
  }

  onPageSizeChanged() {
    var value = (<HTMLSelectElement>document.getElementById('page-size')).value;
    this.paginationPageSize = Number(value);
    this.gridApi.paginationSetPageSize(this.paginationPageSize);
  }

  getUrl(currentAnswersType) {
    console.log(
      '[SummaryComponent] :: getUrl():: currentAnswersType:: ' +
        this.currentAnswersType
    );
    if (currentAnswersType == 'selected') {
      return '/v1/response/selected/' + this.currentPaperId;
    } else if (currentAnswersType == 'unselected') {
      return '/v1/response/pending/' + this.currentPaperId;
    } else if (currentAnswersType == 'finished') {
      return '/v1/response/evaluated/' + this.currentPaperId;
    } else if (currentAnswersType == 'mine') {
      return '/v1/response/myselection/'+ this.currentPaperId + '/' + LocalStorage.USER_ID;
    } else {
      return '/v1/response/' + this.currentPaperId;
    }
  }

}
