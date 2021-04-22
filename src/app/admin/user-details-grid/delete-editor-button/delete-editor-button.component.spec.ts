import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEditorButtonComponent } from './delete-editor-button.component';

describe('DeleteEditorButtonComponent', () => {
  let component: DeleteEditorButtonComponent;
  let fixture: ComponentFixture<DeleteEditorButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEditorButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEditorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
