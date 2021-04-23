import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaperAdminComponent } from './edit-paper-admin.component';

describe('EditPaperAdminComponent', () => {
  let component: EditPaperAdminComponent;
  let fixture: ComponentFixture<EditPaperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaperAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
