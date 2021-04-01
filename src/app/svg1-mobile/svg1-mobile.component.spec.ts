import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Svg1MobileComponent } from './svg1-mobile.component';

describe('Svg1MobileComponent', () => {
  let component: Svg1MobileComponent;
  let fixture: ComponentFixture<Svg1MobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Svg1MobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Svg1MobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
