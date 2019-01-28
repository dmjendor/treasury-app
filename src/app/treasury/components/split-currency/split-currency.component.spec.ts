import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitCurrencyComponent } from './split-currency.component';

describe('SplitCurrencyComponent', () => {
  let component: SplitCurrencyComponent;
  let fixture: ComponentFixture<SplitCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
