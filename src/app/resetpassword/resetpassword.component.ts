/* 
 *  Copyright 2019-2020 Axis Limited Liability Company
 */

import { Component, OnInit } from '@angular/core';
import { ResetpasswordComponentService } from "./resetpassword.service";
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/util/alert/alert.service';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private resetpasswordservice: ResetpasswordComponentService, private route: ActivatedRoute, private router: Router, private alertService: AlertService) { }
  reqId: string;
  userId: string;
  public showPassword1: boolean = false;
  public showPassword2: boolean = false;
  ngOnInit() {




    this.route.queryParamMap.subscribe(params => {
      //console.log(params);
      console.log("[resetPasswordComponent]:: routeQueryParams:: " + params['params']['reqId']);
      this.reqId = params['params']['reqId'].replace(/\s/g, "");
      this.userId = params['params']['userId'];

      // this.orderObj = { ...params.keys, ...params };
    });

  }
  onSubmit(resetPwdForm: NgForm) {

    if (resetPwdForm.value.password != resetPwdForm.value.conPwd) {
      this.alertService.clear();
      this.alertService.error("Passwords do not match!");
      return;
    }

    if (resetPwdForm.valid) {

      var returnedStatus;
      this.resetpasswordservice.validateResetPasswordLink(this.reqId, this.userId)
        .subscribe(data => {
          returnedStatus = data.status.code;
          if (returnedStatus == 200) {
            this.resetpasswordservice.resetPassword(this.reqId, resetPwdForm.value.password, resetPwdForm.value.conPwd, this.userId)
              .subscribe(
                data => {
                  this.resetpasswordservice.setSuccessAlert("Password reset successfully");
                  console.log("[resetPasswordComponent]::onSubmit():: returnedStatus =>" + data.status.message)
                  this.router.navigateByUrl('/')
                  console.log("[resetPasswordComponent]::onSubmit():: returnedData =>", + data)
                },
                err => {
                  console.log("[resetPasswordComponent]::onSubmit():: returnedError =>" + err)
                }
              )
          }
          console.log("[resetPasswordComponent]::onSubmit():: returnedData =>" + data);
        }
          , err => {
            returnedStatus = err.error.status.code;
            if (returnedStatus == 403) {
              this.resetpasswordservice.setpwdResetError(err.error.status.message);
              this.router.navigateByUrl('forgot-password');
            } else if (returnedStatus == 500) {
              this.resetpasswordservice.setpwdResetError(err.error.status.message);
              this.router.navigateByUrl('forgot-password');
            }

            console.log("[resetPasswordComponent]:: onSubmit() :: returnedError =>" + err);
          })

    } else {
      return;
    }


  }

  back() {
    this.router.navigateByUrl("");
  }

}
