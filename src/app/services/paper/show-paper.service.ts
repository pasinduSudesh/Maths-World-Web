import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LocalStorage } from '../../util/localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class ShowPaperService {

  serverURL = environment.SERVER_URL;
  paperId:string=null;
  

  constructor(private http: HttpClient) { }

  getPaper(){
    return true;
  }
  getTimeStamp(time:string){
    console.log(time);
    let times = time.split(":");
    let hours = parseInt(times[0]);
    console.log(hours);
    let minutes = parseInt(times[1]);
    console.log(minutes);
    return hours*60*60*1000 + minutes*60*1000
  }

  getHoursOfDuration1(duration){
    let times = duration.split(":");
    let hours = parseInt(times[0]);
    return hours;
  }

  getMinutesOfDuration1(duration){
    let times = duration.split(":");
    let minutes = parseInt(times[1]);
    return minutes;
  }

  getPapers(subjectId, adminId){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(adminId));
    // headers = headers.append("app")
    let options = {
      headers: headers
    }

    const url = this.serverURL + `/v1/papers/getAllPapers/${subjectId}`;
    return this.http
    .get<{ status: any; payload: any }>(url,options).pipe(
      catchError(this.handleError)
    )
  }

  getPdfLink(fileName, expireTime, userId){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(userId));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/s3/getFileLink?fileName=${fileName}&expireTime=${expireTime}`;
    return this.http.get<{ status: any; payload: any }>(url, options).pipe(
      catchError(this.handleError)
    )
  }

  updateStatus(paperId, status){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/papers/updateStatus`;
    const data = {
      'paperId': paperId,
      'status': status
    };
    return this.http.put<{ status: any; payload: any }>(url, data, options).pipe(
      catchError(this.handleError)
    )
  }

  deletePaper(paperId,pdfLink){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/papers/deletePaper?paperId=${paperId}&fileName=${pdfLink}`;
    return this.http.delete<{ status: any; payload: any }>(url,options).pipe(
      catchError(this.handleError)
    )
  }

  getPaperState(paperid, userid){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(userid));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/papers/getExamInstance/${paperid}/${userid}`;
    return this.http.get<{ status: any; payload: any }>(url,options).pipe(
      catchError(this.handleError)
    )
  }

  getPaperById(paperid, userid){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(userid));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/papers/getPaperById/${paperid}/${userid}`;
    return this.http.get<{ status: any; payload: any }>(url,options).pipe(
      catchError(this.handleError)
    )
  }

  addExamInstance(instance){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/papers/addExamInstance`;
    return this.http.post<{ status: any; payload: any }>(url,instance, options).pipe(
      catchError(this.handleError)
    )
  }

  getPaidPapers(userId, subjectId){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(userId));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/users/getPaidPapers/${userId}/${subjectId}`;
    return this.http.get<{ status: any; payload: any }>(url,options).pipe(
      catchError(this.handleError)
    )
  }

  getPaperResult(userId, paperId){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(userId));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/users/getPaperResult/${userId}/${paperId}`;
    return this.http.get<{ status: any; payload: any }>(url,options).pipe(
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
