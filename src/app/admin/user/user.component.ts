import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { AlertService } from 'src/app/util/alert/alert.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isSubmitted: boolean = false;
  server_url = environment.SERVER_URL;
  constructor(private http: HttpClient, private alertService: AlertService) { }

  ngOnInit(): void {
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
