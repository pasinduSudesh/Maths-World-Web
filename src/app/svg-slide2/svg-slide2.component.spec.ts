import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgSlide2Component } from './svg-slide2.component';

describe('SvgSlide2Component', () => {
  let component: SvgSlide2Component;
  let fixture: ComponentFixture<SvgSlide2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgSlide2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgSlide2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
