import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Subject } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthenticationService } from "../../util/authentication.service";
import { AlertService } from 'src/app/util/alert/alert.service';


@Component({
  selector: 'app-key-code',
  templateUrl: './key-code.component.html',
  styleUrls: ['./key-code.component.scss']
})
export class KeyCodeComponent implements OnInit {
  User: any
  myForm: FormGroup;
  keycodeError: string = "";
  successMessage: string = ""
  keycodeErrorOccurred = new Subject<any>()
  constructor(private http: HttpClient, private router: Router, private _location: Location, private authenticationService: AuthenticationService, private alertService: AlertService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      keycode: new FormControl(null, Validators.required)
    });

  }

  
  onSubmit() {
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
            this.router.navigateByUrl("login");
          }

        },
        error => {
          returnedStatus = error.status;
          console.log("[keyCodeComponent]:: onSubmit() :: errorStatus:: " + returnedStatus);

          if (returnedStatus == 401) {
            this.keycodeError = "Invalid key code";
            this.authenticationService.setKeycodeError(this.keycodeError);
            this.alertService.clear();
            this.alertService.error("Invalid key code");
          } else if (returnedStatus == 500) {
            this.keycodeError = "Error validating key code";
            this.authenticationService.setKeycodeError(this.keycodeError);
            this.alertService.clear();
            this.alertService.error("Error validating key code");
            return;
          }

        }
      );
    this.myForm.reset();
  }
  

}
