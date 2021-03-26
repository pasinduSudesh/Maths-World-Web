import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor() { 

    setTimeout(()=>{
      
    },2000)
  }

  ngOnInit(): void {
  }

}
