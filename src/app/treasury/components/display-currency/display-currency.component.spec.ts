import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCurrencyComponent } from './display-currency.component';

describe('DisplayCurrencyComponent', () => {
  let component: DisplayCurrencyComponent;
  let fixture: ComponentFixture<DisplayCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
