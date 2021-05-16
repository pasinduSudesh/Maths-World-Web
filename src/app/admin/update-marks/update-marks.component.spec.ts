import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMarksComponent } from './update-marks.component';

describe('UpdateMarksComponent', () => {
  let component: UpdateMarksComponent;
  let fixture: ComponentFixture<UpdateMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
