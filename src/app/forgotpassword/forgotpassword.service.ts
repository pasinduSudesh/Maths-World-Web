/* 
 *  Copyright 2019-2020 Axis Limited Liability Company
 */

import { Injectable } from "@angular/core"
import { environment } from "../../environments/environment"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { map } from "rxjs/operators"
import { throwError, Subject, Subscription } from "rxjs"
import { catchError } from "rxjs/operators"
import { LocalStorage } from '../util/localStorage.service';
import { Constants } from '../util/Constants';

@Injectable({
  providedIn: "root"
})
export class ForgotPasswordComponentService {
  User: any
  keycodeError: string
  pwdResetError: string
  successMessages: string
  subscription: Subscription
  userChanged = new Subject<any>()
  keycodeErrorOccurred = new Subject<any>()
  pwdRstErrorOccurred = new Subject<any>()
  successAlert = new Subject<any>()
  constructor(private http: HttpClient) { }

  requestResetPassword(email: string) {
    const body = {
      Email: btoa(email)
    }
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-app", "Student")
    return this.http.post<any>(
      environment.SERVER_URL + "/v1/users/requestPWReset/",
      body,
      {
        headers: headers
      }
    )
  }

  setpwdResetError(error) {
    this.pwdResetError = error
    this.pwdRstErrorOccurred.next(this.pwdResetError)
  }

  setSuccessAlert(successMessage) {
    this.successMessages = successMessage
    this.successAlert.next(this.successMessages)
  }

}
