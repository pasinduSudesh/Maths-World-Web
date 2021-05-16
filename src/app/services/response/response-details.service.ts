import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorage } from '../../util/localStorage.service';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseDetailsService {

  serverURL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  async getResponsesByEvaluator(paperid, evaluatorid){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    let options = {
      headers: headers
    }
    // const url = this.serverURL + `/v1/response/myselection/unmarked/${paperid}/${evaluatorid}`;
    const url = this.serverURL + `/v1/response/myselection/${paperid}/${evaluatorid}`;
    return this.http.get<{ status: any; payload: any }>(url,options).pipe(
      catchError(this.handleError)
    )
  }

  async uploadCorrectionPdf(data){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/response/updatemarks`;
    return this.http.post<{ status: any; payload: any }>(url,data,options).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
