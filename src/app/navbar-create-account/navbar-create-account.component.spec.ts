import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCreateAccountComponent } from './navbar-create-account.component';

describe('NavbarCreateAccountComponent', () => {
  let component: NavbarCreateAccountComponent;
  let fixture: ComponentFixture<NavbarCreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarCreateAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
