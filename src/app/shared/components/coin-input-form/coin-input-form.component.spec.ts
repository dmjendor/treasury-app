import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinInputFormComponent } from './coin-input-form.component';

describe('CoinInputFormComponent', () => {
  let component: CoinInputFormComponent;
  let fixture: ComponentFixture<CoinInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
