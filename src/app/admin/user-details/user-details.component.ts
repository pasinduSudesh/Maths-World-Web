import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from '../../util/alert/alert.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public showPassword_au: boolean = false
  isSubmitted: boolean = false;
  server_url = environment.SERVER_URL;
  constructor(private alertService: AlertService, private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  onSave(addEditorForm: NgForm) {
    console.log("[userAccountsComponent] :: onSave()::");
    if (addEditorForm.value.password != addEditorForm.value.repass) {
      this.alertService.clear();
      this.alertService.error("Passwords do not match!");
      return;
    }
    if (addEditorForm.valid) {
      this.isSubmitted = true;
      let jwtToken;
      this.activatedRoute.queryParams.subscribe(params => {
        jwtToken = params['token'];
        console.log(jwtToken); // Print the parameter to the console. 
    });
      const user = {
        firstName: addEditorForm.value.firstName,
        lastName: addEditorForm.value.lastName,
        residentialAddress: addEditorForm.value.residentialAddress,
        mobileNum: addEditorForm.value.mobileNum,
        password: addEditorForm.value.password,
        status: 'Active',
        Role: "1"
      };

      let headers: HttpHeaders = new HttpHeaders()
      headers = headers.append("token", jwtToken)
      this.http
        .post<any>(
          this.server_url + "/v1/admin/addEditorDetails",
          user,
          {
            headers: headers
          }
        )
        .subscribe(responseData => {
          console.log("[usersService]::addUser():: responseStatusCode::=>" + responseData.status.code);
        if (responseData.status.code == 200) {
          this.isSubmitted = false;
            this.alertService.clear();
            this.alertService.success("Successfully insert the Editor");
            this.router.navigateByUrl("/"); //TODO: set the login screen url
        }
      },
      err => {
        const returnedStatus = err.error.status.code;
        if (returnedStatus == 501) {
          this.isSubmitted = false;
          this.alertService.clear();
          this.alertService.error("Already insert the Details");
        }
        if (returnedStatus == 500) {
          this.isSubmitted = false;
          this.alertService.clear();
          this.alertService.error("Input Error");
        }

      
        });
    }

  }
}
