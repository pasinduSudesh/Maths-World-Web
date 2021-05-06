import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPdfComponent } from './download-pdf.component';

describe('DownloadPdfComponent', () => {
  let component: DownloadPdfComponent;
  let fixture: ComponentFixture<DownloadPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
