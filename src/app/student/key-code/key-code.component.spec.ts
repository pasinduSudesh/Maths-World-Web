import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyCodeComponent } from './key-code.component';

describe('KeyCodeComponent', () => {
  let component: KeyCodeComponent;
  let fixture: ComponentFixture<KeyCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
