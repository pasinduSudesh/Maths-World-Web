import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  
}
