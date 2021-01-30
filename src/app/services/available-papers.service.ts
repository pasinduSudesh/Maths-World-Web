import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AvailablePapersService {

  serverURL = environment.SERVER_URL;
  datta:any;

  constructor(private http: HttpClient) {
    console.log(this.serverURL);
   }

  gatAvailablePapers(year: string, month: string) :Observable<{ status: any; payload: any } >{
    
      return this.http
        .get<{ status: any; payload: any }>(this.serverURL+"/v1/papers/getPaperById/daaebe1a-b2dc-4e94-89b2-d714d3a7cc31/aa6a2292-4fe1-4cd7-97a5-8516782e58a0")
        
 
        
        
       
        
        
  }
}
