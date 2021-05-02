/* 
 *  Copyright 2020-2021 404 Solutions Company
 */

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalStorage {
  constructor() { }

  public static LOGGED_USER: string = "logged_in_user";
  public static DEVICE_ID: string = "device_id";
  public static USER_ID: string = "user_id";
  public static USER_EMAIL: string = "user_email";
  public static ROLES: string = "role";
  public static TOKEN: string = "token";
  public static REFRESHTOKEN: string = "refreshToken";
  public static ROLE_SELECTED: string = "role_selected";
  public static ADMIN_ID: string = "admin_id";
  public static SUBSCRIPTION: string = "subscription";
  public static CURRENT_PAPER_ID: string = "current_paper";
  public static PAPER_END_TIME: string = "end_time";
  public static PAPER_STATUS: string = "paper_status";
  public static TEMP_USER_ID: string = "temp_user_id";


}
