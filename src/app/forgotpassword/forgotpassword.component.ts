/* 
 *  Copyright 2020-2021 404 Solutions Company
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ForgotPasswordComponentService } from "./forgotpassword.service";
import { HttpClient } from "@angular/common/http";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: "app-forgotpassword",
  templateUrl: "./forgotpassword.component.html",
  styleUrls: ["./forgotpassword.component.scss"]
})
export class ForgotpasswordComponent implements OnInit, OnDestroy {
  passwordForm: FormGroup;
  ipAddress: any;
  subscription: Subscription;
  pwdResetError: string = "";
  hasErrors = false
  Error: string = ""
  successMessage: string = ""
  userId: string;
  public cancelForgotPassword;
  constructor(
    private router: Router,
    private forgotPasswordComponent: ForgotPasswordComponentService,
    private _location: Location,
    private http: HttpClient
  ){}
  ngOnInit() {
    if (this.forgotPasswordComponent.pwdResetError) {
      this.hasErrors = true;
      this.Error = this.forgotPasswordComponent.pwdResetError;
    }

    this.passwordForm = new FormGroup({
      email: new FormControl(null, Validators.required)
    });
  }


  onSubmit() {

    var returnedStatus;
    this.forgotPasswordComponent
      .requestResetPassword(
        this.passwordForm.value.email
      )
      .subscribe(
        data => {
          console.log("[forgotPasswordComponent]::onSubmit():: returnedData::===>" + JSON.stringify(data));
          returnedStatus = data.status.code;
          console.log(returnedStatus);
          if (returnedStatus == 200) {
            this.successMessage = "Password reset request has been sent. Please check your email."
            this.forgotPasswordComponent.setSuccessAlert(this.successMessage);
            this._location.back();
          }
          // localStorage.setItem("token", data.token);
          // localStorage.setItem("userId", data.userId);
          // localStorage.setItem("userName", data.userName);
          // localStorage.setItem("userFirstName", data.firstName);
          // localStorage.setItem("expiredIn", data.expiredIn);
          // local storage can not store arrays need to sringify it
        },
        error => {
          var err = JSON.stringify(error);
          console.log("[forgotPasswordComponent]:: onSubmit():: returnedData::===>" + error)
          returnedStatus = error.error.status.code;
          console.log(returnedStatus);
          if (returnedStatus == 500) {
            this.pwdResetError = "Error sending email";
            this.Error = this.pwdResetError;
            this.hasErrors = true;


          }

        }
      );

  }
  back() {
    this.router.navigateByUrl("");
  }
  ngOnDestroy() {
    this.hasErrors = false;
    this.forgotPasswordComponent.keycodeError = '';
    this.forgotPasswordComponent.pwdResetError = '';
  }

}
