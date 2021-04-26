/* 
 *  Copyright 2019-2020 Axis Limited Liability Company
 */

import { Injectable } from "@angular/core";
import { User } from "./user";
import { environment } from "../../../environments/environment";
import { Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "../../util/authentication.service";


@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
  usersChanged = new Subject<User[]>();
  alertMessageOccured = new Subject<any>();
  users: User[] = [];
  user: any;
  subscription: Subscription;
  server_url = environment.SERVER_URL;


  addUser(user) {
    let headers: HttpHeaders = new HttpHeaders()
    
    var res = new Subject<any>();
    let options = {
      headers: headers
    }
    this.http
      .post<any>(
        this.server_url + "/v1/users/addUser",
        user,
        options
      )
      .subscribe(responseData => {
        console.log("[usersService]::addUser():: responseStatusCode::=>" + responseData.status.code);
        res = responseData;
        if ( responseData.status.code == 200 ) {
          this.user = responseData.payload.user;
          this.authenticationService.setUser(this.user.userId);
        }
        this.alertMessageOccured.next({ code: responseData.status.code, message: responseData.status.message });
      }, err => {
        res = err.error;
        this.alertMessageOccured.next({ code: err.error.status.code, message: err.error.status.message });

    });

  }
}