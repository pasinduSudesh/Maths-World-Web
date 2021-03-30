import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ShowPaperService {

  serverURL = environment.SERVER_URL;
  

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

  getPapers(subjectId){
    const url = this.serverURL + `/v1/papers/getAllPapers/${subjectId}`;
    return this.http
    .get<{ status: any; payload: any }>(url).pipe(
      catchError(this.handleError)
    )
  }

  getPdfLink(fileName, expireTime){
    const url = this.serverURL + `/v1/s3/getFileLink?fileName=${fileName}&expireTime=${expireTime}`;
    return this.http.get<{ status: any; payload: any }>(url).pipe(
      catchError(this.handleError)
    )
  }

  deletePaper(paperId,pdfLink){
    const url = this.serverURL + `/v1/papers/deletePaper?paperId=${paperId}&fileName=${pdfLink}`;
    return this.http.delete<{ status: any; payload: any }>(url).pipe(
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
