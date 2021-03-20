/* 
 *  Copyright 2019-2020 Axis Limited Liability Company
 */

import { Injectable } from "@angular/core"
import { environment } from "../../environments/environment"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { map } from "rxjs/operators"
import { throwError, Subject, Subscription } from "rxjs"
import { catchError } from "rxjs/operators"
import { LocalStorage } from '../util/localstorage.service';
import { Constants } from '../util/constants';

@Injectable({
  providedIn: "root"
})
export class ResetpasswordComponentService {
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

  
  requestResetPassword(email: string, deviceIp: string) {
    const body = {
      Email: btoa(email),
      DeviceIP: btoa(deviceIp)
    }
    let headers: HttpHeaders = new HttpHeaders()
    return this.http.post<any>(
      environment.SERVER_URL + "/v1/users/requestPWReset/",
      body,
      {
        headers: headers
      }
    )
  }

  validateResetPasswordLink(reqId: string, userId: string) {
    const body = {
      reqId: reqId,
      userId: userId
    }

    let headers: HttpHeaders = new HttpHeaders()
    return this.http.post<any>(
      environment.SERVER_URL + "/v1/users/validatePWReset/",
      body,
      {
        headers: headers
      }
    )
  }

  resetPassword(reqId, password, confirmPassword, userId) {
    const body = {
      reqId: reqId,
      userId: userId,
      newPassword: password,
      confirmPassword: confirmPassword
    }

    let headers: HttpHeaders = new HttpHeaders()

    return this.http.post<any>(
      environment.SERVER_URL + "/v1/users/password/" + userId,
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
