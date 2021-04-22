import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { AlertService } from 'src/app/util/alert/alert.service';
import { Router } from "@angular/router";
import { DeleteEditorButtonComponent } from './delete-editor-button/delete-editor-button.component';

@Component({
  selector: 'app-user-details-grid',
  templateUrl: './user-details-grid.component.html',
  styleUrls: ['./user-details-grid.component.css']
})
export class UserDetailsGridComponent implements OnInit {
  server_url = environment.SERVER_URL;
    //TODO: get the userId from the local storage
    //const userId = localStorage.getItem(LocalStorage.USER_ID);
    //TODO: remove the userId
  private  userId = 'f7a653d0-7fdf-11eb-802b-0a98ed0793c9';
  private selectedRowIndex;
  private updatedEditorId;
  public updatedEditorFullName;
  private gridApi;
  private gridColumnApi;
  private editorDetails;
  rowData: Array<any> = [];
  public noRowsTemplate;
  public loadingTemplate;
  constructor(private http: HttpClient, private alertService: AlertService, private router: Router) {
    this.loadingTemplate =
      '<span class="ag-overlay-loading-center">data is loading...</span>';
    this.noRowsTemplate =
      '<span>No Examiners Reistered to the System</span>';

  }

  columnDefs = [
    { headerName: 'First Name', width: 150, field: 'firstName', filter: "agTextColumnFilter" },
    { headerName: 'Last Name', width: 150, field: 'lastName', filter: "agTextColumnFilter" },
    { headerName: 'Date Added', width: 250, field: 'addedDate', filter: "agTextColumnFilter" },
    { headerName: 'Email', width: 250, field: 'email', filter: "agTextColumnFilter" },
    { headerName: 'Contact Number', width: 200, field: 'mobileNum', filter: "agTextColumnFilter" },
    {
      headerName: '',
      cellRendererFramework: DeleteEditorButtonComponent,
      width: 150,
      field: 'delBtn'
    }];

  gridOptions = {
    defaultColDef: { sortable: true, filter: true },
    rowData: null,
    floatingFilter: true,
    animateRows: true,
    enableSorting: true,
    enableCellChangeFlash: true,
    suppressColumnVirtualization: true,
    onGridReady: params => {
      this.gridApi = params.api;
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append("user-id", btoa(this.userId));
      this.http.get<any>(
        environment.SERVER_URL + "/v1/admin/getEditorDetails",
        {
          headers: headers
        }
      )
        .subscribe(responseData => {
          console.log("ResponseData" + responseData.status.code);
          console.log(responseData.payload);
          if (responseData.payload != null) {
            this.editorDetails = responseData.payload.rows;

            for (const el of this.editorDetails) {
              this.rowData.push({
                firstName: el.firstname,
                lastName: el.lastname,
                addedDate: el.date_created,
                email: el.email,
                mobileNum: el.mobilenum,
                evaluatorId: el.evaluatorid,
              });
            }
            this.gridApi.setRowData(this.rowData);
            console.log("[classroomComponent] :: rowData=>" + this.gridApi);
  
          }
        })

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
    }
  };

  
  ngOnInit() {
  }

  deleteEditor() {
    console.log('Delete Editor'+ this.updatedEditorId+" "+this.userId)

      const options = {
        headers: new HttpHeaders({
          'user-id': btoa(this.userId)
        }),
        body: {
          evaluatorId: this.updatedEditorId      
        },
      };
    this.http.delete<any>(
      environment.SERVER_URL + "/v1/admin/deleteEditorDetails",
      options
    )
    .subscribe(responseData => {
      console.log("Delete Editor"+responseData.status.code);
      if (responseData.status.code == 200) {
        this.alertService.success("Successfully Delete the examiner");
        window.location.reload();
      }
    }, err => {
      this.alertService.error("Error on Deleting the examiner");
    }
    );
  }

  onCellClicked($event) {
    this.selectedRowIndex = $event.rowIndex;
    console.log("[editorDetailsComponent] :: onCellClicked():: selectedRowIndex::" + this.selectedRowIndex);
    console.log($event);


    if ($event.colDef.headerName == '') {
      console.log('[classroomComponent]:: oncellClicked:: '+$event.data.evaluatorId);
      this.updatedEditorId = $event.data.evaluatorId;
      this.updatedEditorFullName = $event.data.firstName + " " + $event.data.lastName; 
      
    } 
  }
}
