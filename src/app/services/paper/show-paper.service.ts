import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowPaperService {

  constructor() { }

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
