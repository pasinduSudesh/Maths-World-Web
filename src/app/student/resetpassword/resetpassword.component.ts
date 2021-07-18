/* 
 *  Copyright 2019-2020 Axis Limited Liability Company
 */

import { Component, OnInit } from '@angular/core';
import { ResetpasswordComponentService } from "./resetpassword.service";
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/util/alert/alert.service';
import { AuthenticationService } from "../../util/authentication.service";
import { LoadingService } from '../../util/loading/loading.service';
import { ForgotPasswordComponentService } from "../forgotpassword/forgotpassword.service";


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  reqId: string;
  userId: string;
  isReqIdUserIdNull: boolean;
  isSubmitted: boolean = false;
  public showPassword1: boolean = false;
  public showPassword2: boolean = false;
  constructor(
    private resetpasswordservice: ResetpasswordComponentService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService,
    private forgotPasswordComponent: ForgotPasswordComponentService
    ) { }


    ngOnInit() {
    this.loadingService.hideLoading();
    this.route.queryParamMap.subscribe(params => {
      //console.log(params);
      console.log("[resetPasswordComponent]:: routeQueryParams:: " + params['params']['reqId']);
      if (params['params']['reqId'] == null || params['params']['userId'] == null) {
        this.isReqIdUserIdNull = true;
      } else {
        this.reqId = params['params']['reqId'].replace(/\s/g, "");
        this.userId = params['params']['userId'];  
      }
      
      // this.orderObj = { ...params.keys, ...params };
    });

  }
  onSubmit(resetPwdForm: NgForm) {
    this.isSubmitted = true;
    this.loadingService.showLoading(true, null, "Loading", null);
    if (resetPwdForm.value.password != resetPwdForm.value.conPwd) {
      this.isSubmitted = false;
      this.loadingService.hideLoading();
      this.alertService.clear();
      this.alertService.error("Passwords do not match!");
      return;
    }
    if (this.reqId == null || this.reqId == null) {
      this.isReqIdUserIdNull = true;
    } else {
      this.isReqIdUserIdNull = false;
    }

    if (resetPwdForm.valid && !this.isReqIdUserIdNull) {

      var returnedStatus;
      this.resetpasswordservice.validateResetPasswordLink(this.reqId, this.userId)
        .subscribe(data => {
          returnedStatus = data.status.code;
          if (returnedStatus == 200) {
            this.resetpasswordservice.resetPassword(this.reqId, resetPwdForm.value.password, resetPwdForm.value.conPwd, this.userId)
              .subscribe(
                data => {
                  
                  if (data.status.code == '200') {
                    console.log("[resetPasswordComponent]::onSubmit():: returnedData =>", + data)
                    this.authenticationService.setSuccessAlert("Password Reset Successfully");
                    this.router.navigateByUrl('/login')
                  } else {
                    this.isSubmitted = false;
                    this.loadingService.hideLoading();
                    this.alertService.error('Try again!')
                  }
                  
                },
                err => {
                  this.isSubmitted = false;
                  this.loadingService.hideLoading();
                  this.alertService.error('Try again!')
                  console.log("[resetPasswordComponent]::onSubmit():: returnedError =>" + err)
                }
              )
          }
          console.log("[resetPasswordComponent]::onSubmit():: returnedData =>" + data);
        }
          , err => {
            this.isSubmitted = false;
            this.loadingService.hideLoading();
            returnedStatus = err.error.status.code;
            console.log("Error"+err.error.status.message+" code:: "+returnedStatus)
            if (returnedStatus == 403) {
              this.forgotPasswordComponent.setpwdResetError('Invalid Request');
              this.router.navigateByUrl('forgot-password');
            } else if (returnedStatus == 500) {
              this.forgotPasswordComponent.setpwdResetError('Invalid Request');
              this.router.navigateByUrl('forgot-password');
            }
            this.forgotPasswordComponent.setpwdResetError('Invalid Request');
            this.router.navigateByUrl('forgot-password');
            console.log("[resetPasswordComponent]:: onSubmit() :: returnedError =>" + err);
          })

    } else {
      if (this.isReqIdUserIdNull) {
        this.isSubmitted = false;
        this.loadingService.hideLoading();
        this.alertService.clear();
        this.alertService.warn('please click the link you rececived in email to reset your password!')  
      }
      this.isSubmitted = false;
      this.loadingService.hideLoading();
      return;
    }


  }

  back() {
    this.router.navigateByUrl("");
  }

}
