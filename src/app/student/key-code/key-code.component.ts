import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Subject } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthenticationService } from "../../util/authentication.service";
import { AlertService } from 'src/app/util/alert/alert.service';
import { LoadingService } from '../../util/loading/loading.service';


@Component({
  selector: 'app-key-code',
  templateUrl: './key-code.component.html',
  styleUrls: ['./key-code.component.scss']
})
export class KeyCodeComponent implements OnInit {
  User: any
  myForm: FormGroup;
  keycodeError: string = "";
  emailAddress: string = "";
  successMessage: string = ""
  keycodeErrorOccurred = new Subject<any>()
  constructor(
    private http: HttpClient, 
    private router: Router, 
    private _location: Location, 
    private authenticationService: AuthenticationService, 
    private alertService: AlertService,
    private loadingService: LoadingService
    ) { }

  ngOnInit() {
    this.loadingService.hideLoading();
    this.authenticationService.getEmailAddressForVerification()
      .subscribe(
        data => {
          console.log("[keyCodeComponent]:: onSubmit() ::===data :" + JSON.stringify(data));
          var returnedStatus = data.status;
          console.log(returnedStatus.code);
            if (returnedStatus.code == 200) {
            this.emailAddress = data.payload;
          }

        },
        error => {
          var returnedStatus = error.status;
          console.log("[keyCodeComponent]:: onSubmit() :: errorStatus:: " + returnedStatus);

          if (returnedStatus == 401) {
            this.emailAddress = 'Error Getting Email Address'
          }
        }
      )
    this.myForm = new FormGroup({
      keycode: new FormControl(null, Validators.required)
    });

  }

  
  onSubmit() {
    this.loadingService.showLoading(true, null, "Loading", null)
    console.log(this.myForm.value.keycode);

    var returnedStatus;
    this.authenticationService.validateKeyCode(this.myForm.value.keycode)
      .subscribe(
        data => {
          console.log("[keyCodeComponent]:: onSubmit() ::===data :" + JSON.stringify(data));
          returnedStatus = data.status;
          console.log(returnedStatus.code);
            if (returnedStatus.code == 200) {
            this.successMessage = "KeyCode verification is Success."
            this.authenticationService.setSuccessAlert(this.successMessage);
            this.loadingService.hideLoading();
            this.router.navigateByUrl("login");
          }

        },
        error => {
          returnedStatus = error.status;
          console.log("[keyCodeComponent]:: onSubmit() :: errorStatus:: " + returnedStatus);

          if (returnedStatus == 401) {
            this.loadingService.hideLoading();
            this.keycodeError = "Invalid key code";
            this.authenticationService.setKeycodeError(this.keycodeError);
            this.alertService.clear();
            this.alertService.error("Invalid key code");
          } else if (returnedStatus == 500) {
            this.loadingService.hideLoading();
            this.keycodeError = "Error validating key code";
            this.authenticationService.setKeycodeError(this.keycodeError);
            this.alertService.clear();
            this.alertService.error("Error validating key code");
            return;
          } else if (returnedStatus == 403) {
            this.loadingService.hideLoading();
            this.keycodeError = "Invalid Inputs";
            this.authenticationService.setKeycodeError(this.keycodeError);
            this.alertService.clear();
            this.alertService.error("Invalid Input");
            return;
          }


        }
      );
    this.myForm.reset();
  }
  
  back() {
    this.router.navigateByUrl("/login");
  }

  resentKeyCode() {
    this.loadingService.showLoading(true, null, "Loading", null)
    console.log("Keycode resent request");
    this.authenticationService.resentKeyCode()
      .subscribe(data => {
        console.log("[keyCodeComponent]:: onSubmit() ::===data :" + JSON.stringify(data));
        var returnedStatus = data.status;
        console.log(returnedStatus.code);
          if (returnedStatus.code == 200) {
            this.loadingService.hideLoading();
            this.alertService.clear();
            this.alertService.success('Successfully resent the keycode');
          }
      },
      error => {
        var returnedStatus = error.status;
        console.log("[keyCodeComponent]:: onSubmit() :: errorStatus:: " + returnedStatus);

          if (returnedStatus == 401) {
            this.loadingService.hideLoading();
            this.alertService.clear();
            this.alertService.error("Invalid key code");
          } else if (returnedStatus == 500) {
            this.loadingService.hideLoading();
            this.alertService.clear();
            this.alertService.error("Error sending key code");
            return;
          }

      }
      )
  }

}
