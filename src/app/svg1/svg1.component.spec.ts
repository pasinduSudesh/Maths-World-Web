import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Svg1Component } from './svg1.component';

describe('Svg1Component', () => {
  let component: Svg1Component;
  let fixture: ComponentFixture<Svg1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Svg1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Svg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
