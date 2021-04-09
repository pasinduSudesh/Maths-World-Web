import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { LocalStorage } from '../../util/localStorage.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor() { }
  private subscription: Subscription;

  endTime: number = 0;
  errMsg: string;
  hours= "00";
  minutes= "00" ;
  seconds ="00";
  warning = false;

  ngOnInit(): void {
    let endTime = parseInt(localStorage.getItem(LocalStorage.PAPER_END_TIME));
    if(endTime){
      this.endTime = endTime;
  
      this.subscription = interval(1000)
             .subscribe(x => { this.setTimes(); });
    }else{
      this.errMsg = "Something Wnt Wrong"
    }

  }

  setTimes(){
    let now = new Date().getTime();
    let timeDeff = this.endTime - now;
    let s = Math.floor(timeDeff / 1000 % 60);
    let m = Math.floor(timeDeff / (1000*60) % 60);
    let h = Math.floor(timeDeff / (1000*60*60) % 24);
    if (s<10){
      this.seconds = "0"+s.toString();
    }else{
      this.seconds  = s.toString();
    }
    if (m<10){
      this.minutes = "0"+m.toString();
    }else{
      this.minutes  = m.toString();
    }
    if (h<10){
      this.hours = "0"+h.toString();
    }else{
      this.hours  = h.toString();
    }
    if (s===0 && m===0 && h===0){
      this.subscription.unsubscribe();
    }
    if (s < 0 || m<0 || h<0){
      this.seconds = "00";
      this.minutes = "00";
      this.hours = "00";
      this.warning = true;
      this.subscription.unsubscribe();
    }
    if (s<10 && m===0 && h===0){
      this.warning = true;
    }
    

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
 }


}
