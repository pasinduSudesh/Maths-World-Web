import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import getMAC, { isMAC } from 'getmac';
import { LocalStorage } from '../../util/localStorage.service';
import { AlertService } from 'src/app/util/alert/alert.service';
import { AuthenticationService } from "../../util/authentication.service";
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { Constants } from 'src/app/util/Constants';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  public showPassword: boolean = false
  loginForm: FormGroup
  fp: any
  User: any
  submitted = false
  hasErrors = false
  loginError: string = ""
  isSuccess = false
  success: string = ""
  user: any
  loginBtnClicked = false;
  userChanged = new Subject<any>()
  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {
    
   }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }

  validateUser(userName: string, password: string) {
    let deviceid = localStorage.getItem(LocalStorage.DEVICE_ID)
    const user = {
      email: btoa(userName),
      password: btoa(password),
      deviceId: deviceid,
      appName: btoa("Portal")
    }
    //console.log("[AuthenticationService]::validateUser()");
    return this.http.post<any>(
      environment.SERVER_URL + "/v1/admin/login",
      user
    )
  }
  setUser(user: any) {
    this.User = user
    this.userChanged.next(this.User)
  }
  get f() {
    return this.loginForm.controls
  }
  public loginBtnClickEvent() {
    this.loginBtnClicked = true;
    var returnedStatus: any
    this.submitted = true
    //console.log("[LoginComponent]:: loginBtnClickEvent")
    let deviceId = localStorage.getItem(LocalStorage.DEVICE_ID)
    //console.log("deviceId :: " + deviceId);
    window.localStorage.clear()
    //Set back the device id
    if (deviceId != null) {
      localStorage.setItem(LocalStorage.DEVICE_ID, deviceId);
    }
    //console.log("login clicked" + this.loginForm.value.userName + "==" + this.loginForm.value.password)
    if (this.loginForm.invalid) {
      this.loginBtnClicked = false;
      return
    }


    this.validateUser(
      this.loginForm.value.userName,
      this.loginForm.value.password
    )
      .subscribe(
        response => {
          returnedStatus = response.status
          var roles: string[];

          //console.log("[loginComponent] :: loginBtnClickEvent():: response::" + JSON.stringify(response))
          this.user = response.payload

          //console.log("[loginComponent] :: loginBtnClickEvent():: response::" + response.payload.user.Status);
          if (returnedStatus.code == 200) {
            localStorage.setItem(LocalStorage.USER_ID, response.payload.user.evaluatorid);
            localStorage.setItem(LocalStorage.USER_EMAIL, response.payload.user.email);
            localStorage.setItem(LocalStorage.LOGGED_USER, response.payload.user.firstname);
            localStorage.setItem(LocalStorage.REFRESHTOKEN, response.payload.refreshtoken);
            localStorage.setItem(LocalStorage.ROLES,response.payload.role);
            localStorage.setItem(LocalStorage.TOKEN, response.payload.token);

            //console.log("[loginComponent] :: loginBtnClickEvent():: roles::");
            //console.log(response.payload.roles);

            //console.log("[loginComponent] :: loginBtnClickEvent():: LocalStorage.ROLES::");
            //console.log(localStorage.getItem(LocalStorage.ROLES));


            this.setUser(this.user)
            // TODO- change the routing
            if (Constants.USER_ROLE_ASSIGNMENTS_ADMIN.ListPapers.includes(response.payload.role)) {
              this.router.navigateByUrl("/admin/paper/list")
            } else {
              this.router.navigateByUrl("/admin/summary")
            }
          
          } 
          // return returnedStatus;
        },
        err => {
          returnedStatus = err.error.status.code;
          //console.log("[loginComponent]::loginBtnClickEvent() : returnedStatus=> " + err.error.status.code)
          //return returnedStatus;
          if (returnedStatus == 401) {
            this.loginBtnClicked = false;
            this.isSuccess = false;
            this.hasErrors = false;
            this.alertService.clear();
            this.alertService.error("Unauthorized User");
            // this.loginError = "Unauthorized User"
            // this.hasErrors = true
            return
          } else if (returnedStatus == 403) {
            this.loginBtnClicked = false;
            this.isSuccess = false;
            this.hasErrors = false;
            this.alertService.clear();
            this.alertService.error("Sorry you are forbidden");
            // this.loginError = "Sorry you are forbidden"
            // this.hasErrors = true
            return
          } else if (returnedStatus == 532) {
            //console.log(returnedStatus);
            this.loginBtnClicked = false;
            this.isSuccess = false;
            this.hasErrors = false;
            this.alertService.clear();
            this.alertService.error("Application Error");
            // this.loginError == "Application Error"
            // this.hasErrors = true
            return
          } else if (returnedStatus == 404) {
            this.loginBtnClicked = false;
            this.isSuccess = false;
            this.hasErrors = false;
            this.alertService.clear();
            this.alertService.error("No user for this Email");
            // this.loginError = "Internal Server Error"
            // this.hasErrors = true
            return
          } else if (returnedStatus == 500) {
            this.loginBtnClicked = false;
            this.isSuccess = false;
            this.hasErrors = false;
            this.alertService.clear();
            this.alertService.error("Internal Server Error");
            // this.loginError = "Internal Server Error"
            // this.hasErrors = true
            return
          } 
        }
      )

    //console.log("LoginComponent::loginBtnClickEvent():: returnedStatus:: " + returnedStatus)

    //this.router.navigateByUrl("user-role");
  }


}
