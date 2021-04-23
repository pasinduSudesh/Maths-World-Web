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
export class UploadService {

  serverURL = environment.SERVER_URL;
  

  constructor(private http: HttpClient) { }


  getSignedRequest(fileName:string, fileType:string) {
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/s3/getUploadURL?fileName=${fileName}&fileType=${fileType}`;
    return this.http
    .get<{ status: any; payload: any }>(url,options).pipe(
      catchError(this.handleError)
    )
  }

  uploadFile(file:any, requrl:string) {
    console.log(file.type);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  file.type
      })
    };
    let headers: HttpHeaders = new HttpHeaders();
  

    return this.http.put(requrl,file, httpOptions);
  }

  getPaperId(){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/papers/getPaperId`;
    return this.http
    .get<{ status: any; payload: any }>(url,options).pipe(
      catchError(this.handleError)
    )
  }

  getSubject(teacherId){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/subject/getSubjectByTeacher/${teacherId}`;
    return this.http
    .get<{ status: any; payload: any }>(url,options).pipe(
      catchError(this.handleError)
    )
  }

  savePaperData(id, paperName, pdfLink, imageLink, price, duration, paperDescription, year, month, week, isPublish, monthlyPrice, subjectId){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/papers/addPaper`;
    const data = {
      id:id,
      paperName:paperName,
      pdfLink:pdfLink,
      imageLink:imageLink,
      price:price,
      duration:duration,
      paperDescription:paperDescription,
      year:year,
      month:month,
      week:week,
      isPublish:isPublish,
      monthlyPrice:monthlyPrice,
      subjectId:subjectId
    }
    console.log(data, "add paper data");
    return this.http.post<{ status: any; payload: any }>(url,data,options).pipe(
      catchError(this.handleError)
    )
  }

  updatePaperData(updateData){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/papers/updatePaper`;
    return this.http.put<{ status: any; payload: any }>(url,updateData,options).pipe(
      catchError(this.handleError)
    )
  }

  addStudentAnswer(data){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/papers/addStudentAnswers`;
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
  
  getCategoryData(year, month){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/papers/getCategoryData/${year}/${month}`;
    return this.http.get<{ status: any; payload: any }>(url, options).pipe(
      catchError(this.handleError)
    )
  }

  publishPaperById(paperId){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/papers/publishPaperById`;
    const data = {
      paperId:paperId
    }
    return this.http.post<{ status: any; payload: any }>(url,data, options).pipe(
      catchError(this.handleError)
    )
  }

  updateExamInstanceDetails(examDate){
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("user-id", btoa(localStorage.getItem(LocalStorage.USER_ID)));
    let options = {
      headers: headers
    }
    const url = this.serverURL + `/v1/papers/updateExamInstance`;
    return this.http.put<{ status: any; payload: any }>(url,examDate,options).pipe(
      catchError(this.handleError)
    )
  }

}
