import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepCoinInputFormComponent } from './prep-coin-input-form.component';

describe('PrepCoinInputFormComponent', () => {
  let component: PrepCoinInputFormComponent;
  let fixture: ComponentFixture<PrepCoinInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepCoinInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepCoinInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
