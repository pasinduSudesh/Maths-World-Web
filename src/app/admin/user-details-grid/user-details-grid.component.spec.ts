import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsGridComponent } from './user-details-grid.component';

describe('UserDetailsGridComponent', () => {
  let component: UserDetailsGridComponent;
  let fixture: ComponentFixture<UserDetailsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
