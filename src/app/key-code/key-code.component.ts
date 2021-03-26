import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Subject } from "../../../node_modules/rxjs";
import { environment } from "../../environments/environment";
import { AuthenticationService } from "../util/authentication.service";


@Component({
  selector: 'app-key-code',
  templateUrl: './key-code.component.html',
  styleUrls: ['./key-code.component.scss']
})
export class KeyCodeComponent implements OnInit {
  User: any
  myForm: FormGroup;
  keycodeError: string = "";
  keycodeErrorOccurred = new Subject<any>()
  constructor(private http: HttpClient, private router: Router, private _location: Location, private authenticationService: AuthenticationService) { }

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
            this.router.navigateByUrl("login");
          }

        },
        error => {
          returnedStatus = error.status;
          console.log("[keyCodeComponent]:: onSubmit() :: errorStatus:: " + returnedStatus);

          if (returnedStatus == 401) {
            this.keycodeError = "Invalid key code";
            this.authenticationService.setKeycodeError(this.keycodeError);
            


          } else if (returnedStatus == 500) {
            this.keycodeError = "Error validating key code";
            this.authenticationService.setKeycodeError(this.keycodeError);

            return;
          }

        }
      );
    this.myForm.reset();
  }
  

}
