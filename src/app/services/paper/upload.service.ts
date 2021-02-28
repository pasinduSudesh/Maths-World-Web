import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  serverURL = environment.SERVER_URL;
  

  constructor(private http: HttpClient) { }


  getSignedRequest(fileName:string, fileType:string){
    const url = this.serverURL + `/v1/s3/getUploadURL?fileName=${fileName}&fileType=${fileType}`;
    return this.http
    .get<{ status: any; payload: any }>(url)
  }

  uploadFile(file:any, requrl:string){

    console.log(file.type);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  file.type      })
    };
    // const req = new HttpRequest(
    //   'PUT',
    //   requrl,
    //   file,
    //   {
    //     Headers: header,
    //     reportProgress: true, //This is required for track upload process
    //   });
    return this.http.put(requrl,file, httpOptions)
  }

  


}
