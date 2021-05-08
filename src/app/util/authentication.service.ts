/* 
 *  Copyright 2020-2021 404 Solutions Company
 */

import { Injectable } from "@angular/core"
import { environment } from "../../environments/environment"
import { LocalStorage } from '../util/localStorage.service';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Subject } from "../../../node_modules/rxjs";
@Injectable({
    providedIn: "root"
  })
  export class AuthenticationService {
    User: any
    keycodeError: string
    pwdResetError: string
    successMessages: string
    keycodeErrorOccurred = new Subject<any>()
    successAlert = new Subject<any>()
    userChanged = new Subject<any>()
    constructor(private http: HttpClient) { }
  
    validateKeyCode(keycode: string) {
        const body = {
          keyCode: keycode
        }
        let userId = localStorage.getItem(LocalStorage.TEMP_USER_ID)
        let headers: HttpHeaders = new HttpHeaders()
        headers = headers.append("user-id", btoa(userId))
        return this.http.post<any>(
          environment.SERVER_URL + "/v1/users/keycode",
          body,
          {
            headers: headers
          }
        )
    }

    getEmailAddressForVerification() {
      let userId = localStorage.getItem(LocalStorage.TEMP_USER_ID);
      let headers: HttpHeaders = new HttpHeaders()
      headers = headers.append("user-id", btoa(userId))
      return this.http.get<any>(
        environment.SERVER_URL + "/v1/users/getEmail",
          {
            headers: headers
          }
      )
    }

    resentKeyCode() {
      let userId = localStorage.getItem(LocalStorage.TEMP_USER_ID);
      let headers: HttpHeaders = new HttpHeaders()
      headers = headers.append("user-id", btoa(userId))
      return this.http.get<any>(
        environment.SERVER_URL + "/v1/users/resentKeyCode",
          {
            headers: headers
          }
      )
    }

    setKeycodeError(error) {
        this.keycodeError = error
        this.keycodeErrorOccurred.next(this.keycodeError)
    }

    setUser(user) {
        this.User = user
        localStorage.setItem(LocalStorage.TEMP_USER_ID, user)
        this.userChanged.next(this.User)
    }
    
    setSuccessAlert(successMessage) {
      this.successMessages = successMessage
      this.successAlert.next(this.successMessages)
    }
    
    
  }  