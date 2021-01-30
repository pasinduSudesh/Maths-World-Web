import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePapersComponent } from './available-papers.component';

describe('AvailablePapersComponent', () => {
  let component: AvailablePapersComponent;
  let fixture: ComponentFixture<AvailablePapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablePapersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablePapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
