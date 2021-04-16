import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
  selector: 'app-delete-editor-button',
  templateUrl: './delete-editor-button.component.html',
  styleUrls: ['./delete-editor-button.component.scss']
})
export class DeleteEditorButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    params.api.refreshCells(params);
    return false;
  }
}
