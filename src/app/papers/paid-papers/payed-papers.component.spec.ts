import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayedPapersComponent } from './payed-papers.component';

describe('PayedPapersComponent', () => {
  let component: PayedPapersComponent;
  let fixture: ComponentFixture<PayedPapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayedPapersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayedPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
