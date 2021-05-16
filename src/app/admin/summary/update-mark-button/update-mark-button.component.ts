import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-mark-button',
  templateUrl: './update-mark-button.component.html',
  styleUrls: ['./update-mark-button.component.css']
})
export class UpdateMarkButtonComponent implements OnInit {
  public params: any;
  

  agInit(params: any): void {
    this.params = params;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
