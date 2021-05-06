import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPdfStudentComponent } from './download-pdf-student.component';

describe('DownloadPdfStudentComponent', () => {
  let component: DownloadPdfStudentComponent;
  let fixture: ComponentFixture<DownloadPdfStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadPdfStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadPdfStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
