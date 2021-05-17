import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMarkButtonComponent } from './update-mark-button.component';

describe('UpdateMarkButtonComponent', () => {
  let component: UpdateMarkButtonComponent;
  let fixture: ComponentFixture<UpdateMarkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMarkButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMarkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
