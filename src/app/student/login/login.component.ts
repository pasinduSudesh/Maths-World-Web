import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import getMAC, { isMAC } from 'getmac';
import { LocalStorage } from '../../util/localStorage.service';
import { AlertService } from 'src/app/util/alert/alert.service';
import { AuthenticationService } from "../../util/authentication.service";
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { UserDetailsService } from '../../services/user/user-details.service';
import { LoadingService } from '../../util/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
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
    private authenticationService: AuthenticationService,
    private userService: UserDetailsService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadingService.hideLoading();
    // console.log(getMAC());
    // localStorage.setItem(LocalStorage.DEVICE_ID, getMAC()); 
    if (this.authenticationService.successMessages) {
      this.isSuccess = true;
      this.success = this.authenticationService.successMessages;
    }
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
    console.log("[AuthenticationService]::validateUser()");
    return this.http.post<any>(
      environment.SERVER_URL + "/v1/users/login",
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
    this.loadingService.showLoading(true, null, "Loading", null)
    this.loginBtnClicked = true;
    var returnedStatus: any
    this.submitted = true
    console.log("[LoginComponent]:: loginBtnClickEvent")
    let deviceId = localStorage.getItem(LocalStorage.DEVICE_ID)
    console.log("deviceId :: " + deviceId);
    window.localStorage.clear()
    //Set back the device id
    if (deviceId != null) {
      localStorage.setItem(LocalStorage.DEVICE_ID, deviceId);
    }
    console.log("login clicked" + this.loginForm.value.userName + "==" + this.loginForm.value.password)
    if (this.loginForm.invalid) {
      this.loginBtnClicked = false;
      this.loadingService.hideLoading();
      return
    }


    this.validateUser(
      this.loginForm.value.userName,
      this.loginForm.value.password
    )
      .subscribe(
        async response => {
          returnedStatus = response.status
          var roles: string[];

          console.log("[loginComponent] :: loginBtnClickEvent():: response::" + JSON.stringify(response))
          this.user = response.payload

          console.log("[loginComponent] :: loginBtnClickEvent():: response::" + response.payload.user.Status);
          if (response.payload.user.status == '200') {
            localStorage.setItem(LocalStorage.USER_ID, response.payload.user.userId);
            localStorage.setItem(LocalStorage.USER_EMAIL, response.payload.user.email);
            localStorage.setItem(LocalStorage.LOGGED_USER, response.payload.user.name);
            localStorage.setItem(LocalStorage.REFRESHTOKEN, response.payload.refreshtoken);
            localStorage.setItem(LocalStorage.ROLES, response.payload.roles);
            localStorage.setItem(LocalStorage.TOKEN, response.payload.token);

            var subscriptionResult = await this.userService.getSubscribedSubjects(response.payload.user.userId).toPromise();
            var subscribedSubjects = JSON.stringify(subscriptionResult.payload);

            console.log("[loginComponent] :: loginBtnClickEvent():: roles::");
            console.log(response.payload.roles);
            localStorage.setItem(LocalStorage.SUBSCRIPTION, subscribedSubjects);

            console.log("[loginComponent] :: loginBtnClickEvent():: LocalStorage.ROLES::");
            console.log(localStorage.getItem(LocalStorage.ROLES));


            this.setUser(this.user)
            console.log("[LoginComponent]::loginBtnClickEvent()::Returned Status:=> " + returnedStatus.code)
            if (returnedStatus.code == 200) {
              this.loadingService.hideLoading();
              this.router.navigateByUrl("paper/list")
            }
          } else if (response.payload.user.status == '406') {
            this.authenticationService.setUser(response.payload.user.userId);
            this.loadingService.hideLoading();
            this.router.navigateByUrl("verify");
          }

         
          // return returnedStatus;
        },
        err => {
          returnedStatus = err.error.status.code;
          console.log("[loginComponent]::loginBtnClickEvent() : returnedStatus=> " + err.error.status.code)
          //return returnedStatus;
          if (returnedStatus == 401) {
            this.loginBtnClicked = false;
            this.loadingService.hideLoading();
            this.isSuccess = false;
            this.hasErrors = false;
            this.alertService.clear();
            this.alertService.error("Unauthorized User");
            // this.loginError = "Unauthorized User"
            // this.hasErrors = true
            return
          } else if (returnedStatus == 403) {
            this.loginBtnClicked = false;
            this.loadingService.hideLoading();
            this.isSuccess = false;
            this.hasErrors = false;
            this.alertService.clear();
            this.alertService.error("Sorry you are forbidden");
            // this.loginError = "Sorry you are forbidden"
            // this.hasErrors = true
            return
          } else if (returnedStatus == 532) {
            this.loginBtnClicked = false;
            this.loadingService.hideLoading();
            this.isSuccess = false;
            this.hasErrors = false;
            this.alertService.clear();
            this.alertService.error("Application Error");
            // this.loginError == "Application Error"
            // this.hasErrors = true
            return
          } else if (returnedStatus == 404) {
            this.loginBtnClicked = false;
            this.loadingService.hideLoading();
            console.log(returnedStatus);
            this.isSuccess = false;
            this.hasErrors = false;
            this.alertService.clear();
            this.alertService.error("No user for this Email");
            // this.loginError = "Internal Server Error"
            // this.hasErrors = true
            return
          } else if (returnedStatus == 500) {
            this.loginBtnClicked = false;
            this.loadingService.hideLoading();
            console.log(returnedStatus);
            this.isSuccess = false;
            this.hasErrors = false;
            this.alertService.clear();
            this.alertService.error("Internal Server Error");
            // this.loginError = "Internal Server Error"
            // this.hasErrors = true
            return
          } else if (returnedStatus == 200) {
            console.log(returnedStatus);
            this.loadingService.hideLoading();
            this.router.navigateByUrl("paper/list")
          }
        }
      )

    //console.log("LoginComponent::loginBtnClickEvent():: returnedStatus:: " + returnedStatus)

    //this.router.navigateByUrl("user-role");
  }

  ngOnDestroy() {
    this.hasErrors = false;
    this.authenticationService.keycodeError = '';
    this.authenticationService.pwdResetError = '';
    this.isSuccess = false;
    this.authenticationService.successMessages = '';
  }



}
