import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { AlertService } from 'src/app/util/alert/alert.service';
import { Constants } from 'src/app/util/Constants';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorage } from '../../util/localStorage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isSubmitted: boolean = false;
  server_url = environment.SERVER_URL;
  constructor(private http: HttpClient, private alertService: AlertService,private router: Router,) { }

  ngOnInit(): void {
    let userRoll = localStorage.getItem(LocalStorage.ROLES);
    if(!(Constants.USER_ROLE_ASSIGNMENTS.UserManage.includes(userRoll))){
      this.router.navigate(['/admin/login']);
    }
  }

  onSubmit(addEditor: NgForm) {
    if (addEditor.valid) {
      this.isSubmitted = true;
      //todo-set the userid of the user from the local storage
      //todo- get the batch from ui for further require
      const userId = ''
      console.log(addEditor.value.email);  // { first: '', last: '' }
      const user = {
        email: addEditor.value.email,
        userId: userId,
        roleId: '1',
        batch: 'revision'
      }

      let headers: HttpHeaders = new HttpHeaders()
      let options = {
        headers: headers
      }
      this.http
      .post<any>(
        this.server_url + "/v1/admin/addEditor",
        user,
        options
      )
      .subscribe(responseData => {
        console.log("[usersService]::addUser():: responseStatusCode::=>" + responseData.status.code);
        if (responseData.status.code == 200) {
          this.isSubmitted = false;
          addEditor.reset();
          this.alertService.clear();
            this.alertService.success("Successfully sent the invitation");
        }
      },
      err => {
        const returnedStatus = err.error.status.code;
        if (returnedStatus == 501) {
          this.isSubmitted = false;
          this.alertService.clear();
          this.alertService.error("Already sent the invitation");
        }
        if (returnedStatus == 500) {
          this.isSubmitted = false;
          this.alertService.clear();
          this.alertService.error("Input Error");
        }

      }
      );

    }
  }
}
